import Sidebar from "./usersidebar";
import Header from "./userHeader";
import VoiceAssistant from "./voiceassistant";
import { CgProfile } from "react-icons/cg";
import { useRef, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function SignConversation({ level, question, correctAnswer, onSuccess }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [answer, setAnswer] = useState("");

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    setCameraStarted(true);
  };

  const stopCamera = () => {
    const tracks = videoRef.current?.srcObject?.getTracks();
    tracks?.forEach(track => track.stop());
    setCameraStarted(false);
  };

  const captureSign = async () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('image', blob, 'frame.jpg');

      try {
        const res = await axios.post('http://localhost:5000/predict', formData);
        const prediction = res.data.prediction;

        if (!prediction || prediction.toLowerCase().includes("no hand")) {
          toast.error("No hand detected.");
          return;
        }

        setAnswer(prev => prev + prediction.toUpperCase());
      } catch (err) {
        console.error(err);
        toast.error("Prediction failed.");
      }
    }, 'image/jpeg');
  };

  const checkAnswer = () => {
    stopCamera();

    if (answer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
      toast.success("Correct!" , { position: "top-center", autoClose: 3000 });
      onSuccess();
    } else {
      toast.error(`Incorrect! You signed "${answer}", expected "${correctAnswer}"`, { position: "top-center", autoClose: 3000 });
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <VoiceAssistant />
      <div className="w-5/6 bg-bg-light flex flex-col">
        <div className="w-full justify-center flex border-b-border border-b-2 items-center">
          <Header heading={"Sign Language Conversation"}/>
        </div>

        <div className="flex flex-col items-center justify-center p-10">
          <h2 className="text-4xl text-blue font-bold mb-10">Level {level}</h2>
          <p className="text-2xl text-center mb-5">{question}</p>

          <video ref={videoRef} autoPlay playsInline className="w-96 h-72 border mb-4" />
          <canvas ref={canvasRef} width="640" height="480" className="hidden" />

          <div className="flex gap-5 mt-5">
            {!cameraStarted ? (
              <button onClick={startCamera} className="bg-blue text-white text-xl px-6 py-2 rounded">Start</button>
            ) : (
              <>
                <button onClick={captureSign} className="bg-green-600 text-white text-xl px-6 py-2 rounded">Capture</button>
                <button onClick={checkAnswer} className="bg-yellow-600 text-white text-xl px-6 py-2 rounded">End</button>
                <button onClick={stopCamera} className="bg-red-600 text-white text-xl px-6 py-2 rounded">Stop</button>
              </>
            )}
          </div>

          <p className="mt-6 text-xl">Your Answer: <span className="font-bold">{answer}</span></p>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}
