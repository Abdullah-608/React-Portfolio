import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const LoadingScreen = () => {
  const [fadeOut, setFadeOut] = useState(false);
  
  // Set timeout to remove loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 4200);
    
    return () => clearTimeout(timer);
  }, []);

  // Text animation variants
  const welcomeText = "From Concept to Code";
  
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (fadeOut) document.body.style.overflow = "auto";
      }}
      style={{ pointerEvents: fadeOut ? "none" : "auto" }}
    >
      <div className="flex flex-col items-center justify-center text-center">
        {/* Text animation container */}
        <div className="h-20 overflow-hidden">
          <motion.h1 
            className="text-4xl font-bold text-primary relative"
            initial={{ opacity: 1 }}
          >
            {welcomeText.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.1,
                  delay: index * 0.1,
                  ease: "easeIn"
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
        </div>
        
        {/* Animated cursor */}
        <motion.div 
          className="h-1 w-5 bg-primary mt-2"
          animate={{ 
            opacity: [1, 0, 1],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        />
        
        {/* Current date display */}
        <motion.p
          className="text-sm text-primary/70 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          2025-06-05 17:41:29 UTC
        </motion.p>
        
        {/* Loading indicator */}
        <motion.div 
          className="flex gap-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.8 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-primary"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};