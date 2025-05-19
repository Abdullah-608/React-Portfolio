import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faGithub, 
  faLinkedin, 
  faTwitter, 
  faInstagram, 
  faYoutube 
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Handle scroll visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  
  // Scroll to top with smooth behavior
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  return (
    <footer className="py-12 px-4 relative overflow-hidden mt-12">
      {/* Background gradient & effects */}
      <div className="absolute inset-0 -z-10 bg-card opacity-95"></div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 to-card/60"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      {/* Animated border */}
      <div className="absolute top-0 left-0 w-full h-px">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent w-full"></div>
        </div>
      </div>
      
      {/* Scroll to top button with animation */}
      <motion.a
        href="#hero"
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary text-primary-foreground
                   shadow-lg transition-all duration-300 group`}
        initial={{ y: 100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : 100, 
          opacity: isVisible ? 1 : 0,
        }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 0 20px rgba(var(--primary), 0.3)"
        }}
        whileTap={{ scale: 0.95 }}
        aria-label="Scroll to top"
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
        >
          <ArrowUp size={20} />
        </motion.div>
      </motion.a>
      
      {/* Main content */}
      <div className="container mx-auto max-w-6xl">
        {/* Social media icons - centered */}
        <motion.div 
          className="flex justify-center flex-wrap gap-5 my-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            staggerChildren: 0.1,
            delayChildren: 0.1
          }}
        >
          <AnimatedSocialIcon 
            href="https://github.com/Abdullah-608" 
            icon={faGithub} 
            label="GitHub" 
          />
          <AnimatedSocialIcon 
            href="http://www.linkedin.com/in/abdullah-608-mansoor" 
            icon={faLinkedin} 
            label="LinkedIn" 
            className="text-blue-600 dark:text-blue-400"
          />
          <AnimatedSocialIcon 
            href="notfound" 
            icon={faTwitter} 
            label="Twitter"
            className="text-sky-500 dark:text-sky-400" 
          />
          <AnimatedSocialIcon 
            href="notfound" 
            icon={faInstagram} 
            label="Instagram"
            className="text-pink-600 dark:text-pink-400" 
          />
          <AnimatedSocialIcon 
            href="notfound" 
            icon={faYoutube} 
            label="YouTube"
            className="text-red-600 dark:text-red-400" 
          />
          <AnimatedSocialIcon 
            href="mailto:abdullahmansoor608@email.com" 
            icon={faEnvelope} 
            label="Email" 
          />
        </motion.div>
        
        {/* Copyright text with animation */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {/* Animated glow line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-6 w-48 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          
          <motion.p 
            className="text-sm text-muted-foreground text-center relative"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            &copy; {new Date().getFullYear()} Abdullah Mansoor. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

// Animated social icon component with effects
const AnimatedSocialIcon = ({ href, icon, label, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.15, 
        y: -5,
        transition: { type: "spring", stiffness: 300 } 
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative overflow-hidden group">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`
            p-3.5 ${className} transition-all duration-300
            rounded-full bg-background/80 hover:bg-primary/10 hover:text-primary
            shadow-sm group-hover:shadow-lg group-hover:shadow-primary/10
            flex items-center justify-center
            focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
          `}
        >
          <FontAwesomeIcon icon={icon} size="lg" />
          
          {/* Glow effect on hover */}
          <span className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/5 blur-md transition-all duration-500"></span>
          
          {/* Ripple effect on hover */}
          <span className="absolute inset-0 scale-0 rounded-full border border-primary/20 group-hover:scale-150 group-hover:opacity-0 transition-all duration-700"></span>
        </a>
        
        {/* Tooltip on hover */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2.5 py-1 bg-card/90 backdrop-blur-sm border border-primary/10 rounded text-xs text-foreground/80 whitespace-nowrap
                    opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 pointer-events-none transition-all duration-300 z-10">
          {label}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-card border-r border-b border-primary/10 transform rotate-45"></div>
        </div>
      </div>
    </motion.div>
  );
};