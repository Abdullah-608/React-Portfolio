import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

export const NotFound = () => {
  useEffect(() => {
    // Add a subtle animation to the 404 text when component mounts
    const glitchEffect = () => {
      const element = document.getElementById("error-text");
      if (element) {
        element.classList.add("glitch-effect");
        setTimeout(() => {
          element.classList.remove("glitch-effect");
          setTimeout(glitchEffect, 3000 + Math.random() * 2000);
        }, 200);
      }
    };
    
    const interval = setInterval(glitchEffect, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 px-6 text-center">
      <div className="relative">
        <h1 id="error-text" className="text-[150px] md:text-[200px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse">404</h1>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-600/10 blur-xl opacity-30 animate-pulse"></div>
      </div>
      
      <h2 className="text-3xl md:text-4xl font-bold mt-4 text-white">Page Not Found</h2>
      
      <p className="text-gray-300 mt-4 mb-8 max-w-md text-lg">
        The page you're looking for has drifted into the digital void.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
        >
          <ArrowLeft size={20} />
          Return Home
        </Link>
        
        <button 
          onClick={() => window.history.back()}
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
        >
          <ArrowLeft size={20} />
          Go Back
        </button>
      </div>
      
      <style jsx>{`
        .glitch-effect {
          animation: glitch 0.2s linear;
        }
        
        @keyframes glitch {
          0% { transform: translate(0) }
          20% { transform: translate(-2px, 2px) }
          40% { transform: translate(-2px, -2px) }
          60% { transform: translate(2px, 2px) }
          80% { transform: translate(2px, -2px) }
          100% { transform: translate(0) }
        }
      `}</style>
    </div>
  );
};