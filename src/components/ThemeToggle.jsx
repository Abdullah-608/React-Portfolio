import { Moon, Sun } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);

    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }

    // Create ripple effect
    const ripple = document.createElement("span");
    ripple.classList.add("theme-toggle-ripple");
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 1000);
  };

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        "fixed max-sm:hidden top-6 right-5 z-50 p-3 rounded-full transition-all duration-300",
        "theme-toggle-button",
        isDarkMode 
          ? "bg-slate-800 shadow-lg shadow-purple-500/20" 
          : "bg-white shadow-lg shadow-amber-500/20",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        isDarkMode 
          ? "focus:ring-purple-400 hover:shadow-purple-500/30" 
          : "focus:ring-amber-400 hover:shadow-amber-500/30",
        isHovering ? "scale-110" : "",
        isAnimating ? "scale-95" : ""
      )}
      style={{ 
        overflow: "hidden",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow: isDarkMode 
          ? (isHovering ? "0 0 15px 3px rgba(168, 85, 247, 0.35)" : "0 0 10px rgba(168, 85, 247, 0.2)") 
          : (isHovering ? "0 0 15px 3px rgba(251, 191, 36, 0.35)" : "0 0 10px rgba(251, 191, 36, 0.2)"),
      }}
    >
      <div className="relative">
        <div 
          className={cn(
            "icon-container",
            isDarkMode ? "icon-rotate-out" : "icon-rotate-in"
          )}
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6 text-yellow-300" />
          ) : (
            <Moon className="h-6 w-6 text-blue-900" />
          )}
        </div>
        
        {/* Rays/stars animation around the icon */}
        {isHovering && (
          <div 
            className={cn(
              "absolute inset-0 pointer-events-none",
              isDarkMode ? "stars-container" : "rays-container"
            )}
          >
            {isDarkMode ? (
              // Stars for dark mode
              Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="star"
                  style={{
                    left: `${50 + 35 * Math.cos(i * Math.PI / 3)}%`,
                    top: `${50 + 35 * Math.sin(i * Math.PI / 3)}%`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))
            ) : (
              // Rays for light mode
              Array.from({ length: 8 }).map((_, i) => (
                <span
                  key={i}
                  className="ray"
                  style={{
                    width: '2px',
                    height: i % 2 === 0 ? '12px' : '8px',
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${i * 45}deg) translateY(-14px)`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))
            )}
          </div>
        )}
      </div>
    </button>
  );
};