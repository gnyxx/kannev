import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";  
import { ToastContainer, toast } from 'react-toastify';

export default function Header({heading}) {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate(); 

    function logout() {
        localStorage.removeItem('userId');
        navigate('../login');
    }

    async function deleteAccount() {
        try {
            const id = localStorage.getItem('userId');
            await fetch(`http://127.0.0.1:8000/users/user/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });
            localStorage.removeItem('userId');
            toast.success('Account Deleted', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
            setTimeout(() => {
                navigate('../login');
            }, 2000);
        } catch (error) {
            toast.error('An error occurred. Please try again later.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
        }
    }

    return(
        <div className="w-full justify-center flex border-b-border border-b-2 items-center relative">
        <span className="text-blue mt-2 p-3 text-5xl font-semibold tracking-wide flex w-full align-middle justify-center">
          {heading}
        </span>
        {/* Profile Icon */}
        <div className="relative">
          <CgProfile 
            className="text-5xl ml-auto mr-5 hover:cursor-pointer"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          />
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-38 bg-bg-light border border-gray-300 rounded-lg shadow-lg">
              <ul className="py-2">
                <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer" onClick={logout}>
                  Logout
                </li>
                <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-red-500" onClick={deleteAccount}>
                  Delete Account
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    )
}
