import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Home, 
  RefreshCw, 
  Search, 
  Compass, 
  AlertTriangle
} from "lucide-react";

// Particle component for background effect
const Particles = ({ count = 50 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/10"
          style={{
            width: Math.random() * 10 + 2,
            height: Math.random() * 10 + 2,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
            ],
            y: [
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
            ],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export const NotFound = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [errorCode, setErrorCode] = useState("404");
  const errorRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [suggestions] = useState([
    { title: "Home", path: "/", icon: Home },
    { title: "Projects", path: "/#projects", icon: Compass },
    { title: "Contact", path: "/#contact", icon: Search },
  ]);

  useEffect(() => {
    // Parallax effect based on mouse position
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    // Glitch effect for the 404 text
    const glitchSequence = () => {
      if (!errorRef.current) return;
      
      const options = [
        "404", "4Ø4", "40¤", "4º4", "4○4", 
        "4Ø4", "40⌀", "4◉4", "4⦿4", "404"
      ];
      
      let iteration = 0;
      const interval = setInterval(() => {
        if (iteration >= options.length) {
          clearInterval(interval);
          setErrorCode("404");
          return;
        }
        
        setErrorCode(options[iteration]);
        iteration++;
      }, 80);
    };

    // Periodic glitch effect
    const glitchInterval = setInterval(() => {
      glitchSequence();
    }, 5000);
    
    window.addEventListener("mousemove", handleMouseMove);
    
    // Clean up
    return () => {
      clearInterval(glitchInterval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
      <Particles count={80} />
      
      {/* Decorative orbs */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/5 to-primary/0 blur-3xl opacity-40 pointer-events-none"
        style={{
          transform: `translate(calc(-50% + ${mousePosition.x * 0.2}px), calc(-50% + ${mousePosition.y * 0.2}px))`,
        }}
      ></div>
      <div 
        className="absolute left-1/4 top-1/3 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-indigo-500/5 to-indigo-500/0 blur-3xl opacity-40 pointer-events-none"
        style={{
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
        }}
      ></div>
      <div 
        className="absolute right-1/4 bottom-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-purple-500/5 to-purple-500/0 blur-3xl opacity-40 pointer-events-none"
        style={{
          transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`,
        }}
      ></div>
      
      <div className="relative z-10 px-6 w-full max-w-5xl mx-auto flex flex-col items-center">
        {/* Top warning indicator */}
        <motion.div 
          className="flex items-center gap-2 text-yellow-400 mb-4 bg-yellow-500/10 px-5 py-2 rounded-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AlertTriangle size={16} />
          <span className="text-sm font-medium">Page Not Found</span>
        </motion.div>
        
        {/* Main 404 display */}
        <div className="relative">
          <motion.div 
            ref={errorRef}
            className="relative z-10 select-none"
            style={{
              transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="font-extrabold tracking-widest text-[130px] sm:text-[180px] md:text-[220px] leading-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600 drop-shadow-[0_0_25px_rgba(var(--primary-rgb),0.2)]">
                {errorCode}
              </span>
            </h1>
            
            {/* Digital noise overlay */}
            <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-overlay pointer-events-none"></div>
            
            {/* Glitch lines */}
            <div className="absolute inset-0 overflow-hidden opacity-40">
              <motion.div
                className="h-0.5 bg-primary/50 w-full absolute"
                style={{ top: '30%' }}
                animate={{ 
                  x: ['-100%', '100%'],
                  opacity: [0, 1, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3, 
                  ease: 'linear',
                  repeatDelay: 7,
                }}
              />
              <motion.div
                className="h-0.5 bg-indigo-500/50 w-full absolute"
                style={{ top: '70%' }}
                animate={{ 
                  x: ['100%', '-100%'],
                  opacity: [0, 1, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4, 
                  ease: 'linear',
                  repeatDelay: 9,
                }}
              />
            </div>
          </motion.div>
          
          {/* Shadow and glow effect */}
          <div 
            className="absolute inset-0 blur-3xl bg-gradient-to-b from-primary/20 via-indigo-500/20 to-purple-500/20 opacity-50 rounded-full"
            style={{
              transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px) scale(0.95)`,
            }}
          ></div>
        </div>
        
        {/* Message */}
        <motion.div 
          className="mt-8 mb-12 text-center max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Lost in Digital Space
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            The page you're looking for has drifted into the digital void or might never have existed. 
            Don't worry, you can find your way back.
          </p>
        </motion.div>

        {/* Search form */}
        <motion.div 
          className="w-full max-w-lg mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Try searching for something..."
              className="w-full py-3 px-5 pl-12 pr-12 bg-gray-800/70 border border-gray-700 hover:border-primary/50 focus:border-primary rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/30 backdrop-blur-sm transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <motion.button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw size={18} />
            </motion.button>
          </div>
        </motion.div>
        
        {/* Suggested links */}
        <motion.div 
          className="mb-12 w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-white text-lg font-medium mb-4 text-center">You might be looking for</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {suggestions.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className="flex flex-col items-center justify-center py-5 px-4 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-gray-500 backdrop-blur-sm transition-all duration-300 hover:bg-gray-800/70 text-gray-200 hover:text-white group"
                >
                  <item.icon size={22} className="mb-2 text-primary group-hover:text-primary/80" />
                  <span>{item.title}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link to="/">
            <motion.div
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary/90 hover:to-primary-dark/90 text-white font-medium py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/30 border border-primary/20"
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(var(--primary-rgb), 0.2)" }}
              whileTap={{ y: 0, scale: 0.98 }}
            >
              <Home size={18} />
              Return Home
            </motion.div>
          </Link>
          
          <motion.button 
            onClick={() => window.history.back()}
            className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-medium py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg border border-gray-700"
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ y: 0, scale: 0.98 }}
          >
            <ArrowLeft size={18} />
            Go Back
          </motion.button>
        </motion.div>
      </div>
      
      {/* Custom CSS for background patterns and effects */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        
        :root {
          --primary-rgb: 132, 90, 223;
          --primary-dark: rgb(107, 70, 193);
        }
      `}</style>
    </div>
  );
};