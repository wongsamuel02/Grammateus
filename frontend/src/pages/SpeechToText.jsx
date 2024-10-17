import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from '../api/axios';

const Dictaphone = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [summarizedTranscript, setSummarizedTranscript] = useState('')
  const [error, setError] = useState('');

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

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
      summarizeNotes(transcript)
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
    if (!originalText.trim()) { // trim() removes whitespace from both ends
      return
    }

    try {
      const response = await axios.post('/gpt', { originalText });
      const { PatientNotes } = response.data;
      setSummarizedTranscript(PatientNotes);
      setError('');
    } catch {
      setError(error.message);
    }
  }

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>{summarizedTranscript}</p>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={startListening}>Start</button>
      <button onClick={stopListening}>Stop</button>
      <button onClick={resetEverything}>Reset</button>
      <p>{transcript}</p>
      <p>Listening Time: {displayTime}</p>
    </div>
  );
};

export default Dictaphone;