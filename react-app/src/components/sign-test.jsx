import Sidebar from "./usersidebar";
import VoiceAssistant from "./voiceassistant";
import { CgProfile } from "react-icons/cg";
import { useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignTest({ level, prompt, correctAnswer, onSuccess }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraStarted, setCameraStarted] = useState(false);

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

  const captureAndCheck = async () => {
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
          toast.error("No hand detected.", { position: "top-center", autoClose: 3000 });
          return;
        }

        if (prediction.trim().toLowerCase() === correctAnswer.trim().toLowerCase()){
          toast.success("Correct!", { position: "top-center", autoClose: 3000 });
          stopCamera();
          onSuccess();
        }
        else {
          toast.error("Try again!", { position: "top-center", autoClose: 3000 });
        }
      } catch (err) {
        console.error(err);
        toast.error("Prediction failed.", { position: "top-center", autoClose: 3000 });
      }
    }, 'image/jpeg');
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <VoiceAssistant />
      <div className="w-5/6 bg-bg-light flex flex-col">
        <div className="w-full justify-center flex border-b-border border-b-2 items-center">
          <span className="text-blue mt-2 p-3 text-5xl font-semibold tracking-wide flex w-full justify-center">
            Sign Language Test
          </span>
          <CgProfile className="text-5xl ml-auto mr-5 hover:cursor-pointer" />
        </div>

        <div className="flex flex-col items-center justify-center p-10">
          <h2 className="text-4xl text-blue font-bold mb-10">Level {level} Test</h2>
          <p className="text-2xl text-center mb-5">{prompt}</p>

          <video ref={videoRef} autoPlay playsInline className="w-96 h-72 border mb-4" />
          <canvas ref={canvasRef} width="640" height="480" className="hidden" />

          <div className="flex gap-5 mt-5">
            {!cameraStarted ? (
              <button onClick={startCamera} className="bg-blue text-white text-xl px-6 py-2 rounded">Start Camera</button>
            ) : (
              <>
                <button onClick={captureAndCheck} className="bg-green-600 text-white text-xl px-6 py-2 rounded">Submit</button>
                <button onClick={stopCamera} className="bg-red-600 text-white text-xl px-6 py-2 rounded">Stop</button>
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
