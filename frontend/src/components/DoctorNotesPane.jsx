import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import SearchBar from './SearchBar';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from '../api/axios';

function DoctorNotesPane() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [editingCardIndex, setEditingCardIndex] = useState(null);  // State to track which card is being edited
  const [editedText, setEditedText] = useState("");  // State to store edited text

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  
  const [cardsData, setCardsData] = useState([
    { title: "Subjective", text: ["This is subjective note 1"] },
    { title: "Objective", text: ["This is objective note 1"] },
    { title: "Assessment", text: ["This is assessment note 1"] },
    { title: "Plan", text: ["This is plan note 1"] }
  ]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const startListening = () => {
    if (!listening && !intervalId) {
      SpeechRecognition.startListening({ continuous: true });
      const now = Date.now();
      const id = setInterval(() => {
        setElapsedTime(Date.now() - (now - elapsedTime));
      }, 1000);
      setIntervalId(id);
    }
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const resetEverything = () => {
    resetTranscript();
    clearInterval(intervalId);
    setElapsedTime(0);
    setIntervalId(null);
  };

  const generate = () => {
    SpeechRecognition.stopListening();
    summarizeNotes(transcript);
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const summarizeNotes = async (originalText) => {
    if (!originalText.trim()) {
      return;
    }

    try {
      const response = await axios.post('/gpt', { originalText });
      const { parsedRecord } = response.data;

      const updatedCardsData = [
        { title: "Subjective", text: parsedRecord.subjective },
        { title: "Objective", text: parsedRecord.objective },
        { title: "Assessment", text: parsedRecord.assessment },
        { title: "Plan", text: parsedRecord.plan }
      ];

      setCardsData(updatedCardsData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const handleEditClick = (index) => {
    setEditingCardIndex(index);  // Set the index of the card being edited
    // Pre-fill the textarea with current text, including • bullet points
    const bulletText = cardsData[index].text.map(item => `• ${item}`).join("\n");
    setEditedText(bulletText);
  };

  const handleSaveClick = (index) => {
    const updatedCards = [...cardsData];
    // Parse the textarea back into an array of list items, removing the • bullet points
    const newText = editedText.split("\n").map(line => line.replace(/^• /, ""));
    updatedCards[index].text = newText;
    setCardsData(updatedCards);
    setEditingCardIndex(null);  // Exit editing mode
  };

  const handleTextChange = (event) => {
    setEditedText(event.target.value);
  };

  return (
    <div className="doctor-notes-pane">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2%' }}>
        <SearchBar style={{ width: '100%', alignItems: 'center' }} />
        <div style={{ marginLeft: 'auto', display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <button className="btn btn-primary mx-2" onClick={generate}>Generate</button>
          <button className="btn btn-success mx-2" onClick={startListening}>Start</button>
          <button className="btn btn-danger mx-2" onClick={stopListening}>Stop</button>
          <button className="btn btn-warning mx-2" onClick={resetEverything}>Reset</button>
        </div>
      </div>
      <h2 className="mb-3">Doctor's Notes</h2>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Transcription</Card.Title>
          <Card.Text>
            <p>{transcript}</p>
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Map over cardsData to render the cards */}
      <Row>
        {cardsData.map((card, index) => (
          <Col md={6} key={index}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>
                  {editingCardIndex === index ? (
                    <textarea
                      value={editedText}
                      onChange={handleTextChange}
                      rows="5"
                      style={{ width: '100%' }}
                    />
                  ) : (
                    <ul>
                      {card.text.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-left">
                {editingCardIndex === index ? (
                  <Button onClick={() => handleSaveClick(index)}>Save</Button>
                ) : (
                  <i
                    className="bi bi-pencil-square"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleEditClick(index)}
                  ></i>
                )}
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default DoctorNotesPane;
