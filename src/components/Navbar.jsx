import { cn } from "@/lib/utils";
import { Menu, X, ChevronRight } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Handle navigation click
  const handleNavClick = useCallback((href) => {
    setIsMenuOpen(false);
    
    // Extract section ID from href
    const sectionId = href.replace("#", "");
    setActiveSection(sectionId);
    
    // Smooth scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 20);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.replace("#", ""));
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);
  
  // Handle keyboard navigation
  const handleKeyDown = useCallback((e, href) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleNavClick(href);
    }
  }, [handleNavClick]);

  return (
    <div className="fixed top-6 left-0 right-0 z-40 flex justify-center">
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "transition-all duration-300 py-2 px-4 md:px-6 inline-flex rounded-full w-[90%] md:w-auto justify-between",
          scrolled 
            ? "bg-[#15181E]/95 backdrop-blur-md shadow-lg" 
            : "bg-[#15181E]/80 backdrop-blur-md"
        )}
      >
        {/* Mobile brand/logo area (left side) */}
        <div className="flex items-center md:hidden">
          <span className="text-white font-medium">Portfolio</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              onKeyDown={(e) => handleKeyDown(e, item.href)}
              tabIndex={0}
              role="button"
              aria-current={activeSection === item.href.replace("#", "") ? "page" : undefined}
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "px-4 py-2 mx-1 rounded-full text-sm font-medium transition-all relative",
                "text-gray-300 hover:text-white"
              )}
            >
              {item.name}
              {activeSection === item.href.replace("#", "") && (
                <motion.span 
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 mx-4"
                />
              )}
            </motion.a>
          ))}
        </div>

        {/* Mobile Navigation Toggle (right side) */}
        <div className="md:hidden">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "text-gray-300 hover:text-white p-2 rounded-full transition-colors",
              isMenuOpen ? "bg-gray-800/50" : ""
            )}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#15181E]/95 backdrop-blur-md border border-gray-800 shadow-xl overflow-hidden rounded-lg w-64"
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col p-2 space-y-1"
              >
                {navItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className={cn(
                      "px-4 py-3 rounded-md flex items-center justify-between transition-all",
                      activeSection === item.href.replace("#", "")
                        ? "bg-gray-800/50 text-white"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/30"
                    )}
                  >
                    <span>{item.name}</span>
                    <ChevronRight size={16} className={activeSection === item.href.replace("#", "") ? "opacity-100" : "opacity-0"} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};