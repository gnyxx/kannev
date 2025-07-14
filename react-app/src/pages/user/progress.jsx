import Sidebar from "../../components/usersidebar";
import { CgProfile } from "react-icons/cg";
import Header from "../../components/userHeader";
import VoiceAssistant from "../../components/voiceassistant";
export default function UserDashboard() {
    const skills = {
      'Sign Language': {total : 10, completed: 5},
      'Braille': {total : 15, completed: 7},
      'Pronunciation': {total : 10, completed: 2}
    }
    const activities = {
      'Sign Language Conversation': {total : 11, completed: 5},
      'Point Focus': {total : 10, completed: 9},
      'Mouth Movements': {total : 12, completed: 2}
    }
    
    return (
        <div className="flex h-screen">
          <Sidebar />
          <VoiceAssistant />
          <div className="w-5/6 bg-bg-light flex flex-col">
            <Header heading="Progress" />
            <div className="w-full flex-col">
              <div className="p-2 m-3">
                <span className="text-blue mt-2 p-3 text-4xl font-semibold">
                  Skills
                </span>
              </div>
              <div className="flex flex-col justify-center">
                {Object.keys(skills).map(skill => {
                   return (
                    <div className="flex flex-col items-start justify-center m-2">
                      {/* Skill Name and Percentage in the Same Line */}
                      <div className="flex justify-between items-center w-2/3 ml-12">
                        <span className="text-xl">{skill}</span>
                        <span className="text-sm">{((skills[skill].completed / skills[skill].total) * 100).toFixed(0)}%</span>
                      </div>
                  
                      {/* Progress Bar */}
                      <div className="relative ml-12 mt-1 h-3 w-2/3 bg-light rounded-2xl overflow-hidden">
                        <progress
                          value={skills[skill].completed}
                          max={skills[skill].total}
                          className="absolute top-0 left-0 h-full w-full appearance-none
                                     [&::-webkit-progress-bar]:bg-bg-dark
                                     [&::-webkit-progress-value]:bg-green-600
                                     [&::-moz-progress-bar]:bg-green-600"
                        />
                      </div>
                    </div>
                  );
                  
                })}
              </div>
            </div>
            <div className="w-full flex-col">
              <div className="p-2 m-3">
                <span className="text-blue mt-2 p-3 text-4xl font-semibold">
                  Activities 
                </span>
              </div>
              <div className="flex flex-col justify-center">
                {Object.keys(activities).map(activity => {
                    return (
                      <div className="flex flex-col items-start justify-center m-2">
                        {/* Skill Name and Percentage in the Same Line */}
                        <div className="flex justify-between items-center w-2/3 ml-12">
                          <span className="text-xl">{activity}</span>
                          <span className="text-sm">{((activities[activity].completed / activities[activity].total) * 100).toFixed(0)}%</span>
                        </div>
                    
                        {/* Progress Bar */}
                        <div className="relative ml-12 mt-1 h-3 w-2/3 bg-light rounded-2xl overflow-hidden">
                          <progress
                            value={activities[activity].completed}
                            max={activities[activity].total}
                            className="absolute top-0 left-0 h-full w-full appearance-none
                                       [&::-webkit-progress-bar]:bg-bg-dark
                                       [&::-webkit-progress-value]:bg-green-600
                                       [&::-moz-progress-bar]:bg-green-600"
                          />
                        </div>
                      </div>
                    );
                    
                })}
              </div>
            </div>
          </div>
        </div>
      );
}
