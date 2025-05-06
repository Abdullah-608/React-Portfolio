import { useEffect, useState, useCallback } from "react";

export const StarBackground = () => {
  const [elements, setElements] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Expanded color palettes
  const starColors = [
    "#ffffff", "#fffacd", "#87ceeb", "#e6e6fa", "#ffd700",
    "#ff69b4", "#00ffff", "#7df9ff", "#f0f8ff", "#dda0dd"
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

      if (isDark) {
        return {
          ...baseElement,
          size: Math.random() ** 2 * 6 + 1,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          opacity: Math.random() * 0.4 + 0.4,
          type: "star",
          glow: Math.random() * 8 + 4,
        };
      }
      
      return {
        ...baseElement,
        size: Math.random() ** 2 * 30 + 6,
        color: shapeColors[Math.floor(Math.random() * shapeColors.length)],
        opacity: Math.random() * 0.3 + 0.1,
        type: "shape",
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      };
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

        return { ...el, x, y, vx, vy };
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
      {elements.map(el => el.type === "star" ? (
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
      ) : renderShape(el))}
    </div>
  );
};