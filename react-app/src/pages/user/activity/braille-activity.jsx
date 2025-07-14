import Sidebar from "../../../components/adminsidebar";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import Header from "../../../components/userHeader";
import VoiceAssistant from "../../../components/voiceassistant";

export default function PointFocusLevels(){
    const levels=[1, 2, 3, 4, 5, 6];

    return(
        <div className="flex h-screen">
            <Sidebar/>
            <VoiceAssistant />
            <div className="w-5/6 bg-bg-light flex flex-col">
            <Header heading={"Point Focus"} />
                <div className="w-full ml-[100px]">
                    {
                        levels.map(content=>{
                            return(
                                <Link to={`./${content}`}>
                                    <div className="relative shadow-xl bg-bg-dark rounded-xl inline-block p-25 justify-center m-10 text-3xl hover:cursor-pointer">
                                        {content == 1 ? (
                                             <span className="font-semibold tracking-wide text-blue">Level - {content} </span>
                                        ) : (
                                            <>
                                        <span className="font-semibold tracking-wide text-blue">Level - {content} </span>
                                        </>
                                        )}
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>  
    )
}