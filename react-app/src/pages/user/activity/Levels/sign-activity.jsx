import { Link } from "react-router-dom";
import Sidebar from "../../../../components/usersidebar";
import Header from "../../../../components/userHeader";
import VoiceAssistant from "../../../../components/voiceassistant";

export default function SignConversation() {
    const levels = [1, 2, 3, 4, 5, 6];

    return (
        <div className="flex h-screen">
            <Sidebar />
            <VoiceAssistant />
            <div className="w-5/6 bg-bg-light flex flex-col">
                <Header heading={"Sign Language Conversation"} />
                <div className="w-full ml-[100px]">
                    {levels.map(level => (
                        <div key={level} className="inline-block m-20 ml-2">
                            <Link to={`./${level}`}>
                                    <div className="relative h-48 text-center w-2xs shadow-xl bg-bg-dark rounded-xl p-10 text-3xl text-blue font-semibold hover:cursor-pointer">
                                        Level - {level}
                                    </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
