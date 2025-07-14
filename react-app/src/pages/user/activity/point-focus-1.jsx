import { useEffect, useState } from "react";
import Sidebar from "../../../components/usersidebar";
import Header from "../../../components/userHeader";
import VoiceAssistant from "../../../components/voiceassistant";

export default function PointFocusLevel1() {
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [velocity, setVelocity] = useState({ dx: 5, dy: 5 });

    useEffect(() => {
        const containerWidth = 900; // Approximate container width
        const containerHeight = 550; // Approximate container height
        const ballSize = 20; // Size of the ball

        const moveBall = () => {
            setPosition((prev) => {
                let newX = prev.x + velocity.dx;
                let newY = prev.y + velocity.dy;
                let newDx = velocity.dx;
                let newDy = velocity.dy;

                // Check collision with left and right boundaries
                if (newX <= 0 || newX + ballSize >= containerWidth) {
                    newDx = -newDx; // Reverse X direction
                }

                // Check collision with top and bottom boundaries
                if (newY <= 0 || newY + ballSize >= containerHeight) {
                    newDy = -newDy; // Reverse Y direction
                }

                setVelocity({ dx: newDx, dy: newDy });

                return { x: newX, y: newY };
            });
        };

        const interval = setInterval(moveBall, 30); // Updates position every 30ms for smooth motion

        return () => clearInterval(interval); // Cleanup on unmount
    }, [velocity]);

    return (
        <div className="flex h-screen">
            <Sidebar />
            <VoiceAssistant />
            <div className="w-5/6 bg-bg-light flex flex-col">
                <Header heading="Point Focus" />
                <div className="w-full flex flex-col items-center">
                    <span className="p-2 text-5xl font-semibold text-blue">
                        Level - 1
                    </span>
                    <div
                        className="relative rounded-2xl m-10 shadow-2xl w-[900px] h-[550px] p-2 border border-border overflow-hidden"
                        id="container"
                    >
                        <div
                            className="w-5 h-5 rounded-full bg-blue absolute"
                            style={{
                                top: `${position.y}px`,
                                left: `${position.x}px`,
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
