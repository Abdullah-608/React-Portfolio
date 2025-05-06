import { useEffect, useState, useCallback } from "react";

export const StarBackground = () => {
  const [elements, setElements] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Expanded color palettes
  const starColors = [
    "#ffffff", "#fffacd", "#87ceeb", "#e6e6fa", "#ffd700",
    "#ff69b4", "#00ffff", "#7df9ff", "#f0f8ff", "#dda0dd"
  ];

  // Planet colors - more natural/cosmic colors
  const planetColors = [
    "#ff9e7d", // Mars-like
    "#c1b5a7", // Moon-like
    "#a2c5e8", // Neptune-like
    "#e8c9a2", // Saturn-like
    "#c7e8a2", // Alien-like
    "#d696df", // Cosmic purple
    "#f5df80", // Jupiter-like
    "#80f5e8", // Uranus-like
    "#aaa9ad", // Mercury-like
    "#7d9cff"  // Blue gas giant
  ];

  // Flower colors - vibrant and natural colors
  const flowerColors = [
    "#ff6b6b", // Red
    "#ff9ff3", // Pink
    "#feca57", // Yellow
    "#1dd1a1", // Green
    "#54a0ff", // Blue
    "#a29bfe", // Purple
    "#ff7675", // Coral
    "#74b9ff", // Light blue
    "#ff9f43", // Orange
    "#badc58"  // Light green
  ];

  const shapeColors = [
    "#ff6b6b", "#48dbfb", "#1dd1a1", "#feca57", "#5f27cd",
    "#ff9ff3", "#54a0ff", "#ff7675", "#74b9ff", "#a29bfe"
  ];
  
  // Additional shapes and improved shape creation
  const shapes = [
    "circle", "square", "triangle", "diamond", "dot",
    "heart", "cross", "star", "hexagon"
  ];

  // Physics-based movement parameters
  const MAX_VELOCITY = 0.02;
  const DRIFT_FORCE = 0.0001;

  const detectColorScheme = useCallback(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(isDark);
    return isDark;
  }, []);

  const generateElements = useCallback(() => {
    const isDark = detectColorScheme();
    const density = isDark ? 15000 : 8000;
    const numberOfElements = Math.floor(
      (window.innerWidth * window.innerHeight) / density
    );

    const newElements = Array.from({ length: numberOfElements }, (_, i) => {
      const baseElement = {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * MAX_VELOCITY,
        vy: (Math.random() - 0.5) * MAX_VELOCITY,
        size: 0,
        opacity: 0,
        rotation: Math.random() * 360,
        animationDuration: Math.random() * 8 + 6,
        animationDelay: Math.random() * 4,
      };

      // Randomly select element type regardless of mode
      const randomValue = 25;
      
      // 25% chance for stars
      if (randomValue < 0.25) {
        return {
          ...baseElement,
          size: Math.random() ** 2 * 6 + 1,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          opacity: Math.random() * 0.5 + 0.3,
          type: "star",
          glow: Math.random() * 8 + 4,
        };
      } 
      // 25% chance for planets
      else if (randomValue < 0.5) {
        return {
          ...baseElement,
          size: Math.random() * 30 + 15, // Planets are bigger
          color: planetColors[Math.floor(Math.random() * planetColors.length)],
          ringColor: planetColors[Math.floor(Math.random() * planetColors.length)],
          opacity: isDark ? (Math.random() * 0.7 + 0.3) : (Math.random() * 0.4 + 0.1),
          type: "planet",
          hasRing: Math.random() < 0.5, // 50% chance of having rings
          hasPattern: Math.random() < 0.7, // 70% chance of having a pattern
          halo: Math.random() * 10 + 5,
          vx: baseElement.vx * 0.3, // Planets move slower
          vy: baseElement.vy * 0.3,
        };
      } 
      // 25% chance for flowers
      else if (randomValue < 0.75) {
        return {
          ...baseElement,
          size: Math.random() * 20 + 10,
          color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
          centerColor: flowerColors[Math.floor(Math.random() * flowerColors.length)],
          opacity: isDark ? (Math.random() * 0.4 + 0.1) : (Math.random() * 0.5 + 0.2),
          type: "flower",
          petalCount: Math.floor(Math.random() * 5) + 5, // 5-9 petals
          rotationSpeed: (Math.random() - 0.5) * 0.01,
        };
      } 
      // 25% chance for shapes
      else {
        return {
          ...baseElement,
          size: Math.random() ** 2 * 30 + 6,
          color: shapeColors[Math.floor(Math.random() * shapeColors.length)],
          opacity: isDark ? (Math.random() * 0.3 + 0.05) : (Math.random() * 0.3 + 0.1),
          type: "shape",
          shape: shapes[Math.floor(Math.random() * shapes.length)],
        };
      }
    });

    setElements(newElements);
  }, [detectColorScheme]);

  useEffect(() => {
    generateElements();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleColorSchemeChange = () => generateElements();
    const handleResize = () => generateElements();

    mediaQuery.addEventListener("change", handleColorSchemeChange);
    window.addEventListener("resize", handleResize);

    // Smooth physics-based animation loop
    let animationFrame;
    const updateElements = () => {
      setElements(current => current.map(el => {
        // Apply gentle drift with boundary checking
        let vx = el.vx + (Math.random() - 0.5) * DRIFT_FORCE;
        let vy = el.vy + (Math.random() - 0.5) * DRIFT_FORCE;
        
        let x = (el.x + vx) % 100;
        let y = (el.y + vy) % 100;
        if (x < 0) x += 100;
        if (y < 0) y += 100;

        // Add slow rotation for flowers
        let rotation = el.rotation;
        if (el.type === "flower" && el.rotationSpeed) {
          rotation = (rotation + el.rotationSpeed) % 360;
        }

        return { ...el, x, y, vx, vy, rotation };
      }));
      animationFrame = requestAnimationFrame(updateElements);
    };
    animationFrame = requestAnimationFrame(updateElements);

    return () => {
      mediaQuery.removeEventListener("change", handleColorSchemeChange);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, [generateElements]);

  // Render a planet element
  const renderPlanet = (element) => {
    const planetStyle = {
      width: element.size + "px",
      height: element.size + "px",
      left: element.x + "%",
      top: element.y + "%",
      opacity: element.opacity,
      borderRadius: "50%",
      position: "absolute",
      boxShadow: `0 0 ${element.halo}px rgba(255,255,255,0.2)`,
      transition: "all 15s linear",
    };

    // Create planet surface pattern
    let background = element.color;
    if (element.hasPattern) {
      // Create variegated planet surface
      background = `radial-gradient(circle at 30% 30%, 
        ${element.color} 0%, 
        ${element.color}bb 40%, 
        ${element.color}cc 60%,
        ${element.color}dd 80%)`;
    }

    // Element to render
    return (
      <div key={element.id} className="absolute" style={{ ...planetStyle }}>
        {/* Planet body */}
        <div className="w-full h-full rounded-full"
          style={{ 
            background,
            boxShadow: "inset -4px -4px 12px rgba(0,0,0,0.5)",
          }}
        />
        
        {/* Planet ring if it has one */}
        {element.hasRing && (
          <div 
            className="absolute"
            style={{
              width: element.size * 1.5 + "px",
              height: element.size / 3 + "px",
              left: -element.size * 0.25 + "px",
              top: (element.size / 2) - (element.size / 6) + "px",
              borderRadius: "50%",
              border: `1px solid ${element.ringColor}80`,
              background: `linear-gradient(to bottom, 
                ${element.ringColor}20, 
                ${element.ringColor}70, 
                ${element.ringColor}20)`,
              transform: `rotateX(75deg)`,
              transformStyle: "preserve-3d",
            }}
          />
        )}
      </div>
    );
  };

  // Render a flower
  const renderFlower = (element) => {
    const flowerSize = element.size;
    const petalSize = flowerSize / 2;
    
    return (
      <div 
        key={element.id} 
        className="absolute" 
        style={{
          left: element.x + "%",
          top: element.y + "%",
          width: flowerSize + "px",
          height: flowerSize + "px",
          opacity: element.opacity,
          transform: `rotate(${element.rotation}deg)`,
          transition: "all 12s linear",
        }}
      >
        {/* Render petals */}
        {Array.from({ length: element.petalCount }).map((_, i) => {
          const angle = (i * 360) / element.petalCount;
          return (
            <div 
              key={i}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: petalSize + "px",
                height: petalSize * 1.2 + "px",
                borderRadius: "50% 50% 50% 50% / 80% 80% 20% 20%",
                backgroundColor: element.color,
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${petalSize * 0.5}px)`,
                transformOrigin: "center bottom",
              }}
            />
          );
        })}
        
        {/* Flower center */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: flowerSize / 3 + "px",
            height: flowerSize / 3 + "px",
            backgroundColor: element.centerColor || "#ffd700",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    );
  };

  // Shape rendering functions
  const renderShape = (element) => {
    const commonStyles = {
      left: element.x + "%",
      top: element.y + "%",
      opacity: element.opacity,
      transform: `rotate(${element.rotation}deg)`,
      transition: "all 12s linear",
      width: element.size + "px",
      height: element.size + "px",
    };

    switch (element.shape) {
      case "triangle":
        return (
          <div key={element.id} className="absolute"
            style={{
              ...commonStyles,
              borderLeft: `${element.size/2}px solid transparent`,
              borderRight: `${element.size/2}px solid transparent`,
              borderBottom: `${element.size}px solid ${element.color}`,
            }}
          />
        );

      case "heart":
        return (
          <div key={element.id} className="absolute"
            style={{
              ...commonStyles,
              background: `radial-gradient(circle at 60% 30%, ${element.color} 20%, transparent),
                         radial-gradient(circle at 30% 30%, ${element.color} 20%, transparent)`,
              transform: `rotate(45deg) ${commonStyles.transform}`,
              clipPath: "polygon(50% 15%, 84% 15%, 100% 50%, 84% 85%, 50% 100%, 16% 85%, 0 50%, 16% 15%)",
            }}
          />
        );

      case "cross":
        return (
          <div key={element.id} className="absolute"
            style={{
              ...commonStyles,
              background: `linear-gradient(to bottom, transparent 45%, ${element.color} 45%, ${element.color} 55%, transparent 55%),
                         linear-gradient(to right, transparent 45%, ${element.color} 45%, ${element.color} 55%, transparent 55%)`,
            }}
          />
        );

      case "star":
        return (
          <div key={element.id} className="absolute"
            style={{
              ...commonStyles,
              clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              backgroundColor: element.color,
            }}
          />
        );

      case "hexagon":
        return (
          <div key={element.id} className="absolute"
            style={{
              ...commonStyles,
              clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              backgroundColor: element.color,
            }}
          />
        );

      default:
        return (
          <div key={element.id} className="absolute rounded-full"
            style={{
              ...commonStyles,
              backgroundColor: element.color,
              borderRadius: element.shape === "circle" ? "50%" : "3px",
            }}
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {elements.map(el => {
        if (el.type === "star") {
          return (
            <div key={el.id} className="absolute rounded-full animate-pulse"
              style={{
                width: el.size + "px",
                height: el.size + "px",
                left: el.x + "%",
                top: el.y + "%",
                opacity: el.opacity,
                backgroundColor: el.color,
                boxShadow: `0 0 ${el.glow}px ${el.color}`,
                filter: `blur(${el.size/4}px)`,
                transition: "all 12s linear",
              }}
            />
          );
        } else if (el.type === "planet") {
          return renderPlanet(el);
        } else if (el.type === "flower") {
          return renderFlower(el);
        } else {
          return renderShape(el);
        }
      })}
    </div>
  );
};