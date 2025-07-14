import Sidebar from "../../components/usersidebar";
import { CgProfile } from "react-icons/cg";
import Header from "../../components/userHeader";
import VoiceAssistant from "../../components/voiceassistant";
export default function AboutUs() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <VoiceAssistant />
            <div className="w-5/6 bg-bg-light flex flex-col">
                <Header heading={"About Us"} />
                
                {/* Main Content */}
                <div className="w-4/5 mx-auto my-10 p-8 bg-white rounded-xl shadow-xl text-lg leading-relaxed">
                    <h2 className="text-4xl font-bold text-blue mb-4">Why Kaanev?</h2>
                    <p>
                        Kaanev is built with a mission to empower individuals who are visually, hearing, or speech impaired by providing them with a platform to learn and communicate effectively. 
                        Our goal is to bridge the communication gap and make learning accessible through innovative and interactive methods.
                    </p>
                    
                    <h2 className="text-4xl font-bold text-blue mt-6 mb-4">The Meaning Behind Kaanev</h2>
                    <p>
                        The name <b>Kaanev</b> is derived from three essential elements of communication:
                    </p>
                    <ul className="list-disc list-inside ml-5 mt-2">
                        <li><b>Kaana (कर्ण)</b> - Representing hearing and sound.</li>
                        <li><b>Netra (नेत्र)</b> - Symbolizing vision and sight.</li>
                        <li><b>Vaani (वाणी)</b> - Signifying speech and expression.</li>
                    </ul>
                    <p className="mt-4">
                        These three pillars form the foundation of Kaanev, where we strive to create an inclusive environment that enables better communication and learning for everyone.
                    </p>
                </div>
            </div>
        </div>
    );
}
