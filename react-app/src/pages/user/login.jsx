import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  
import { ToastContainer, toast } from 'react-toastify';

function Login() {
    const [formFields, setFormFields] = useState({
        username: '',
        password: '',
    })
    const navigate = useNavigate(); 
    
    const handleSubmit = async (e) => {
            e.preventDefault();
    
            // Validate missing fields
            const { username, password} = formFields;
            if (!username || !password) {
              toast.error('Please fill all the fields.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                });
                return
            }
    
    
            try {
                // Check if username already exists
                const checkResponse = await fetch(`http://127.0.0.1:8000/users/user/${username}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
    
                if (checkResponse.ok) {
                    const userExists = await checkResponse.json();
                    if (!userExists.username) {
                      toast.error('Username does not exist.', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                        });                    
                        return;
                    }
                    else {
                      if (formFields.password != userExists.password) {
                        toast.error('Incorrect Password', {
                          position: "top-center",
                          autoClose: 3000,
                          hideProgressBar: true,
                          closeOnClick: false,
                          pauseOnHover: true,
                          draggable: true,
                          theme: "light",
                          });                    
                          return;
                      }
                      else {
                        toast.success('Login Successful!', {
                          position: "top-center",
                          autoClose: 3000,
                          hideProgressBar: true,
                          closeOnClick: false,
                          pauseOnHover: true,
                          draggable: true,
                          theme: "light",
                          }); 
                          
                          
                        localStorage.setItem('userId',userExists.id)
                          setFormFields({
                            username: '',
                            password: '',
                        });
                        navigate('../dashboard')
                      }
                    }
                }

            } catch (error) {
                console.error("Error:", error);
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
        };

 return (
    <div className="App bg-bg-light w-screen min-h-screen" tabIndex={0}>
      <ToastContainer />
      <div className="border-b-border w-screen h-fit border-b-2 flex justify-start">
        <div className="ml-3 flex justify-center">
          <span className="logo text-blue mt-2 p-3 text-5xl font-bold">
            कानेव
          </span>
        </div>
      </div>
      <div className="flex justify-center mt-24 form-font">
        <div className="border-2 p-2 border-border bg-bg-dark text-blue rounded-lg h-fit w-2/5 flex flex-col">
          <h1 className="font-bold text-4xl flex justify-center m-5">
            Login
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
            <input
              type="text"
              placeholder="Username"
              value={formFields.username}
              onChange={(e) =>
                setFormFields((prev) => ({ ...prev, username: e.target.value }))
              }
              className="rounded-md placeholder-blue border-border bg-bg-light border-2 mt-3 w-3/5 m-auto h-12 p-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={formFields.password}
              onChange={(e) =>
                setFormFields((prev) => ({ ...prev, password: e.target.value }))
              }
              className="rounded-md placeholder-blue border-border bg-bg-light border-2 mt-3 w-3/5 m-auto h-12 p-3"
            />
            
            <input
              type="submit"
              value="Submit"
              className="bg-blue text-xl mb-5 m-auto mt-5 text-white hover:cursor-pointer pl-3 pr-3 pt-1.5 pb-1.5 rounded-lg"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
