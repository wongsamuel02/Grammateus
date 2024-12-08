import { React , useState } from 'react';
import { Card } from 'react-bootstrap';

function PatientTranscriptionPane() {

  const [transcriptions, setTranscriptions] = useState([
    {
      "id": 1,
      "date": "4-4-2024",
      "duration": "15",
      "preview": "Hello Dr."
    },
    {
      "id": 2,
      "date": "5-4-2024",
      "duration": "10",
      "preview": "Follow-up discussion."
    }
  ]
  );

  return (
    <div>
      {transcriptions.length > 0 ? (
        transcriptions.map(transcription => (
          <Card className="transcription-card mb-3" key={transcription.id}>
            <Card.Body>
              <Card.Title className="text-primary d-flex justify-content-between px-2">
                <div>
                  Date: {transcription.date}
                </div>
                <div>
                  Duration: {transcription.duration} min
                </div>
              </Card.Title>
              <Card.Text>
                <div className="px-2">
                  Preview: {transcription.preview}
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <Card className="transcription-card mb-3">
          <Card.Body>
            <Card.Title className="text-center text-muted">
              Currently no transcriptions available for this patient
            </Card.Title>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default PatientTranscriptionPane;
