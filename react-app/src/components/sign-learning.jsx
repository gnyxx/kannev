import Sidebar from "./usersidebar";
import { CgProfile } from "react-icons/cg";
import VoiceAssistant from "./voiceassistant";

export default function SignLearning({ level, promptImage, signImage, onNext }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <VoiceAssistant />
      <div className="w-5/6 bg-bg-light flex flex-col">
        <div className="w-full justify-center flex border-b-border border-b-2 items-center">
          <span className="text-blue mt-2 p-3 text-5xl font-semibold tracking-wide flex w-full justify-center">
            Sign Language
          </span>
          <CgProfile className="text-5xl ml-auto mr-5 hover:cursor-pointer" />
        </div>

        <div className="w-full flex-col">
          <div className="flex justify-center mx-auto pt-20 pb-5 space-x-10 text-2xl">
            <span className='p-2 text-5xl font-semibold text-blue'>Level - {level}</span>
          </div>

          <div className="flex mx-auto w-240 h-100 p-10 bg-bg-dark rounded space-x-50">
            <div className='select-box'>
              <img className="size-20 mx-auto mt-25" src={promptImage} alt="Prompt" />
            </div>

            <div className='select-box'>
              <img src={signImage} alt="Sign" className="mt-[30px]" />
            </div>
          </div>

          <div className="flex mx-auto m-5">
            <button
              className='mx-auto border-2 rounded-xl bg-blue text-white p-2 text-2xl w-50 hover:cursor-pointer'
              onClick={onNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
