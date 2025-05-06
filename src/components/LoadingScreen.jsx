import { useEffect, useState, useRef } from "react";

export const LoadingScreen = () => {
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);
    const [hackingState, setHackingState] = useState("initializing");
    const [randomHexCode, setRandomHexCode] = useState("");
    const terminalRef = useRef(null);

    // Generate random hex code for hacker effect
    const generateRandomHex = (length = 8) => {
        const hexChars = "0123456789ABCDEF";
        return Array.from({ length }, () => hexChars[Math.floor(Math.random() * 16)]).join('');
    };

    // Simulate loading progress and hacking phases
    useEffect(() => {
        const progressTimer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressTimer);
                    setFadeOut(true);
                    return 100;
                }
                
                // Change hacking state based on progress
                if (prev === 25) setHackingState("bypassing");
                if (prev === 50) setHackingState("injecting");
                if (prev === 75) setHackingState("extracting");
                if (prev === 95) setHackingState("complete");
                
                return prev + 1;
            });
        }, 60);

        // Generate random hex codes for hacking effect
        const hexTimer = setInterval(() => {
            setRandomHexCode(generateRandomHex());
        }, 100);

        return () => {
            clearInterval(progressTimer);
            clearInterval(hexTimer);
        };
    }, []);

    // Generate random matrix code (digits, symbols)
    const generateMatrixCode = (length) => {
        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン<>/\\[]{}!@#$%^&*()+_-=:;\"',.?|~`";
        return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    };

    // Terminal messages based on hacking progress
    const hackingMessages = {
        initializing: [
            "> CONNECTING TO TARGET SYSTEM...",
            "> BYPASSING FIREWALL PROTOCOLS...",
            "> SCANNING FOR VULNERABILITIES...",
            "> INITIALIZING EXPLOIT VECTORS...",
            `> ENCRYPTION KEY: ${generateRandomHex(32)}`,
            "> ESTABLISHING SECURE CONNECTION..."
        ],
        bypassing: [
            "> SECURITY SYSTEM DETECTED...",
            "> DEPLOYING COUNTERMEASURES...",
            "> INJECTING TROJAN PAYLOAD...",
            "> NEUTRALIZING INTRUSION DETECTION...",
            `> ACCESS NODE: ${generateRandomHex(8)}-${generateRandomHex(4)}-${generateRandomHex(4)}`,
            "> BYPASSING AUTHENTICATION..."
        ],
        injecting: [
            "> ACCESS GRANTED TO LEVEL 1 SYSTEMS...",
            "> ESCALATING PRIVILEGES...",
            "> CORRUPTING SECURITY PROTOCOLS...",
            "> DEPLOYING ROOTKIT...",
            "> ESTABLISHING BACKDOOR CONNECTION...",
            `> COMMAND SHELL ACQUIRED: ${generateRandomHex(16)}`
        ],
        extracting: [
            "> ACCESSING MAIN DATABASE...",
            "> EXTRACTING PORTFOLIO DATA...",
            "> COMPRESSING DATA PACKAGES...",
            "> COVERING DIGITAL FOOTPRINT...",
            "> WIPING ACCESS LOGS...",
            "> FINALIZING DATA TRANSFER..."
        ],
        complete: [
            "> HACK SUCCESSFUL",
            "> ALL SECURITY SYSTEMS COMPROMISED",
            "> PORTFOLIO ACCESS GRANTED",
            "> WELCOME TO THE SYSTEM, USER",
            "> INITIALIZING PORTFOLIO INTERFACE...",
            `> SESSION KEY: ${generateRandomHex(32)}`
        ]
    };

    return (
        <div
            className={`fixed inset-0 flex flex-col items-center justify-center bg-black transition-opacity duration-1000 ${
                fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
        >
            {/* Digital rain background */}
            <div className="absolute inset-0 overflow-hidden opacity-30 z-0">
                {Array.from({ length: 25 }).map((_, i) => (
                    <div 
                        key={i}
                        className="absolute text-xs text-primary font-mono animate-matrix-fall whitespace-nowrap"
                        style={{
                            left: `${(i / 25) * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${Math.random() * 10 + 5}s`
                        }}
                    >
                        {Array.from({ length: 35 }).map((_, j) => (
                            <div 
                                key={j} 
                                className="py-1"
                                style={{ 
                                    opacity: Math.random() * 0.7 + 0.3,
                                }}
                            >
                                {generateMatrixCode(15)}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Electric circuit pattern overlay */}
            <div className="absolute inset-0 bg-circuit-pattern opacity-10 z-1"></div>

            {/* Main terminal interface */}
            <div className="relative w-full max-w-3xl px-4 z-10">
                {/* Cyberpunk header */}
                <div className="glitch-header text-center mb-6 relative">
                    <h1 className="text-5xl font-glitch text-primary cyber-glitch">SYSTEM <span className="text-secondary">BREACH</span></h1>
                    <div className="flex justify-center items-center gap-3 mt-2">
                        <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
                        <p className="text-secondary tracking-widest text-sm font-mono">
                            {randomHexCode}
                        </p>
                        <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
                    </div>
                </div>

                {/* Hacking main interface */}
                <div className="hacking-interface p-4 rounded-lg border border-primary bg-black/80 cyber-window">
                    {/* Progress visualization */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-primary font-mono text-sm">TARGET: PORTFOLIO_SECURE_SERVER</div>
                        <div className="text-secondary font-mono text-sm blink-slow">{hackingState.toUpperCase()}</div>
                    </div>

                    {/* Animated hacking terminal */}
                    <div className="terminal-window h-60 mb-4 font-mono text-xs text-primary overflow-hidden p-3 bg-black border border-primary/30" ref={terminalRef}>
                        <div className="scanline absolute inset-0 pointer-events-none"></div>
                        <div className="animate-typing">
                            {hackingMessages[hackingState].map((msg, i) => (
                                <p key={i} className="mb-2" style={{ animationDelay: `${i * 0.5}s` }}>{msg}</p>
                            ))}
                        </div>
                    </div>

                    {/* System breach progress */}
                    <div className="mb-3">
                        <div className="flex justify-between text-xs font-mono mb-1">
                            <span className="text-primary">SYS_BREACH//</span>
                            <span className="text-secondary">{progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-black relative overflow-hidden cyber-progress">
                            <div className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-primary to-secondary" style={{ width: `${progress}%` }}>
                                <div className="absolute top-0 right-0 h-full w-4 bg-white/50 skew-x-12 animate-pulse-fast"></div>
                            </div>
                        </div>
                    </div>

                    {/* Status indicators */}
                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                        <div className={`py-1 ${progress > 30 ? 'bg-primary/20 text-primary' : 'bg-red-500/20 text-red-500'}`}>
                            FIREWALL {progress > 30 ? 'BYPASSED' : 'ACTIVE'}
                        </div>
                        <div className={`py-1 ${progress > 60 ? 'bg-primary/20 text-primary' : 'bg-red-500/20 text-red-500'}`}>
                            ENCRYPTION {progress > 60 ? 'CRACKED' : 'LOCKED'}
                        </div>
                        <div className={`py-1 ${progress > 90 ? 'bg-primary/20 text-primary' : 'bg-red-500/20 text-red-500'}`}>
                            ACCESS {progress > 90 ? 'GRANTED' : 'DENIED'}
                        </div>
                    </div>
                </div>

                {/* Data packets visualization */}
                <div className="data-packets-visualization my-4 h-20 relative overflow-hidden">
                    {Array.from({ length: 15 }).map((_, i) => (
                        <div 
                            key={i}
                            className="absolute h-1 bg-primary data-packet"
                            style={{
                                width: `${Math.random() * 60 + 20}px`,
                                top: `${Math.random() * 100}%`,
                                left: '-60px',
                                animationDuration: `${Math.random() * 2 + 1}s`,
                                animationDelay: `${Math.random() * 3}s`
                            }}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Custom Styles */}
            <style jsx>{`
                :root {
                    --primary-color: hsl(265, 80%, 65%);
                    --secondary-color: hsl(198, 60%, 85%);
                    --tertiary-color: hsl(0, 0%, 100%);
                }

                .text-primary {
                    color: var(--primary-color);
                    text-shadow: 0 0 5px rgba(146, 72, 227, 0.7);
                }

                .text-secondary {
                    color: var(--secondary-color);
                    text-shadow: 0 0 5px rgba(91, 192, 235, 0.7);
                }

                .bg-primary {
                    background-color: var(--primary-color);
                }

                .bg-secondary {
                    background-color: var(--secondary-color);
                }

                .border-primary {
                    border-color: var(--primary-color);
                }

                .bg-circuit-pattern {
                    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239248e3' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
                }

                .cyber-window {
                    box-shadow: 0 0 0 1px var(--primary-color), 0 0 20px rgba(146, 72, 227, 0.3);
                    position: relative;
                    overflow: hidden;
                }

                .cyber-window::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 10%;
                    width: 30%;
                    height: 2px;
                    background-color: var(--primary-color);
                }

                .cyber-window::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    right: 10%;
                    width: 30%;
                    height: 2px;
                    background-color: var(--primary-color);
                }

                .cyber-progress {
                    box-shadow: 0 0 0 1px var(--primary-color), inset 0 0 10px rgba(146, 72, 227, 0.2);
                }

                .cyber-glitch {
                    position: relative;
                    animation: cyber-glitch 3s infinite;
                }

                .blink-slow {
                    animation: blink-slow 2s step-end infinite;
                }

                .scanline {
                    background: linear-gradient(
                        to bottom,
                        transparent 0%,
                        rgba(146, 72, 227, 0.2) 50%,
                        transparent 100%
                    );
                    background-size: 100% 4px;
                    animation: scanline 6s linear infinite;
                }

                .animate-matrix-fall {
                    animation: matrix-fall var(--duration, 10s) linear infinite;
                }

                .animate-typing p {
                    opacity: 0;
                    animation: typing-appear 0.5s forwards;
                }

                .animate-pulse-fast {
                    animation: pulse-fast 0.7s linear infinite;
                }

                .data-packet {
                    animation: data-packet-move linear infinite;
                }

                @keyframes cyber-glitch {
                    0%, 100% {
                        text-shadow: 0 0 5px rgba(146, 72, 227, 0.8);
                        transform: translate(0);
                    }
                    5%, 15% {
                        text-shadow: -2px 0 var(--secondary-color), 2px 0 var(--primary-color);
                        transform: translate(-2px, 2px);
                    }
                    10%, 20% {
                        text-shadow: 2px 0 var(--secondary-color), -2px 0 var(--primary-color);
                        transform: translate(2px, -2px);
                    }
                    25% {
                        text-shadow: 0 0 5px rgba(146, 72, 227, 0.8);
                        transform: translate(0);
                    }
                    30% {
                        text-shadow: 0 0 5px rgba(146, 72, 227, 0.8);
                        transform: translate(0);
                    }
                    45%, 55% {
                        text-shadow: -1px 0 var(--secondary-color), 1px 0 var(--primary-color);
                        transform: translate(-1px, 1px);
                    }
                    60% {
                        text-shadow: 0 0 5px rgba(146, 72, 227, 0.8);
                        transform: translate(0);
                    }
                }

                @keyframes blink-slow {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }

                @keyframes scanline {
                    0% {
                        transform: translateY(-100%);
                    }
                    100% {
                        transform: translateY(100%);
                    }
                }

                @keyframes matrix-fall {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }

                @keyframes typing-appear {
                    0% { 
                        opacity: 0;
                        transform: translateY(5px);
                    }
                    100% { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes pulse-fast {
                    0% { opacity: 0; }
                    50% { opacity: 1; }
                    100% { opacity: 0; }
                }

                @keyframes data-packet-move {
                    0% { 
                        transform: translateX(0); 
                        opacity: 0;
                    }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { 
                        transform: translateX(calc(100vw + 60px)); 
                        opacity: 0;
                    }
                }

                .glitch-header::before,
                .glitch-header::after {
                    content: 'SYSTEM BREACH';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    overflow: hidden;
                    background: black;
                }

                .glitch-header::before {
                    left: 2px;
                    text-shadow: -1px 0 var(--secondary-color);
                    animation: glitch-1 2s infinite linear alternate-reverse;
                }

                .glitch-header::after {
                    left: -2px;
                    text-shadow: 1px 0 var(--primary-color);
                    animation: glitch-2 3s infinite linear alternate-reverse;
                }

                @keyframes glitch-1 {
                    0%, 100% { clip-path: inset(80% 0 0 0); }
                    20% { clip-path: inset(20% 0 50% 0); }
                    40% { clip-path: inset(50% 0 0 0); }
                    60% { clip-path: inset(30% 0 10% 0); }
                    80% { clip-path: inset(10% 0 60% 0); }
                }

                @keyframes glitch-2 {
                    0%, 100% { clip-path: inset(20% 0 40% 0); }
                    20% { clip-path: inset(60% 0 0 0); }
                    40% { clip-path: inset(0 0 90% 0); }
                    60% { clip-path: inset(40% 0 20% 0); }
                    80% { clip-path: inset(5% 0 60% 0); }
                }
            `}</style>
        </div>
    );
};