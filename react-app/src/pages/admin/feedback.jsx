import { useEffect, useState } from "react";
import Sidebar from "../../components/adminsidebar";
import { CgProfile } from "react-icons/cg";

export default function ViewFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    async function fetchFeedback() {
      try {
        const res = await fetch("http://127.0.0.1:8000/admin/feedback");
        const data = await res.json();
        setFeedbacks(data);
      } catch (err) {
        console.error("Failed to fetch feedback:", err);
      }
    }

    fetchFeedback();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-5/6 bg-bg-light flex flex-col">
        <div className="w-full justify-center flex border-b-border border-b-2 items-center">
          <span className="text-blue mt-2 p-3 text-5xl font-semibold tracking-wide flex w-full align-middle justify-center">
            View Feedback
          </span>
          <CgProfile className="text-5xl ml-auto mr-5 hover:cursor-pointer" />
        </div>
        <div className="w-full h-full flex flex-col items-center mx-auto p-15 space-y-4">
          {feedbacks.map((fb, index) => (
            <div
              key={index}
              className="h-fit text-2xl text-left w-2/3 shadow-lg bg-bg-dark p-4 rounded-lg"
            >
              {fb.username}
              <span className="float-end text-sm">
                Submitted on: {new Date(fb.date).toLocaleDateString("en-GB")}
              </span>
              <span className="text-sm block mt-3">{fb.feedback}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
