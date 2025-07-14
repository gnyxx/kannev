import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";  
import { ToastContainer, toast } from 'react-toastify';

function MultiSelectDropdown({ options, selectedValues, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleOption = (value) => {
        let newValues = selectedValues.includes(value)
            ? selectedValues.filter((v) => v !== value) // Remove if already selected
            : [...selectedValues, value]; // Add if not selected
        onChange(newValues.join(",")); // Convert to comma-separated string
    };

    return (
        <div className="relative w-3/5 mt-3">
            {/* Dropdown button */}
            <div
                className="rounded-md border-2 border-border bg-bg-light p-3 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedValues.length > 0 ? selectedValues.join(", ") : "Select Purpose"}
            </div>

            {/* Dropdown menu */}
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute w-full bg-bg-light border border-border mt-1 rounded-md shadow-md z-10"
                >
                    {options.map((option) => (
                        <label
                            key={option.value}
                            className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                checked={selectedValues.includes(option.value)}
                                onChange={() => toggleOption(option.value)}
                                className="mr-2"
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

function Registration() {
    const [formFields, setFormFields] = useState({
        username: '',
        password: '',
        age: '',
        gender: '',
        state: '',
        city: '',
        purpose: ''
    });

    const navigate = useNavigate();  
    const genderSelectOptions = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
    ];
    const purposeOptions = [
        { label: "Sign language", value: "Sign language" },
        { label: "Braille", value: "Braille" },
        { label: "Pronunciation", value: "Pronunciation" }, 
    ]

    // ✅ Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate missing fields
        const { username, password, age, gender, state, city, purpose } = formFields;
        if (!username || !password || !age || !gender || !state || !city || !purpose) {
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
                if (userExists.username) {
                  toast.error('Username already exists.', {
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
            }

            // Send POST request for registration
            const response = await fetch("http://127.0.0.1:8000/users/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formFields)
            });

            if (response.ok) {
              toast.success('Registration Successful. You will be redirected to the login page.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                });

                // Reset form fields after successful registration
                setFormFields({
                    username: '',
                    password: '',
                    age: '',
                    gender: '',
                    state: '',
                    city: ''
                });
                setTimeout(() => navigate('../login'), 3000);

            } else {
              toast.error('Failed to register. Please try again.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                });
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

            <div className="flex justify-center mt-14 form-font">
                <div className="border-2 p-2 border-border bg-bg-dark text-blue rounded-lg h-fit w-2/5 flex flex-col">
                    <h1 className="font-bold text-4xl flex justify-center m-5">
                        Registration
                    </h1>

                    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
                        <input
                            type="text"
                            placeholder="Username"
                            value={formFields.username}
                            onChange={(e) =>
                                setFormFields((prev) => ({ ...prev, username: e.target.value }))
                            }
                            className="rounded-md placeholder-blue border-border bg-bg-light border-2 mt-3 w-3/5 h-12 p-3"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={formFields.password}
                            onChange={(e) =>
                                setFormFields((prev) => ({ ...prev, password: e.target.value }))
                            }
                            className="rounded-md placeholder-blue border-border bg-bg-light border-2 mt-3 w-3/5 h-12 p-3"
                        />
                        <input
                            type="number"
                            placeholder="Age"
                            value={formFields.age}
                            onChange={(e) =>
                                setFormFields((prev) => ({ ...prev, age: e.target.value }))
                            }
                            className="rounded-md placeholder-blue border-border bg-bg-light border-2 mt-3 w-3/5 h-12 p-3"
                        />
                        <select
                            value={formFields.gender}
                            onChange={(e) =>
                                setFormFields((prev) => ({ ...prev, gender: e.target.value }))
                            }
                            className="rounded-md border-border bg-bg-light border-2 mt-3 w-3/5 h-12 p-3 text-blue"
                        >
                            <option value="" disabled hidden>
                                Gender
                            </option>
                            {genderSelectOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="State"
                            value={formFields.state}
                            onChange={(e) =>
                                setFormFields((prev) => ({ ...prev, state: e.target.value }))
                            }
                            className="rounded-md placeholder-blue border-border bg-bg-light border-2 mt-3 w-3/5 h-12 p-3"
                        />
                        <input
                            type="text"
                            placeholder="City"
                            value={formFields.city}
                            onChange={(e) =>
                                setFormFields((prev) => ({ ...prev, city: e.target.value }))
                            }
                            className="rounded-md placeholder-blue border-border bg-bg-light border-2 mt-3 w-3/5 h-12 p-3"
                        />
            <MultiSelectDropdown
                    options={purposeOptions}
                    selectedValues={formFields.purpose ? formFields.purpose.split(",") : []}
                    onChange={(value) =>
                        setFormFields((prev) => ({
                            ...prev,
                            purpose: value, // Store as comma-separated string
                        }))
                    }
                />

                        <input
                            type="submit"
                            value="Submit"
                            className="bg-blue text-xl mb-5 mt-5 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Registration;
