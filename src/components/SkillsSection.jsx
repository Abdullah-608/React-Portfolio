import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion, AnimatePresence } from "framer-motion";

const skills = [
  // Frontend
  { 
    name: "HTML/CSS", 
    level: 95, 
    category: "Frontend",
    icon: "devicon-html5-plain",
    description: "Creating responsive, accessible and semantic markup with modern CSS techniques"
  },
  { 
    name: "JavaScript", 
    level: 90, 
    category: "Frontend",
    icon: "devicon-javascript-plain",
    description: "ES6+, async/await, DOM manipulation, and modern JS patterns"
  },
  { 
    name: "React", 
    level: 90, 
    category: "Frontend",
    icon: "devicon-react-original",
    description: "Building complex UI with hooks, context API, and state management"
  },
  { 
    name: "Tailwind CSS", 
    level: 90, 
    category: "Frontend",
    icon: "devicon-tailwindcss-plain",
    description: "Utility-first approach for rapid UI development with custom configurations"
  },
  { 
    name: "Bootstrap", 
    level: 80, 
    category: "Frontend",
    icon: "devicon-bootstrap-plain",
    description: "Component-based development with responsive grid system"
  },

  // Programming Languages
  { 
    name: "C/C++", 
    level: 70, 
    category: "Programming Language",
    icon: "devicon-cplusplus-plain",
    description: "Data structures, algorithms, and systems programming"
  },
  { 
    name: "Python", 
    level: 60, 
    category: "Programming Language",
    icon: "devicon-python-plain",
    description: "Scripting, data analysis, and automation"
  },
  { 
    name: "Java", 
    level: 50, 
    category: "Programming Language",
    icon: "devicon-java-plain",
    description: "Object-oriented programming and enterprise applications"
  },

  // Backend
  { 
    name: "Node.js", 
    level: 80, 
    category: "Backend",
    icon: "devicon-nodejs-plain",
    description: "Server-side JavaScript, RESTful APIs, and microservices"
  },
  { 
    name: "Express", 
    level: 75, 
    category: "Backend",
    icon: "devicon-express-original",
    description: "Building robust APIs, middleware integration, and routing"
  },
  { 
    name: "MongoDB", 
    level: 70, 
    category: "Backend",
    icon: "devicon-mongodb-plain",
    description: "NoSQL database design, aggregation, and integration with Node.js"
  },
  { 
    name: "PostgreSQL", 
    level: 65, 
    category: "Backend",
    icon: "devicon-postgresql-plain",
    description: "Relational database design, complex queries, and performance optimization"
  },

  // Tools
  { 
    name: "Git/GitHub", 
    level: 90, 
    category: "Tools",
    icon: "devicon-git-plain",
    description: "Version control, collaborative workflows, and CI/CD integration"
  },
  { 
    name: "Figma", 
    level: 85, 
    category: "Tools",
    icon: "devicon-figma-plain",
    description: "UI/UX design, prototyping, and design system management"
  },
  { 
    name: "VS Code", 
    level: 95, 
    category: "Tools",
    icon: "devicon-vscode-plain",
    description: "Advanced IDE customization, extensions, and productivity workflows"
  },
];

const categories = ["All", "Programming Language","Frontend", "Backend", "Tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isGridView, setIsGridView] = useState(true);
  
  // Track if the component is mounted
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    // Add the DevIcon stylesheet to the document head
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css';
    document.head.appendChild(link);
    
    AOS.init({ 
      duration: 1000, 
      once: true,
      mirror: false,
      easing: 'ease-out-cubic'
    });
    
    setMounted(true);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "All" || skill.category === activeCategory
  );
  
  // Sort skills by level (highest first)
  const sortedSkills = [...filteredSkills].sort((a, b) => b.level - a.level);
  
  const handleSkillClick = (skill) => {
    setSelectedSkill(selectedSkill?.name === skill.name ? null : skill);
  };
  
  // Calculate progress color based on level
  const getProgressColor = (level) => {
    if (level >= 90) return "from-emerald-500 to-green-400";
    if (level >= 80) return "from-blue-500 to-cyan-400";
    if (level >= 70) return "from-indigo-500 to-blue-400";
    if (level >= 60) return "from-violet-500 to-purple-400";
    if (level >= 50) return "from-pink-500 to-rose-400";
    return "from-red-500 to-orange-400";
  };

  // Get category background style
  const getCategoryStyle = (category) => {
    switch(category) {
      case "Frontend": return "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20";
      case "Programming Language": return "bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-violet-500/20";
      case "Backend": return "bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-emerald-500/20";
      case "Tools": return "bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border-amber-500/20";
      default: return "bg-gradient-to-br from-gray-500/10 to-slate-500/10 border-gray-500/20";
    }
  };

  // Calculate mastery level text
  const getMasteryLevel = (level) => {
    if (level >= 90) return "Expert";
    if (level >= 80) return "Advanced";
    if (level >= 70) return "Proficient";
    if (level >= 50) return "Intermediate";
    return "Beginner";
  };

  return (
    <section ref={sectionRef} id="skills" className="py-24 px-4 relative overflow-hidden" data-aos="fade-up">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-secondary/30 pointer-events-none">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl z-10 relative">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-center md:text-left" data-aos="fade-right">
            My <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Technical Skills</span>
          </h2>
          
          <div className="flex items-center gap-4 mt-6 md:mt-0" data-aos="fade-left">
            <button 
              onClick={() => setIsGridView(true)}
              className={cn(
                "p-2 rounded-md transition-all",
                isGridView ? "bg-primary text-primary-foreground" : "bg-card hover:bg-card/80"
              )}
              aria-label="Grid view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            </button>
            <button 
              onClick={() => setIsGridView(false)}
              className={cn(
                "p-2 rounded-md transition-all",
                !isGridView ? "bg-primary text-primary-foreground" : "bg-card hover:bg-card/80"
              )}
              aria-label="List view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-16" data-aos="fade-up">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2.5 rounded-full transition-all duration-300 capitalize",
                "border shadow-sm text-sm font-medium",
                activeCategory === category
                  ? "bg-primary text-primary-foreground border-primary shadow-primary/20"
                  : "bg-card border-border hover:bg-card/80 hover:border-primary/30"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {isGridView ? (
            <motion.div 
              key="grid-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {sortedSkills.map((skill, index) => (
                <motion.div
                  layout
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={cn(
                    "bg-card border rounded-xl overflow-hidden shadow-md transition-all duration-300",
                    "hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1",
                    getCategoryStyle(skill.category),
                    selectedSkill?.name === skill.name ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                  )}
                  onClick={() => handleSkillClick(skill)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <i className={`${skill.icon} text-2xl mr-3 text-primary/80`}></i>
                        <h3 className="font-bold text-lg">{skill.name}</h3>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary">
                        {getMasteryLevel(skill.level)}
                      </span>
                    </div>
                    
                    <div className="relative w-full h-2.5 rounded-full overflow-hidden bg-secondary/50 mb-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                        className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${getProgressColor(skill.level)}`}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-muted-foreground">
                        {skill.category}
                      </span>
                      <span className="text-sm font-semibold">
                        {skill.level}%
                      </span>
                    </div>
                    
                    <AnimatePresence>
                      {selectedSkill?.name === skill.name && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 text-sm text-muted-foreground border-t border-border pt-3"
                        >
                          <p>{skill.description}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="list-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {sortedSkills.map((skill, index) => (
                <motion.div
                  layout
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={cn(
                    "bg-card border p-5 rounded-lg overflow-hidden shadow-sm transition-all duration-300",
                    "hover:shadow-md hover:border-primary/30",
                    getCategoryStyle(skill.category),
                    selectedSkill?.name === skill.name ? "ring-2 ring-primary" : ""
                  )}
                  onClick={() => handleSkillClick(skill)}
                >
                  <div className="flex flex-wrap md:flex-nowrap items-center gap-4">
                    <div className="flex items-center shrink-0">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary/10 text-primary">
                        <i className={`${skill.icon} text-2xl`}></i>
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex flex-wrap justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg">{skill.name}</h3>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary">
                            {getMasteryLevel(skill.level)}
                          </span>
                        </div>
                        <span className="text-sm font-semibold">{skill.level}%</span>
                      </div>
                      
                      <div className="relative w-full h-2.5 rounded-full overflow-hidden bg-secondary/50 mb-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                          className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${getProgressColor(skill.level)}`}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-muted-foreground">
                          {skill.category}
                        </span>
                        <button className="text-xs text-primary hover:underline" onClick={(e) => {
                          e.stopPropagation();
                          handleSkillClick(skill);
                        }}>
                          {selectedSkill?.name === skill.name ? "Hide details" : "Show details"}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {selectedSkill?.name === skill.name && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 text-sm text-muted-foreground border-t border-border pt-3"
                      >
                        <p>{skill.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Summary section */}
        <div className="mt-16 bg-card border rounded-xl p-6 shadow-sm" data-aos="fade-up">
          <h3 className="text-xl font-semibold mb-4">Skills Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {categories.filter(cat => cat !== "All").map((category) => {
              const categorySkills = skills.filter(skill => skill.category === category);
              const avgLevel = Math.round(categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length);
              
              return (
                <div key={category} className="p-4 rounded-lg bg-secondary/20 border border-border">
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">{category}</h4>
                  <p className="text-2xl font-bold">
                    {avgLevel}
                    <span className="text-sm text-muted-foreground font-normal"> / 100</span>
                  </p>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {categorySkills.length} skills
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};