import Sidebar from "../../components/adminsidebar";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

export default function ManageSkill() {
    const skills = ['Sign Language', 'Braille', 'Pronunciation']
    const signLang = [
        {'radius': 5, 'speed': 5},
        {'radius': 4, 'speed': 7},
        {'radius': 5, 'speed': 9},
    ]
    return (
        <div className="flex h-screen">
          <Sidebar />
            <div className="w-5/6 bg-bg-light flex flex-col">
            <div className="w-full justify-center flex border-b-border border-b-2 items-center">
              <span className="text-blue mt-2 p-3 text-5xl font-semibold tracking-wide flex w-full align-middle justify-center">
                Manage Skills
              </span>
              <CgProfile className=" text-5xl ml-auto mr-5 hover:cursor-pointer" />
            </div> 
            <div className="w-full h-full flex flex-col items-center mx-auto p-15 space-y-4">
                    {skills.map((skill, index) => (
                    <div className="h-fit text-3xl text-left w-2/3 shadow-lg bg-bg-dark p-4">
                        {skill}
                        <IoIosArrowDown className="float-end" />
                        </div>
                        // <div className="h-fit text-3xl text-left w-2/3 shadow-lg bg-bg-dark p-4">
                        // Point Focus
                        // <IoIosArrowUp className="float-end" />
                        // </div>
//                         <div className="w-2/3 flex justify-between space-x-2">
//                             <input type="text" placeholder="Radius" className="bg-bg-dark p-1 rounded-lg w-2/3" />
//                             <input type="text" placeholder="Speed" className="bg-bg-dark p-1 rounded-lg w-2/3" />
//                             {/* <input
//   type="file"
//   className="block w-full text-sm text-gray-500 file:ml-10 file:mr-4 file:py-1 file:px-3
//              file:rounded-lg file:border-0 file:text-sm file:font-semibold
//              file:bg-gray-400 file:text-black hover:file:bg-blue-100
//              mx-auto"
//   placeholder="Letter Image"
// />                            */}
// <input type="submit" value="Add" className="bg-blue text-white pr-3 pl-3 rounded-lg  text-lg"/> 
                        
//                         </div>
                        // <div>
                        //     <table className="border-2 ">
                        //         <th className="border-2 p-4">Level</th>
                        //         <th className="border-2 p-4">Radius</th>
                        //         <th className="border-2 p-4">Speed</th>
                        //         <tbody>
                        //             {
                        //                 signLang.map((sign, index) => {
                        //                     return(
                        //                         <tr>
                        //                         <td className="border-2 p-4 text-center align-middle">
                        //                             Level - {index + 1}
                        //                         </td>
                        //                         <td className="border-2 p-4 text-center align-middle">
                        //                             {sign['radius']}
                        //                         </td>
                        //                         <td className="border-2 p-4 text-center align-middle">
                        //                             {sign['speed']}
                        //                         </td>
                        //                     </tr>
                        //                     )
                        //                 })
                        //             }
                        //         </tbody>
                        //     </table>
                        // </div>
                        
                        // <div className="h-fit text-3xl text-left w-2/3 shadow-lg bg-bg-dark p-4">
                        // Mouth Movements
                        // <IoIosArrowDown className="float-end" />
                        // </div>
                     ))} 
                    </div>

            </div>
        </div>
      );
}
