import React, { useRef, useState } from 'react';
import axios from 'axios';

export default function Translation2() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [prediction, setPrediction] = useState('');

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  const captureAndSend = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    // Draw current frame on canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to blob
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('image', blob, 'frame.jpg');

      try {
        const res = await axios.post('http://localhost:5000/predict', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setPrediction(res.data.prediction);
      } catch (error) {
        console.error('Error during prediction:', error);
        setPrediction('Prediction failed');
      }
    }, 'image/jpeg');
  };

  return (
    <div className="text-center p-4">
      <h1 className="text-xl mb-4">Sign Language Translator</h1>
      <video ref={videoRef} autoPlay playsInline width="400" height="300" className="border rounded" />
      <canvas ref={canvasRef} width="400" height="300" className="hidden" />
      <div className="mt-4">
        <button onClick={startCamera} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Start Camera</button>
        <button onClick={captureAndSend} className="bg-green-500 text-white px-4 py-2 rounded">Capture & Translate</button>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Prediction: {prediction}</h2>
      </div>
    </div>
  );
}
