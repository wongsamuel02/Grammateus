import React from 'react';
import { Card } from 'react-bootstrap';
import SearchBar from './SearchBar';

function PatientTranscriptionPane() {
  return (
    <div>
    <SearchBar />
    <Card className="transcription-card">
      <Card.Body>
        <Card.Title className="text-primary">Previous Transcriptions</Card.Title>
        <Card.Text>
          <p>Patient's last visit transcription will be displayed here.</p>
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
  );
}

export default PatientTranscriptionPane;
