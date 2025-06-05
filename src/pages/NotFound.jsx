import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Home, 
  Search, 
  Compass, 
  AlertTriangle
} from "lucide-react";

export const NotFound = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [errorCode, setErrorCode] = useState("404");
  const errorRef = useRef(null);
  const [suggestions] = useState([
    { title: "Home", path: "/", icon: Home },
    { title: "Projects", path: "/#projects", icon: Compass },
    { title: "Contact", path: "/#contact", icon: Search },
  ]);

  useEffect(() => {
    // Simple glitch effect for the 404 text
    const glitchSequence = () => {
      if (!errorRef.current) return;
      
      const options = ["404", "4Ø4", "40¤", "404"];
      
      let iteration = 0;
      const interval = setInterval(() => {
        if (iteration >= options.length) {
          clearInterval(interval);
          setErrorCode("404");
          return;
        }
        
        setErrorCode(options[iteration]);
        iteration++;
      }, 100);
    };

    // Run glitch once on load
    glitchSequence();
    
    // Clean up
    return () => {};
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden relative px-4">
      {/* Simple background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-black/50 pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center">
        {/* Warning indicator */}
        <motion.div 
          className="flex items-center gap-2 text-primary mb-6 bg-primary/10 px-5 py-2 rounded-full"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AlertTriangle size={16} />
          <span className="text-sm font-medium">Page Not Found</span>
        </motion.div>
        
        {/* Main 404 display */}
        <motion.div 
          ref={errorRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="font-bold text-[120px] sm:text-[150px] leading-none text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-border">
              {errorCode}
            </span>
          </h1>
        </motion.div>
        
        {/* Message */}
        <motion.div 
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Lost in Space
          </h2>
          <p className="text-foreground/70">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        {/* Search form */}
        <motion.div 
          className="w-full max-w-md mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search for something else..."
              className="w-full py-3 px-5 pl-12 bg-card border border-border/50 rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/50" size={18} />
          </div>
        </motion.div>
        
        {/* Suggested links */}
        <motion.div 
          className="w-full max-w-md mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-foreground font-medium mb-4 text-center">You might be looking for</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {suggestions.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex flex-col items-center justify-center py-4 px-4 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-colors duration-300 text-foreground"
              >
                <item.icon size={20} className="mb-2 text-primary" />
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link to="/" className="w-full">
            <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium py-3 px-6 rounded-lg cosmic-button">
              <Home size={18} />
              Return Home
            </button>
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="w-full flex items-center justify-center gap-2 bg-card hover:bg-card/80 text-foreground font-medium py-3 px-6 rounded-lg transition-colors duration-300 border border-border/50"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </motion.div>
      </div>
    </div>
  );
};