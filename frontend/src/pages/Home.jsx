import Dictaphone from "./SpeechToText";
import { useSpeechRecognition } from 'react-speech-recognition';

export default function HomePage() {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();

      if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
      }

    return(
        <Dictaphone
        transcript={transcript}
        listening={listening}
        resetTranscript={resetTranscript}
      />
    );
}