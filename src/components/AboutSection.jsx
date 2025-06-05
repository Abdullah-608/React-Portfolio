import { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { 
  Download, 
  User, 
  Github, 
  Coffee, 
  Zap, 
  BookOpen,
  Smile,
  Clock
} from "lucide-react";

// Custom hook for counting up numbers
const useCountUp = (end, start = 0, duration = 2000) => {
  const [count, setCount] = useState(start);
  const countRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (countRef.current) {
      observer.observe(countRef.current);
    }
    
    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;
    
    let startTime;
    let animationFrame;
    
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };
    
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, start, duration, isInView]);

  return { count, ref: countRef };
};

// Stats counter card
const StatCard = ({ icon: Icon, label, value, suffix = "", color = "primary" }) => {
  const { count, ref } = useCountUp(value);
  
  return (
    <motion.div
      className={`p-4 rounded-xl bg-${color}/5 border border-${color}/10 flex flex-col items-center justify-center`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`mb-2 p-2 rounded-full bg-${color}/10`}>
        <Icon className={`h-5 w-5 text-${color}`} />
      </div>
      
      <h4 className="text-2xl font-bold" ref={ref}>
        {count}{suffix}
      </h4>
      
      <p className="text-sm text-muted-foreground">{label}</p>
    </motion.div>
  );
};

export const AboutSection = () => {
  const [activeTab, setActiveTab] = useState("about");
  const tabsRef = useRef(null);
  const tabsInView = useInView(tabsRef, { once: true, amount: 0.3 });
  const tabControls = useAnimation();
  
  useEffect(() => {
    if (tabsInView) {
      tabControls.start("visible");
    }
  }, [tabsInView, tabControls]);
  
  // Content for each tab
  const tabContent = {
    about: (
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-2xl font-semibold text-primary/90">
          CS Student | Building, Learning, Growing 🚀
        </h3>

        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Hey! I'm Abdullah — a 20-year-old computer science enthusiast who loves building cool stuff with code. I'm all about web development (especially React and Node.js), staying fit, learning new things every day, and becoming the best version of myself — spiritually, mentally, and physically.
          </p>
          
          <p className="text-muted-foreground leading-relaxed">
            Right now, I'm on a mission to grow in Development, build awesome projects, and earn a Fortune. I'm passionate about creating intuitive interfaces and solving complex problems with elegant solutions.
          </p>
          
          <div className="pt-2 flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-primary/70" />
            <span>Always making time for exciting collaborations and new challenges</span>
          </div>
        </div>
      </motion.div>
    ),
    
    experience: (
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-2xl font-semibold text-primary/90 mb-6">
          What I've Been Doing
        </h3>
        
        <div className="space-y-6">
          <div className="relative pl-8 pb-5 border-l-2 border-primary/20">
            <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-primary"></div>
            <h4 className="text-lg font-medium">Freelance Developer</h4>
            <p className="text-sm text-primary/80">2022 - Present</p>
            <p className="mt-2 text-muted-foreground">
              Building web applications and websites for clients across various industries.
              Focusing on modern frameworks and responsive design.
            </p>
          </div>
          
          <div className="relative pl-8 pb-5 border-l-2 border-primary/20">
            <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-primary"></div>
            <h4 className="text-lg font-medium">Computer Science Student</h4>
            <p className="text-sm text-primary/80">2023 - Present</p>
            <p className="mt-2 text-muted-foreground">
              Studying advanced computer science concepts, algorithms, and data structures.
              Participating in coding competitions and hackathons.
            </p>
          </div>
          
          <div className="relative pl-8 border-l-2 border-primary/20">
            <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-primary"></div>
            <h4 className="text-lg font-medium">Open Source Contributor</h4>
            <p className="text-sm text-primary/80">2022 - Present</p>
            <p className="mt-2 text-muted-foreground">
              Contributing to open source projects in the web development ecosystem.
              Learning from the community and giving back through code contributions.
            </p>
          </div>
        </div>
      </motion.div>
    ),
  };
  
  return (
    <section id="about" className="py-32 px-4 relative overflow-hidden">
      {/* Simplified background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] -z-10"></div>
      
      <div className="container mx-auto max-w-5xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-bold inline-block relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            About <span className="text-primary">Me</span>
            <motion.div 
              className="absolute -bottom-3 left-0 h-1 bg-gradient-to-r from-primary/80 to-primary/30 rounded-full"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: '100%', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Get to know me, my experience, and what drives me to create amazing digital experiences
          </motion.p>
        </motion.div>

        {/* Main content area */}
        <div className="grid grid-cols-1 gap-8 items-start">
          {/* About card with tabs */}
          <motion.div 
            className="bg-card/50 p-8 rounded-xl shadow-lg border border-primary/10 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Tab navigation */}
            <motion.div 
              className="flex space-x-1 bg-muted/50 p-1 rounded-lg mb-8"
              ref={tabsRef}
              initial="hidden"
              animate={tabControls}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    delayChildren: 0.3,
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {[
                { id: "about", label: "About", icon: User },
                { id: "experience", label: "Experience", icon: BookOpen },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground/80 hover:bg-muted"
                  }`}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                  }}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </motion.button>
              ))}
            </motion.div>
            
            {/* Tab content */}
            <div className="min-h-[300px]">
              <AnimatePresence mode="wait">
                {tabContent[activeTab]}
              </AnimatePresence>
            </div>
            
            {/* Stats and buttons */}
            <motion.div 
              className="mt-10 pt-8 border-t border-border/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex flex-wrap justify-between mb-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                  <StatCard 
                    icon={Coffee} 
                    label="Cups of Coffee" 
                    value={472} 
                    suffix="+" 
                  />
                  <StatCard 
                    icon={Github} 
                    label="Projects" 
                    value={24} 
                    suffix="+" 
                    color="indigo" 
                  />
                  <StatCard 
                    icon={Zap} 
                    label="Technologies" 
                    value={15} 
                    suffix="+" 
                    color="amber" 
                  />
                  <StatCard 
                    icon={Smile} 
                    label="Satisfied Clients" 
                    value={12} 
                    suffix="+" 
                    color="emerald" 
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a 
                  href="#contact" 
                  className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get In Touch
                </motion.a>

                <motion.a
                  href="/projects/CV.pdf"
                  download="Abdullah_Mansoor_CV.pdf"
                  className="px-6 py-2.5 rounded-full border-2 border-primary/60 text-primary hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="h-4 w-4" />
                  <span>Download CV</span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Background pattern styles */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </section>
  );
};