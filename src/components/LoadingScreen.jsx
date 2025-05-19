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

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (fadeOut) document.body.style.overflow = "auto";
      }}
      style={{ pointerEvents: fadeOut ? "none" : "auto" }}
    >
      <div className="relative w-full h-full max-w-4xl max-h-4xl flex items-center justify-center overflow-hidden">
        {/* Main Circuit SVG */}
        <svg viewBox="0 0 800 800" className="w-full h-full max-w-4xl">
          {/* Background Grid */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/10" />
          </pattern>
          <rect width="800" height="800" fill="url(#grid)" />
          
          {/* Central Chip */}
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <rect x="350" y="350" width="100" height="100" rx="5" 
              className="fill-primary/20 stroke-primary/70" strokeWidth="2" />
            
            {/* Chip details */}
            <rect x="360" y="360" width="80" height="80" rx="3" 
              className="fill-transparent stroke-primary/40" strokeWidth="1" />
            <rect x="370" y="385" width="60" height="30" 
              className="fill-primary/10 stroke-primary/30" strokeWidth="0.5" />
              
            {/* Chip connection points */}
            {[
              [350, 375], [350, 400], [350, 425],
              [450, 375], [450, 400], [450, 425],
              [375, 350], [400, 350], [425, 350],
              [375, 450], [400, 450], [425, 450]
            ].map(([x, y], i) => (
              <motion.circle 
                key={i} 
                cx={x} cy={y} r="4"
                className="fill-primary/80" 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.7, 1] }}
                transition={{ 
                  duration: 2, 
                  delay: 0.5 + (i * 0.05),
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              />
            ))}
          </motion.g>
          
          {/* Main Circuit Paths */}
          <g className="text-primary/70" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round">
            {/* Horizontal main paths */}
            <motion.path d="M 0,400 L 350,400" 
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            <motion.path d="M 450,400 L 800,400" 
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            
            {/* Vertical main paths */}
            <motion.path d="M 400,0 L 400,350" 
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            <motion.path d="M 400,450 L 400,800" 
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </g>
          
          {/* Secondary Paths */}
          <g className="text-primary/50" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round">
            {/* Top section */}
            <motion.path d="M 400,120 L 480,120 Q 520,120 520,160 L 520,200 Q 520,240 560,240 L 680,240" 
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            />
            <motion.path d="M 400,200 L 320,200 Q 280,200 280,240 L 280,280" 
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            />
            
            {/* Right section */}
            <motion.path d="M 520,400 L 520,480 Q 520,520 560,520 L 640,520 Q 680,520 680,560 L 680,640" 
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            />
            <motion.path d="M 600,400 L 600,320 Q 600,280 640,280 L 700,280" 
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            />
            
            {/* Bottom section */}
            <motion.path d="M 400,520 L 320,520 Q 280,520 280,560 L 280,600 Q 280,640 240,640 L 160,640" 
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.0, ease: "easeOut" }}
            />
            <motion.path d="M 400,600 L 480,600 Q 520,600 520,640 L 520,700" 
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
            />
            
            {/* Left section */}
            <motion.path d="M 280,400 L 280,320 Q 280,280 240,280 L 160,280 Q 120,280 120,240 L 120,120" 
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
            />
            <motion.path d="M 200,400 L 200,480 Q 200,520 160,520 L 120,520" 
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 1.3, ease: "easeOut" }}
            />
          </g>
          
          {/* Connection Nodes */}
          {[
            [200, 400], [280, 400], [520, 400], [600, 400],
            [400, 120], [400, 200], [400, 520], [400, 600],
            [120, 120], [120, 520], [680, 240], [680, 640],
            [280, 280], [700, 280], [160, 640], [520, 700]
          ].map(([cx, cy], i) => (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r="6"
              className="fill-primary/80"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: 1.4 + (i * 0.04),
                ease: "backOut" 
              }}
            />
          ))}
          
          {/* Smaller Connection Points */}
          {[
            [160, 280], [240, 280], [320, 200], [480, 120], [520, 160], [520, 200], [560, 240],
            [240, 640], [320, 520], [480, 600], [520, 640], [560, 520], [640, 520], [680, 560],
            [120, 240], [160, 280], [200, 480], [240, 280], [240, 520], [320, 520], [520, 480], [560, 320],
            [600, 320], [640, 280]
          ].map(([cx, cy], i) => (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r="3"
              className="fill-primary/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: 1.8 + (i * 0.02) 
              }}
            />
          ))}
          
          {/* Data Pulse Animation */}
          {[
            "M 0,400 L 350,400",
            "M 450,400 L 800,400",
            "M 400,0 L 400,350",
            "M 400,450 L 400,800",
            "M 400,120 L 680,240",
            "M 400,200 L 280,280",
            "M 520,400 L 680,640",
            "M 600,400 L 700,280",
            "M 400,520 L 160,640",
            "M 400,600 L 520,700",
            "M 280,400 L 120,120",
            "M 200,400 L 120,520",
          ].map((path, i) => (
            <motion.g key={i}>
              <motion.circle
                r="4"
                className="fill-secondary"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.8, 0.8, 0] 
                }}
                transition={{ 
                  duration: 2,
                  delay: 2 + (i * 0.3),
                  repeat: Infinity,
                  repeatDelay: i % 2 === 0 ? 1 : 2
                }}
              >
                <motion.animateMotion
                  path={path}
                  dur="2s"
                  begin={`${2 + (i * 0.3)}s`}
                  fill="freeze"
                  repeatCount="indefinite"
                  calcMode="linear"
                />
              </motion.circle>
            </motion.g>
          ))}
          
          {/* Glow Effects */}
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          <motion.circle 
            cx="400" cy="400" r="150" 
            className="fill-primary/5"
            filter="url(#glow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0.1, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          />
          
          {/* Center Pulse */}
          <motion.circle
            cx="400"
            cy="400"
            r="70"
            className="fill-transparent stroke-primary/30"
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ 
              opacity: [0, 0.5, 0], 
              scale: [0.2, 2, 3],
              strokeWidth: [3, 0.5, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              repeatDelay: 1
            }}
          />
        </svg>
      </div>
    </motion.div>
  );
};