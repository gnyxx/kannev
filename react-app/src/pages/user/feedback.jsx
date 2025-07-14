import Sidebar from "../../components/usersidebar";
import { CgProfile } from "react-icons/cg";
import Header from "../../components/userHeader";
import { useState } from "react";
import { toast,ToastContainer } from "react-toastify";
import VoiceAssistant from "../../components/voiceassistant";
export default function Feedback() {
    const [feedback, setFeedback] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        const userId = localStorage.getItem('userId');

        const f = {
            userId,
            feedback
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/users/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(f)
            });

            if (response.ok) {
                toast.success("Feedback submitted!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    });
                setFeedback("");  
            } else {
                toast.error("Failed to submit feedback.", {
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
            toast.error("An error occurred while sending feedback.", {
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

    return (
        <div className="flex h-screen">
            <Sidebar />
            <VoiceAssistant />
            <ToastContainer />
            <div className="w-5/6 bg-bg-light flex flex-col">
                <Header heading="Feedback" />
                <div className="w-full flex-col">
                    <div className="flex justify-center mx-auto pt-20 pb-5 space-x-10 text-2xl">
                        Your feedback is very valuable to us.
                    </div>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="flex mx-auto w-240 h-100 p-10 bg-white rounded-2xl shadow-2xl"
                            placeholder="Write your feedback here..."
                        />
                        <div className="flex mx-auto m-5">
                            <input
                                type="submit"
                                value="Submit"
                                className="mx-auto border-2 rounded-xl bg-blue text-white p-2 text-2xl w-70 hover:cursor-pointer"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
