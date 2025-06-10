import { ArrowDown, Download } from "lucide-react";
import { useState, useEffect } from "react";

// Refined text scrambler with controlled animation speed
const TextScrambler = ({ text }) => {
  const [output, setOutput] = useState("");
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setOutput(
        text.split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      
      iteration += 1/3;
    }, 30);
    
    return () => clearInterval(interval);
  }, [text]);
  
  return <span>{output}</span>;
};

// Optimized typing effect for roles
const TypeWriter = () => {
  const roles = [
    "Full-Stack Developer", 
    "Software Engineer", 
    "Computer Scientist", 
    "Mobile App Developer"
  ];
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [delay, setDelay] = useState(100);
  
  useEffect(() => {
    const currentRole = roles[roleIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        setDelay(100);
        
        if (displayText === currentRole) {
          setDelay(2000);
          setIsDeleting(true);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        setDelay(50);
        
        if (displayText === "") {
          setIsDeleting(false);
          setRoleIndex((roleIndex + 1) % roles.length);
        }
      }
    }, delay);
    
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);
  
  return (
    <span className="text-primary font-semibold">
      {displayText}
      <span className="animate-pulse ml-1 text-2xl">|</span>
    </span>
  );
};

export const HeroSection = () => {
  const profileImageUrl = "/projects/pic.jpg";
  
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden "
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container max-w-6xl mx-auto z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Text content - left side */}
          <div className="text-center md:text-left space-y-6 md:space-y-8 md:w-3/5 mt-8 md:mt-0">
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-medium text-muted-foreground mb-2">
                Hello, I'm
              </h2>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="text-primary block md:inline-block">
                  <TextScrambler text="Abdullah" />
                </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 block md:inline-block md:ml-2">
                  <TextScrambler text="Mansoor" />
                </span>
              </h1>
            </div>

            <div className="text-xl md:text-2xl font-medium min-h-[2.5rem]">
              <TypeWriter />
            </div>
            
            <p className="text-muted-foreground max-w-lg mx-auto md:mx-0">
              Creating elegant, high-performance solutions with modern technologies.
              Focused on delivering exceptional user experiences through clean code.
            </p>
          
            <div className="pt-4 md:pt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a 
                href="#projects" 
                className="px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300"
              >
                View My Portfolio
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3 rounded-md border-2 border-primary/30 text-primary hover:bg-primary/5 hover:border-primary transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <span>Contact Me</span>
              </a>
              <a 
                href="/public/projects/CV.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                <Download size={16} />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
          
          {/* Professional profile picture - right side */}
          <div className="md:w-2/5 flex justify-center mt-6 lg:mt-0">
            <div className="relative">
              {/* Subtle decorative ring */}
              <div className="absolute inset-0 -m-4 sm:-m-6 md:-m-8 rounded-full border-[2px] border-dashed border-primary/20 animate-spin-slow"></div>
              
              {/* Profile image container with elegant border */}
              <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden 
                          border-[4px] border-primary/10 shadow-xl
                          transform hover:scale-[1.02] transition-transform duration-500 relative z-10">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent 
                             opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <img 
                  src={profileImageUrl}
                  alt="Abdullah Mansoor" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x400.png?text=Abdullah+Mansoor";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      
      {/* Optimized animations */}
      <style jsx>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
      `}</style>
    </section>
  );
};