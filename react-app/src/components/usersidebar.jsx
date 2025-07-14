import { Link } from "react-router-dom";

export default function Sidebar() {
    const sidebarContents = {'Dashboard' : '/user/dashboard',
      'Translation' : '/user/translation',
      "Community" : '/user/communities',
      'Progress' : '/user/progress',
      'Feedback' : '/user/feedback',
      'About Us' : '/user/about-us'
    }
    return(
        <div className="w-1/6 bg-bg-dark border-r-border border-r-[1px] flex flex-col justify-start items-center">
            <span className="logo text-blue mt-3 p-3 text-6xl font-bold">
              कानेव
            </span> <br />
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