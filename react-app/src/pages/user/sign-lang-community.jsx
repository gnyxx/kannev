import Sidebar from "../../components/usersidebar";
import { CgProfile } from "react-icons/cg";
import VoiceAssistant from "../../components/voiceassistant";

export default function SignLangCommunity(){
    const community_prof = {
          'xyno16': {msg : 'Hey! Sign Language classes together tomorrow morning at the park?', time : '7:30'},
          'jpatel2004': {msg: 'Sounds good.', time : '7:40'},
          'kashvigandhi27': {msg: "I'm in.", time : '7:42'},
        }
        return (
            <div className="flex h-screen">
              <Sidebar />
              <VoiceAssistant />
              <div className="w-5/6 bg-bg-light flex flex-col">
              <div className="w-full mb-5 justify-center flex border-b-border border-b-2 items-center">
              <span className="text-blue mt-2 p-3 text-5xl font-semibold tracking-wide flex w-full align-middle justify-center">
                Point Focus
              </span>
              <CgProfile className=" text-5xl ml-auto mr-5 hover:cursor-pointer" />
            </div>
                <div className="w-full flex-col items-center">
                        <span className='p-2 text-5xl font-semibold text-blue w-full self-center text-center items-center ml-[570px]'>Level - 1</span>
                    <div className="rounded-2xl m-10 shadow-2xl w-full h-[550px] p-2 border-border">
                        <div className="w-5 h-5 rounded-full bg-blue relative top-12 left-[300px]"></div>
                    </div>
                        <div className="flex w-full justify-center">
                            <input type="text" placeholder="Type here..." className="bg-bg-dark min-w-5/12 rounded-xl text-xl p-4 align-bottom" />
                            {/* <input type="submit" value="Send" className="ml-4 bg-blue rounded-2xl pl-3 pr-3 pt-[-10px] pb-[-10px] text-xl text-white" /> */}
                            </div>
                </div>
              </div>
            </div>
          );
}