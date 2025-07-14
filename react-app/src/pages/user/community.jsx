import Sidebar from "../../components/usersidebar";
import { CgProfile } from "react-icons/cg";
import VoiceAssistant from "../../components/voiceassistant";

export default function Community(){
    const community_prof = {
          'SignLang Community': 'A community for learning Sign Language',
          'Braille Community': 'A community for learning Braille',
          'Speech Improvement': 'A community for improving speech',
          'SenseConnect':'Community that connects people',
          'Blind People Association': 'A community for Blind and partially blind people'
        }
        return (
            <div className="flex h-screen">
              <Sidebar />
            <VoiceAssistant />
              <div className="w-5/6 bg-bg-light flex flex-col">
              <div className="w-full justify-center flex border-b-border border-b-2 items-center">
              <span className="text-blue mt-2 p-3 text-5xl font-semibold tracking-wide flex w-full align-middle justify-center">
                Communities
              </span>
              <CgProfile className=" text-5xl ml-auto mr-5 hover:cursor-pointer" />
            </div>
                <div className="w-full flex-col">
                    <div className="rounded-2xl m-15 shadow-2xl border-border">
                        {
                            Object.keys(community_prof).map(content =>{
                                return(
                                    <div className="border-b-2 border-border">
                                        <div className="p-4 ml-4">
                                            <span className="text-4xl font-semibold">{content}</span> <br />
                                            <span className="text-2xl">{community_prof[content]}</span>
                                            <button className="text-2xl ml-5 border-1 rounded-2xl w-35 bg-blue text-white hover: cursor-pointer">Unfollow</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
              </div>
            </div>
          );
}