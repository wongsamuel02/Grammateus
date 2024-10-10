import React, { useState } from 'react';
import SpeechRecognition from 'react-speech-recognition';
import PropTypes from 'prop-types';

const Dictaphone = ({ transcript, listening, resetTranscript }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

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

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={startListening}>Start</button>
      <button onClick={stopListening}>Stop</button>
      <button onClick={resetEverything}>Reset</button>
      <p>{transcript}</p>
      <p>Listening Time: {displayTime}</p>
    </div>
  );
};

Dictaphone.propTypes = {
  transcript: PropTypes.string.isRequired,    // Define that transcript is a string and required
  listening: PropTypes.bool.isRequired,       // Define that listening is a boolean and required
  resetTranscript: PropTypes.func.isRequired, // Define that resetTranscript is a function and required
};

export default Dictaphone;