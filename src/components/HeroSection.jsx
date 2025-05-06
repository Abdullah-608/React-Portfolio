import { ArrowDown, Download } from "lucide-react";
import { useState, useEffect } from "react";

// Text scrambler effect with enhanced animation speed
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
// Enhanced typing effect for roles
const TypeWriter = () => {
  const roles = ["I am a Web Developer", "I am a Freelancer", "I am a Computer Scientist", "I am an App Developer"];
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [delay, setDelay] = useState(100);
  
  useEffect(() => {
    const currentRole = roles[roleIndex];
    
    const timer = setTimeout(() => {
      // If currently adding characters
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        setDelay(100);
        
        // If completed typing the current role
        if (displayText === currentRole) {
          setDelay(2000); // Pause at the end
          setIsDeleting(true);
        }
      } 
      // If currently deleting characters
      else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        setDelay(50);
        
        // If deleted all characters
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
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container max-w-6xl mx-auto z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text content - left side */}
          <div className="text-center md:text-left space-y-8 md:w-3/5">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="opacity-0 animate-fade-in">What’s up? I’m </span>
              <span className="text-primary opacity-0 animate-fade-in-delay-1 block md:inline-block">
                {" "}
                <TextScrambler text="Abdullah" />
              </span>
              <span className="text-gradient opacity-0 animate-fade-in-delay-2 block md:inline-block md:ml-2">
                {" "}
                <TextScrambler text="Mansoor" />
              </span>
            </h1>

            
            <div className="text-xl md:text-2xl font-medium opacity-0 animate-fade-in-delay-3">
            <TypeWriter />
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start opacity-0 animate-fade-in-delay-4">
              <a href="#projects" className="cosmic-button shadow-lg hover:shadow-primary/20 transform hover:-translate-y-1 transition-all duration-300">
                View My Work
              </a>
              <a href="#contact" className="px-6 py-2 rounded-full border-2 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary transition-colors duration-300 flex items-center justify-center gap-2">
                <span>Contact Me</span>
              </a>
            </div>
          </div>
          
          {/* Profile picture - right side with enhanced styling */}
          <div className="md:w-2/5 flex justify-center opacity-0 animate-fade-in-delay-3">
            <div className="relative group">
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow"></div>
              
              {/* Profile image container */}
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl transform group-hover:scale-105 transition-transform duration-500 relative z-10">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img 
                  src="/public/projects/pic.png" 
                  alt="Abdullah Mansoor" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2 font-medium">Scroll Down</span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};