import { useState } from "react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";


const skills = [
  // Frontend
  { name: "HTML/CSS", level: 95, category: "Frontend" },
  { name: "JavaScript", level: 90, category: "Frontend" },
  { name: "React", level: 90, category: "Frontend" },
  { name: "Tailwind CSS", level: 90, category: "Frontend" },
  { name: "Bootstrap", level: 80, category: "Frontend" },

  // Programming
  { name: "C/C++", level: 70, category: "Programming Language" },
  { name: "Python", level: 60, category: "Programming Language" },
  { name: "Java", level: 50, category: "Programming Language" },


  // Backend
  { name: "Node.js", level: 80, category: "Backend" },
  { name: "Express", level: 75, category: "Backend" },
  { name: "MongoDB", level: 70, category: "Backend" },
  { name: "PostgreSQL", level: 65, category: "Backend" },

  // Tools
  { name: "Git/GitHub", level: 90, category: "Tools" },
  { name: "Figma", level: 85, category: "Tools" },
  { name: "VS Code", level: 95, category: "Tools" },
  
];

const categories = ["All", "Programming Language","Frontend", "Backend", "Tools"];

export const SkillsSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "All" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30" data-aos="fade-up">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center"data-aos="fade-down">
          My <span className="text-primary">Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12"  data-aos="zoom-in">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-lg shadow-sm card-hover"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg">{skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <div className="text-right mt-1">
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};