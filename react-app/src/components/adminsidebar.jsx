import { Link } from "react-router-dom";

export default function Sidebar() {
    const sidebarContents = {'Dashboard' : '/admin/dashboard', 'Manage Skill': '/admin/manage-skill', 
      "Manage Activity": '/admin/manage-activity', 'Manage Community': '/admin/manage-community', 'View Feedback': '/admin/feedback'}
    return(
        <div className="w-1/6 bg-bg-dark border-r-border border-r-[1px] flex flex-col justify-start items-center">
            <span className="logo text-blue mt-3 p-3 text-6xl font-bold">
              कानेव
            </span>
            {
              Object.keys(sidebarContents).map(content => { 
                  return(
                      <span className="text-blue mt-2 p-3 text-2xl hover:cursor-pointer">
                        <Link to={sidebarContents[content]} >
                        {content}
                        </Link>                      
                        </span>
                  )
              })
            }
          </div>
    )
}