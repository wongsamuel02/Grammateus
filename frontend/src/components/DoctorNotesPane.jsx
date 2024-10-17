import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import SearchBar from './SearchBar';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from '../api/axios';

function DoctorNotesPane() {
  //const [doctorNotes] = useState("Doctor's notes will be displayed after the doctor-patient conversation has ended.");
  
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [error, setError] = useState('');
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  
  // State for dynamic card data
  const [cardsData, setCardsData] = useState([
    { title: "Subjective", text: ["This is subjective note 1", "test"] },
    { title: "Objective", text: ["This is subjective note 2"] },
    { title: "Assessment", text: ["This is subjective note 3"] },
    { title: "Plan", text: ["This is subjective note 4"] }
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

    // Stop listening and stop the timer
    const stopListening = () => {
      SpeechRecognition.stopListening();
      clearInterval(intervalId); 
      setIntervalId(null);
    };
    
    // Reset everything (transcript and timer)
    const resetEverything = () => {
      resetTranscript();
      clearInterval(intervalId);
      setElapsedTime(0);
      setIntervalId(null);
    };
    
    const generate = () => {
      SpeechRecognition.stopListening();
      summarizeNotes(transcript)
      clearInterval(intervalId); 
      setIntervalId(null);
  }

  function formatTime(seconds) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds %= (24 * 60 * 60);

    const hours = Math.floor(seconds / (60 * 60));
    seconds %= (60 * 60);

    const minutes = Math.floor(seconds / 60);
    seconds %= 60;

    let result = "";

    if (days > 0) result += `${days}d `;
    if (hours > 0) result += `${hours}h `;
    if (minutes > 0) result += `${minutes}m `;
    result += `${seconds}s`;

    return result.trim();
  }

  const displayTime = formatTime((elapsedTime / 1000).toFixed(0));

  const summarizeNotes = async (originalText) => {
    if (!originalText.trim()) {
        return;
    }

    try {
        const response = await axios.post('/gpt', { originalText });
        const { PatientNotes } = response.data;

        // Do something with PatientNotes

        const updatedCardsData = [
            { title: "Subjective", text: PatientNotes.subjective },
            { title: "Objective", text: PatientNotes.objective },
            { title: "Assessment", text: PatientNotes.assessment },
            { title: "Plan", text: PatientNotes.plan }
          ];

        setCardsData(updatedCardsData);

        setError('');
    } catch (error) {
        console.error('Error fetching data:', error.message);
        setError(error.message);
    }
  };
  
  return (
    <div className="doctor-notes-pane">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2%' }}>
        <SearchBar style={{width: '100%', alignItems: 'center'}} />
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
                    {Array.isArray(card.text) ? (
                    <ul>
                        {card.text.map((item, idx) => (
                        <li key={idx}>{item}</li>
                        ))}
                    </ul>
                    ) : (
                    <p>{card.text}</p>
                    )}
                </Card.Text>
                </Card.Body>
            </Card>
            </Col>
        ))}
        </Row>
    </div>
  );
}

export default DoctorNotesPane;
