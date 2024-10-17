import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import SearchBar from './SearchBar';

function DoctorNotesPane() {
    //const [doctorNotes] = useState("Doctor's notes will be displayed after the doctor-patient conversation has ended.");

  // State for dynamic card data
  const [cardsData] = useState([
    { title: "Subjective", text: "This is subjective note 1" },
    { title: "Subjective", text: "This is subjective note 2" },
    { title: "Subjective", text: "This is subjective note 3" },
    { title: "Subjective", text: "This is subjective note 4" }
  ]);

  return (
    <div className="doctor-notes-pane">
      <div style={{ width: '50%' }}>
        <SearchBar />
      </div>
      <h2 className="mb-3">Doctor's Notes</h2>
      <Card className="mb-3">
        <Card.Body>
            <Card.Title>Trnascription</Card.Title>
            <Card.Text>
                <p>Live Transcription here</p>
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
                  <p>{card.text}</p>
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
