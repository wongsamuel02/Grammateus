import { React, useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function PatientTranscriptionPane({ patientTranscription, selectedPatient }) {
  const axiosPrivate = useAxiosPrivate();

  const [transcriptions, setTranscriptions] = useState([]);
  const [selectedTranscription, setSelectedTranscription] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  const formatTranscriptionDate = (isoDate) => {
    const date = new Date(isoDate);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    return `${formattedDate}  ${formattedTime}`;
  };

  const getPreviewText = (transcriptData) => {
    if (!transcriptData) return 'No transcript available';
    const words = transcriptData.split(/\s+/).slice(0, 10).join(' ');
    return `${words}${transcriptData.split(/\s+/).length > 10 ? '...' : ''}`;
  };

  useEffect(() => {
    const fetchTranscriptions = async () => {
      try {
        const response = await axiosPrivate(`/visit/getAll/patient?email=${patientTranscription}`);
        const data = response.data;
        setTranscriptions(data);
      } catch (error) {
        console.error('Error fetching transcriptions:', error);
      }
    };

    fetchTranscriptions();
  }, [selectedPatient]);

  const handleCardClick = (transcription) => {
    setIsClosing(false); // Reset closing state
    setSelectedTranscription(transcription);
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => setSelectedTranscription(null), 300); // Wait for the transition to complete
  };

  return (
    <div>
      {transcriptions.length > 0 ? (
        transcriptions.map(transcription => (
          <Card
            className="transcription-card mb-3"
            key={transcription.id}
            onClick={() => handleCardClick(transcription)}
            style={{ cursor: 'pointer' }}
          >
            <Card.Body>
              <Card.Title className="text-primary d-flex justify-content-between px-2">
                <div>Date: {formatTranscriptionDate(transcription.date)}</div>
                <div>Duration: {transcription.duration} min</div>
              </Card.Title>
              <Card.Text>
                <div className="px-2">Preview: {getPreviewText(transcription.transcriptData)}</div>
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

      {selectedTranscription && (
        <div
          className={`fullscreen-modal ${isClosing ? 'closing' : ''}`}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1050,
            animation: isClosing ? 'fadeOut 0.3s ease-in-out' : 'fadeIn 0.3s ease-in-out',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              color: '#000',
              borderRadius: '20px',
              padding: '30px',
              width: '90%',
              height: '85%',
              overflowY: 'auto',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
              animation: isClosing ? 'zoomOut 0.3s ease-in-out' : 'zoomIn 0.3s ease-in-out',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '20px',
                right: '30px',
                fontSize: '28px',
                cursor: 'pointer',
                color: '#555',
              }}
              onClick={handleCloseModal}
            >
              &times;
            </div>
            <h2>{formatTranscriptionDate(selectedTranscription.date)}</h2>
            <p>Duration: {selectedTranscription.duration} min</p>
            <p>{selectedTranscription.transcriptData || 'No full transcript available'}</p>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        @keyframes zoomIn {
          from {
            transform: scale(0.9);
          }
          to {
            transform: scale(1);
          }
        }
        @keyframes zoomOut {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(0.9);
          }
        }
      `}</style>
    </div>
  );
}

export default PatientTranscriptionPane;
