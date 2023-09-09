import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [isListening, setIsListening] = useState(false);

  const toggleListening = () => {
    if (browserSupportsSpeechRecognition) {
      if (!isListening) {
        SpeechRecognition.startListening({ continuous: true });
      } else {
        SpeechRecognition.stopListening();
      }
      setIsListening((prevState) => !prevState);
    } else {
      alert('Speech recognition is not supported in this browser.');
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p className='hello1'>Microphone: {listening ? 'on' : 'off'}</p>
      <p className='hello2'>
        {transcript}
        <div className='bu2' onClick={() => {
          let r = document.createElement('textarea');
          r.value = transcript;
          r.select();
          navigator.clipboard.writeText(r.value);
          console.log(transcript);
        }}>Copy</div>
      </p>
      <div className="bu1" onClick={toggleListening}>
        {isListening ? 'Stop' : 'Start'} 
      </div>
      <div className="bu1" onClick={resetTranscript}>Reset</div>
    </div>
  );
};

export default Dictaphone;
