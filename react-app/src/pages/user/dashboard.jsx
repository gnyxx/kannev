import { useState } from "react";
import Sidebar from "../../components/usersidebar";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";  
import { ToastContainer, toast } from 'react-toastify';
import Header from "../../components/userHeader";
import { Link } from "react-router-dom";
import VoiceAssistant from '../../components/voiceassistant'

export default function UserDashboard() {
    
    const skills = {
      'Sign Language': ['/ksign.png', 'sign-levels'],
      'Braille': ['/braille.png', 'braille-levels'],
      'Pronunciation': ['/pronunciation.png', 'pronunciation-levels']
    };
    
    const activities = {
      'Sign Language Conversation': ['/sign-lang-convo.png','sign-lang-convo-levels'],
      'Point Focus': ['/point-focus.png', 'point-focus-levels'],
      'Mouth Movements': ['/mouth-movements.png', 'mouth-movements-levels']
    };

    return (
        <div className="flex h-screen">
          <Sidebar />
          <VoiceAssistant />
          <ToastContainer />

          <div className="w-5/6 bg-bg-light flex flex-col">
            {/* Top Bar */}
          <Header heading="Dashboard" />

            {/* Skills Section */}
            <div className="w-full flex-col">
              <div className="p-2 m-3">
                <span className="text-blue mt-2 p-3 text-4xl font-semibold">
                  Skills
                </span>
              </div>
              <div className="flex flex-row justify-center space-x-24">
                {Object.keys(skills).map(skill => (
                  <div key={skill} className="w-[20%] flex-row">
                    <Link to={`../skills/${skills[skill][1]}`}>
                      <div className="bg-bg-dark h-[200px] w-[250px] flex justify-center items-center rounded-lg shadow-xl hover:cursor-pointer hover:scale-105 transition-transform">
                        <img
                          src={skills[skill][0]}
                          alt={skill}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="h-fit w-[250px] flex justify-center">
                        <span className="text-blue font-semibold text-lg">{skill}</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Activities Section */}
            <div className="w-full flex-col">
              <div className="p-2 m-7">
                <span className="text-blue mt-2 p-3 text-4xl font-semibold">
                  Activities 
                </span>
              </div>
              <div className="flex flex-row justify-center space-x-24">
                {Object.keys(activities).map(activity => (
                  <div key={activity} className="w-[20%] flex-row">
                    <Link to={`../activities/${activities[activity][1]}`}>
                      <div className="bg-bg-dark h-[200px] w-[250px] flex justify-center items-center rounded-lg shadow-xl hover:cursor-pointer hover:scale-105 transition-transform">
                        <img
                          src={activities[activity][0]}
                          alt={activity}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="h-fit w-[250px] flex justify-center">
                        <span className="text-blue font-semibold text-lg">{activity}</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    );
}
