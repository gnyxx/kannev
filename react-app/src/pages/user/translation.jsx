// Your imports remain unchanged
import Sidebar from "../../components/usersidebar";
import { CgProfile } from "react-icons/cg";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaVolumeUp } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa6";
import Header from "../../components/userHeader";
import VoiceAssistant from "../../components/voiceassistant";
import axios from 'axios';

export default function Translation() {
    const options = ['Text', 'Speech', 'Sign'];
    const [input, setInput] = useState('Text');
    const [output, setOutput] = useState('Speech');
    const [text, setText] = useState('');
    const [translatedOutput, setTranslatedOutput] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [voices, setVoices] = useState([]);
    const [signImages, setSignImages] = useState([]);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [cameraStarted, setCameraStarted] = useState(false);

    useEffect(() => {
        const synth = window.speechSynthesis;
        const updateVoices = () => setVoices(synth.getVoices());
        if (synth.getVoices().length > 0) updateVoices();
        else synth.onvoiceschanged = updateVoices;
    }, []);

    useEffect(() => {
        if (input === 'Sign' && !cameraStarted) startCamera();
        if (input !== 'Sign' && cameraStarted) stopCamera();
    }, [input]);

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setCameraStarted(false);
        }
    };

    const handleTranslate = () => {
        if (input === output) {
            toast.error('Input and output cannot be the same!', { position: "top-center", autoClose: 3000 });
            return;
        }

        if (input === 'Text' && output === 'Speech') {
            handleTextToSpeech();
        } else if (input === 'Speech' && output === 'Text') {
            handleSpeechToText(); // result is set from inside
        } else if (input === 'Text' && output === 'Sign') {
            handleTextToSign(text);
        } else if (input === 'Speech' && output === 'Sign') {
            handleSpeechToText(); // inside it will call handleTextToSign(transcript)
        } else if (input === 'Sign') {
            captureAndSend(); // Sign ➝ Text or Sign ➝ Speech
        }
    };

    const handleTextToSpeech = () => {
        if (!text.trim()) {
            toast.error('Please enter text to translate.');
            return;
        }
        const synth = window.speechSynthesis;
        synth.cancel();
        setIsSpeaking(true);

        const utterance = new SpeechSynthesisUtterance(text);
        const hindiVoice = voices.find(voice => voice.lang === 'hi-IN');
        if (hindiVoice) utterance.voice = hindiVoice;
        utterance.lang = 'en-US';

        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        synth.speak(utterance);
    };

    const handleSpeechToText = () => {
        if (!('webkitSpeechRecognition' in window)) {
            toast.error('Speech recognition not supported in this browser.');
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'en-US';
        setIsListening(true);
        setText('Listening...');

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setText(transcript);
            setTranslatedOutput(transcript);
            setIsListening(false);
            if (output === 'Sign') handleTextToSign(transcript);
        };

        recognition.onerror = () => {
            setText('');
            setIsListening(false);
            toast.error('Error recognizing speech. Please try again!');
        };

        recognition.start();
    };

    const handleTextToSign = (customText) => {
        const rawText = customText || text;
        const cleanText = rawText.trim().toUpperCase().replace(/[^A-Z]/g, '');
        const letters = cleanText.split('');
        const paths = letters.map(letter => `/signs/${letter}.png`);
        setSignImages(paths);
    };

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: { ideal: 1920 }, height: { ideal: 1080 } }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setCameraStarted(true);
            }
        } catch (error) {
            console.error("Camera error:", error);
            toast.error("Could not start camera.");
        }
    };

    const captureAndSend = async () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;

        if (!canvas || !video) {
            toast.error("Camera not ready.");
            return;
        }

        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(async (blob) => {
            const formData = new FormData();
            formData.append('image', blob, 'frame.jpg');

            try {
                const res = await axios.post('http://localhost:5000/predict', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                const newPrediction = res.data.prediction;
                if (!newPrediction || newPrediction.toLowerCase().includes("no hand")) {
                    toast.error("No hand detected. Try again.");
                    return;
                }

                setTranslatedOutput(prev => prev + newPrediction);

                if (output === 'Speech') {
                    const utterance = new SpeechSynthesisUtterance(newPrediction);
                    utterance.lang = 'hi-IN';
                    window.speechSynthesis.speak(utterance);
                }
            } catch (error) {
                console.error('Prediction error:', error);
                toast.error('Prediction failed.');
            }
        }, 'image/jpeg');
    };

    const renderField = (type, value, setValue, isOutput = false) => {
        if (type === 'Text') {
            return (
                <textarea
                    value={isListening && !isOutput ? 'Listening...' : value}
                    onChange={(e) => !isOutput && setValue(e.target.value)}
                    placeholder={isOutput ? "Output..." : "Input..."}
                    className='text-2xl p-4 w-full h-64 bg-white rounded-md shadow-md'
                    disabled={isListening}
                />
            );
        } else if (type === 'Speech') {
            return (
                <div
                    className="flex justify-center items-center w-full h-64 bg-white rounded-md shadow-md cursor-pointer"
                    onClick={!isOutput ? handleSpeechToText : handleTextToSpeech}
                >
                    {isSpeaking ? (
                        <FaSpinner className="text-blue text-5xl animate-spin" />
                    ) : (
                        <FaVolumeUp className="text-blue text-5xl" />
                    )}
                </div>
            );
        } else if (type === 'Sign') {
            return !isOutput ? (
                <div className="flex flex-col gap-2 items-center p-4 bg-white rounded-md shadow-md h-64 overflow-hidden">
                    <video ref={videoRef} autoPlay playsInline className="rounded w-full h-full object-cover" />
                    <canvas ref={canvasRef} width="1920" height="1080" className="hidden" />
                </div>
            ) : (
                <div className="flex flex-wrap gap-2 justify-center items-start p-4 bg-white rounded-md shadow-md h-64 overflow-y-auto">
                    {signImages.length > 0 ? (
                        signImages.map((src, index) => (
                            <img key={index} src={src} alt={`Sign ${index}`} className="h-20" />
                        ))
                    ) : (
                        <p className="text-gray-600">Translation will appear here</p>
                    )}
                </div>
            );
        }
    };

    return (
        <div className="flex h-screen">
            <ToastContainer />
            <VoiceAssistant />
            <Sidebar />
            <div className="w-5/6 bg-bg-light flex flex-col">
                <Header heading={"Translation"} />

                <div className="w-full flex-col">
                    <div className="flex justify-center mx-auto pt-20 pb-5 space-x-10 text-2xl">
                        <select className="select-option" value={input} onChange={(e) => setInput(e.target.value)}>
                            {options.map(content => <option key={content} value={content}>{content}</option>)}
                        </select>
                        <span className='p-2'>to</span>
                        <select className="select-option" value={output} onChange={(e) => setOutput(e.target.value)}>
                            {options.map(content => <option key={content} value={content}>{content}</option>)}
                        </select>
                    </div>

                    <div className="flex mx-auto w-4/5 gap-7 p-8 bg-bg-dark rounded-2xl shadow-2xl">
                        <div className="w-1/2">
                            {renderField(input, text, setText)}
                        </div>

                        <div className="w-1/2">
                            {renderField(output, translatedOutput, setTranslatedOutput, true)}
                        </div>
                    </div>

                    <div className="flex mx-auto m-5">
                        <button
                            onClick={handleTranslate}
                            className='mx-auto border-2 rounded-xl bg-blue text-white p-2 text-2xl w-70 hover:cursor-pointer'
                        >
                            Translate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
