import { useState, useRef } from "react";
import Sidebar from "../../../../components/usersidebar";
import signimg from '/ksign.png';
import kimg from '/Ka.jpg';
import { CgProfile } from "react-icons/cg";
import Header from "../../../../components/userHeader";
import { FaPlay } from "react-icons/fa"; // Play icon
import VoiceAssistant from "../../../../components/voiceassistant";

export default function PronunciationLevel1() {
    const [showPlayButton, setShowPlayButton] = useState(false);
    const videoRef = useRef(null);

    // Handle video end
    const handleVideoEnd = () => {
        setShowPlayButton(true); // Show play button after video finishes
    };

    // Replay video
    const replayVideo = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0; // Restart video
            videoRef.current.play();
            setShowPlayButton(false); // Hide play button while playing
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            <VoiceAssistant />
            <div className="w-5/6 bg-bg-light flex flex-col">
                <Header heading="Pronunciation" />
                <div className="w-full flex-col">
                    <div className="flex justify-center mx-auto pt-20 pb-5 space-x-10 text-2xl">
                        <span className='p-2 text-5xl font-semibold text-blue'>Level - 1</span>
                    </div>
                    <div className="flex mx-auto w-240 h-100 p-10 bg-bg-dark rounded space-x-50">
                        <div className='select-box'>
                            <img className="size-20 mx-auto mt-25" src={kimg} alt="" />
                        </div>

                        <div className='select-box relative'>
                            <video 
                                ref={videoRef}
                                className="w-full h-full object-cover rounded"
                                src="/kanimation.mp4"
                                autoPlay
                                onEnded={handleVideoEnd} // Detect when video ends
                            />
                            {showPlayButton && (
                                <button 
                                    onClick={replayVideo}
                                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded text-white text-5xl"
                                >
                                    <FaPlay />
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex mx-auto m-5">
                        <button className='mx-auto border-2 rounded-xl bg-blue text-white p-2 text-2xl w-50 hover:cursor-pointer'>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
