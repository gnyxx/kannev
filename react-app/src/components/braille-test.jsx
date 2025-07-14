import React, { useState } from 'react';
import Sidebar from './usersidebar';
import VoiceAssistant from './voiceassistant';
import { CgProfile } from 'react-icons/cg';
import { toast, ToastContainer } from 'react-toastify';

const normalizeSpeechInput = (text) => {
  const numberMap = {
    'zero': '0', 'one': '1', 'two': '2', 'three': '3',
    'four': '4', 'five': '5', 'six': '6',
    'seven': '7', 'eight': '8', 'nine': '9'
  };

  return text
    .toLowerCase()
    .split(/[\s,-]+/)
    .map(word => numberMap[word] || word)
    .filter(word => /^\d+$/.test(word)) 
    .join(' ');
};

export default function BrailleTest({ prompt, correctAnswers, level, onSuccess }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const synth = window.speechSynthesis;

  const speakPrompt = () => {
    const utter = new SpeechSynthesisUtterance(prompt);
    synth.speak(utter);
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error("Speech recognition not supported.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
      toast.info("Listening...", { position: "top-center", autoClose: 3000 });
    };

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      const normalized = normalizeSpeechInput(result);
      console.log(result);
      setTranscript(normalized);
      setListening(false);

      const correctSet = correctAnswers.map(ans =>
        normalizeSpeechInput(ans)
      );

      if (correctSet.includes(normalized)) {
        toast.success("Correct Answer!", { position: "top-center", autoClose: 3000 });
        onSuccess();
      } else {
        toast.error("Incorrect! Try again.", { position: "top-center", autoClose: 3000 });
      }
    };

    recognition.onerror = (event) => {
      toast.error("Speech recognition error: " + event.error, { position: "top-center", autoClose: 3000 });
      setListening(false);
    };

    recognition.start();
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <VoiceAssistant />
      <div className="w-5/6 bg-bg-light flex flex-col">
        <div className="w-full flex items-center border-b-2 border-border">
          <span className="text-blue mt-2 p-3 text-5xl font-semibold tracking-wide w-full text-center">
            Braille Test
          </span>
          <CgProfile className="text-5xl ml-auto mr-5 cursor-pointer" />
        </div>

        <div className="flex flex-col items-center justify-center p-10">
          <h2 className="text-3xl text-blue font-bold mb-8">Level {level} Test</h2>
          <p className="text-xl text-center mb-5">{prompt}</p>

          <div className="flex gap-5 mt-5">
            <button onClick={speakPrompt} className="bg-blue text-white text-lg px-6 py-2 rounded">
              Speak Prompt
            </button>
            <button onClick={startListening} disabled={listening} className="bg-green-600 text-white text-lg px-6 py-2 rounded">
              {listening ? "Listening..." : "Answer with Voice"}
            </button>
          </div>

          {transcript && (
            <p className="mt-5 text-xl text-gray-700">
              You said: <span className="font-semibold">{transcript}</span>
            </p>
          )}
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}
