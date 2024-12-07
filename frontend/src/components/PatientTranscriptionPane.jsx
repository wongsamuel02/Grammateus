import React from 'react';
import { Card } from 'react-bootstrap';

function PatientTranscriptionPane() {
  return (
    <div>
    <Card className="transcription-card">
      <Card.Body>
        <Card.Title className="text-primary">Previous Transcriptions</Card.Title>
        <Card.Text>
          <div>Patient's last visit transcription will be displayed here.</div>
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
  );
}

export default PatientTranscriptionPane;
