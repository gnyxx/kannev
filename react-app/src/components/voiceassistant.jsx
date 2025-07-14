import { useEffect, useState } from "react";

const VoiceAssistant = () => {
  const [message, setMessage] = useState("Press 'CTRL+ALT+F' to start voice recognition");

  useEffect(() => {
    const handleKeyPress = (event) => {
      const isTyping = ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName);
      if (event.ctrlKey && event.altKey && event.key.toLowerCase() === "f" && !isTyping) {
        event.preventDefault();
        startListening();
      }
    };
  
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress); 
  }, []);
  

  const speakMessage = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "hi-IN";
    window.speechSynthesis.speak(speech);
  };

  const startListening = () => {
    setMessage("Listening...");
    speakMessage("");

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = async (event) => {
      const voiceCommand = event.results[0][0].transcript.toLowerCase();
      setMessage(`Navigating to: ${voiceCommand}`);
      speakMessage(`Navigating to: ${voiceCommand}`);

      // Send command to backend for processing
      const response = await fetch("http://localhost:5000/voice-command", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: voiceCommand }),
      });

      const data = await response.json();
      if (data.route) {
        window.location.href = data.route;
      } else {
        speakMessage("I did not understand that command.");
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error", event);
      setMessage("Error occurred while recognizing speech.");
    };
  };

  return (
    <div style={{ position: "fixed", bottom: 10, right: 10, padding: "10px", background: "#222", color: "#fff", borderRadius: "5px" }}>
      <p>{message}</p>
    </div>
  );
};

export default VoiceAssistant;
