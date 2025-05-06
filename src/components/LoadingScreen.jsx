import { useEffect, useState } from "react";

export const LoadingScreen = () => {
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

    // Simulate loading progress
    useEffect(() => {
        const progressTimer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressTimer);
                    setFadeOut(true);
                    return 100;
                }
                return prev + 1;
            });
        }, 40);

        return () => clearInterval(progressTimer);
    }, []);

    return (
        <div
            className={`fixed inset-0 flex flex-col items-center justify-center bg-black transition-opacity duration-1000 ${
                fadeOut ? "opacity-0" : "opacity-100"
            }`}
        >
            <div className="relative flex flex-col items-center">
                {/* 3D Rotating Cube */}
                <div className="relative w-24 h-24 perspective-1000">
                    <div className="absolute w-full h-full animate-cube-rotate">
                        <div className="absolute w-full h-full bg-transparent border-2 border-cyan-400 transform translate-z-12 glow"></div>
                        <div className="absolute w-full h-full bg-transparent border-2 border-cyan-400 transform rotate-y-90 translate-z-12 glow"></div>
                        <div className="absolute w-full h-full bg-transparent border-2 border-cyan-400 transform rotate-y-180 translate-z-12 glow"></div>
                        <div className="absolute w-full h-full bg-transparent border-2 border-cyan-400 transform rotate-y-270 translate-z-12 glow"></div>
                        <div className="absolute w-full h-full bg-transparent border-2 border-cyan-400 transform rotate-x-90 translate-z-12 glow"></div>
                        <div className="absolute w-full h-full bg-transparent border-2 border-cyan-400 transform rotate-x-270 translate-z-12 glow"></div>
                    </div>
                </div>

                {/* Animated Text */}
                <h1 className="mt-8 text-4xl md:text-6xl font-mono text-cyan-300 animate-glitch">
                    Initializing Portfolio
                </h1>

                {/* Progress Bar with Neon Effect */}
                <div className="mt-6 w-80 h-3 bg-gray-900 rounded-full overflow-hidden relative">
                    <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-pink-500 transition-all duration-200 neon-glow"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Progress Percentage */}
                <div className="mt-4 text-lg font-mono text-cyan-300">
                    {progress}% Complete
                </div>

                {/* Background Grid Effect */}
                <div className="absolute inset-0 -z-10 opacity-20">
                    <div className="w-full h-full bg-[linear-gradient(#22d3ee_1px,transparent_1px),linear-gradient(to_right,#22d3ee_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                </div>
            </div>

            {/* Custom Styles */}
            <style jsx>{`
                .perspective-1000 {
                    perspective: 1000px;
                }

                .translate-z-12 {
                    transform: translateZ(48px);
                }

                .rotate-y-90 {
                    transform: rotateY(90deg) translateZ(48px);
                }

                .rotate-y-180 {
                    transform: rotateY(180deg) translateZ(48px);
                }

                .rotate-y-270 {
                    transform: rotateY(270deg) translateZ(48px);
                }

                .rotate-x-90 {
                    transform: rotateX(90deg) translateZ(48px);
                }

                .rotate-x-270 {
                    transform: rotateX(-90deg) translateZ(48px);
                }

                .glow {
                    box-shadow: 0 0 10px rgba(34, 211, 238, 0.8), 0 0 20px rgba(34, 211, 238, 0.5);
                }

                .neon-glow {
                    box-shadow: 0 0 10px rgba(34, 211, 238, 0.8), 0 0 20px rgba(236, 72, 153, 0.5);
                }

                @keyframes cube-rotate {
                    0% {
                        transform: rotateX(0deg) rotateY(0deg);
                    }
                    100% {
                        transform: rotateX(360deg) rotateY(360deg);
                    }
                }

                @keyframes glitch {
                    0% {
                        transform: translate(0);
                        text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75), -0.05em 0 0 rgba(0, 255, 0, 0.75);
                    }
                    14% {
                        transform: translate(-0.05em, 0.05em);
                        text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75), -0.05em 0 0 rgba(0, 255, 0, 0.75);
                    }
                    15% {
                        transform: translate(-0.05em, 0.05em);
                        text-shadow: -0.05em 0 0 rgba(255, 0, 0, 0.75), 0.05em 0 0 rgba(0, 255, 0, 0.75);
                    }
                    49% {
                        transform: translate(0);
                        text-shadow: -0.05em 0 0 rgba(255, 0, 0, 0.75), 0.05em 0 0 rgba(0, 255, 0, 0.75);
                    }
                    50% {
                        transform: translate(0.05em, -0.05em);
                        text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75), -0.05em 0 0 rgba(0, 255, 0, 0.75);
                    }
                    99% {
                        transform: translate(0);
                        text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75), -0.05em 0 0 rgba(0, 255, 0, 0.75);
                    }
                    100% {
                        transform: translate(0);
                        text-shadow: -0.05em 0 0 rgba(255, 0, 0, 0.75), 0.05em 0 0 rgba(0, 255, 0, 0.75);
                    }
                }

                .animate-cube-rotate {
                    animation: cube-rotate 6s linear infinite;
                }

                .animate-glitch {
                    animation: glitch 3s linear infinite;
                }
            `}</style>
        </div>
    );
};