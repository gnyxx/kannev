import Sidebar from "../../components/adminsidebar";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { BsDashCircle } from "react-icons/bs";
import { GoDash } from "react-icons/go";


export default function ManageComm() {
    const skills = ['Sign Language Conversation', 'Point Focus', 'Mouth Movements']
    const signLang = [
        {'radius': 5, 'speed': 5},
        {'radius': 4, 'speed': 7},
        {'radius': 5, 'speed': 9},
    ]
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
            <div className="w-5/6 bg-bg-light flex flex-col">
            <div className="w-full justify-center flex border-b-border border-b-2 items-center">
              <span className="text-blue mt-2 p-3 text-5xl font-semibold tracking-wide flex w-full align-middle justify-center">
                Manage Communities
              </span>
              <CgProfile className=" text-5xl ml-auto mr-5 hover:cursor-pointer" />
            </div> 
            <div className="w-full h-full flex flex-col items-center mx-auto p-15 space-y-4">
                    {Object.keys(community_prof).map((comm, index) => (
                    <div className="h-fit text-3xl text-left w-2/3 shadow-lg bg-bg-dark p-4">
                        {comm}
                        <div className="float-end bg-red-500 rounded-full font-semibold">
                            <GoDash className=" text-lg text-white font-semibold align-middle" />
                        </div>
                        </div>


                     ))} 
                    </div>

            </div>
        </div>
      );
}
