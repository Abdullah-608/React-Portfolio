import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BookOpen, Award, Calendar, MapPin, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';

// Updated education data with correct logo paths and links
const educationData = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'Information Technology University',
    location: 'Lahore, Pakistan',
    startYear: '2023',
    endYear: '2027',
    description: 'Focused on Development and machine learning with emphasis on practical applications.',
    courses: ['Software Engineering', 'Data Structures', 'Machine Learning', 'Algorithm Design'],
    achievements: ['Dean\'s Honor List', 'Technical Lead - CS Society'],
    skills: ['Programming', 'Problem Solving', 'Data Analysis'],
    logo: '../../public/logo1.jpeg', // Updated logo path
    website: 'https://itu.edu.pk/'
  },
  {
    degree: 'FSC (Pre-Engineering)',
    institution: 'Government College University Lahore (GCU)',
    location: 'Lahore, Pakistan',
    startYear: '2021',
    endYear: '2023',
    description: 'Blends a rich heritage with academic excellence, continues to foster critical thinking, innovation, and holistic development.',
    courses: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'],
    achievements: ['Top 10% of graduating class', 'Science Club President'],
    skills: ['Analytical Thinking', 'Research', 'Laboratory Work'],
    logo: '../../public/logo2.jpeg', // Updated logo path
    website: 'https://gcu.edu.pk/' // GCU website link
  }
];

// Timeline node component with animations
const TimelineNode = ({ active, index, onClick }) => (
  <motion.div 
    className={`relative z-10 cursor-pointer transition-all ${active ? 'scale-125' : 'scale-100'}`}
    whileHover={{ scale: 1.2 }}
    onClick={onClick}
  >
    <motion.div 
      className={`w-6 h-6 rounded-full border-4 ${active ? 'border-primary bg-primary/20' : 'border-primary/50 bg-background'} flex items-center justify-center relative`}
      animate={{ 
        borderColor: active ? 'var(--primary)' : 'var(--primary-50)',
        backgroundColor: active ? 'rgba(var(--primary-rgb), 0.2)' : 'var(--background)'
      }}
      transition={{ duration: 0.3 }}
    >
      {active && (
        <motion.div
          className="absolute -inset-3 rounded-full border border-primary/30 z-0"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.2, opacity: 0 }}
        />
      )}
    </motion.div>
    <span className={`absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-sm ${active ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
      {educationData[index].startYear}
    </span>
  </motion.div>
);

// Animated education card component
const EducationCard = ({ education, isActive, delay }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px 0px -100px 0px" });

  return (
    <motion.div
      ref={cardRef}
      className={`rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-500 ${isActive ? 'bg-card/95 border-primary/30 shadow-lg shadow-primary/5' : 'bg-card/70 border-border/50'} border p-0.5`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
    >
      <div className="p-6 md:p-8 relative">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full -z-10"></div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Logo section */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-background/50 flex items-center justify-center overflow-hidden border border-border">
              {education.logo ? (
                <img 
                  src={education.logo} 
                  alt={`${education.institution} logo`} 
                  className="w-12 h-12 md:w-14 md:h-14 object-contain"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite error loop
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(education.institution)}&background=random`;
                  }}
                />
              ) : (
                <BookOpen className="w-10 h-10 text-primary/60" />
              )}
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-grow space-y-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-1 text-foreground group-hover:text-primary transition-colors">
                {education.degree}
              </h3>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-2">
                <div className="flex items-center">
                  <BookOpen size={16} className="mr-1.5 text-primary/70" />
                  <span>{education.institution}</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1.5 text-primary/70" />
                  <span>{education.location}</span>
                </div>
                
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1.5 text-primary/70" />
                  <span>{education.startYear} - {education.endYear}</span>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">
                {education.description}
              </p>
            </div>
            
            {/* Additional details - expandable on active */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: isActive ? 1 : 0,
                height: isActive ? 'auto' : 0
              }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Courses */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold flex items-center">
                    <BookOpen size={14} className="mr-1.5 text-primary/70" />
                    Key Courses
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1">
                    {education.courses.map((course, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary/70 rounded-full mr-2"></span>
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Achievements */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold flex items-center">
                    <Award size={14} className="mr-1.5 text-primary/70" />
                    Achievements
                  </h4>
                  <ul className="space-y-1">
                    {education.achievements.map((achievement, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start">
                        <span className="w-1.5 h-1.5 bg-primary/70 rounded-full mr-2 mt-1.5"></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Skills */}
              <div className="pt-2">
                <h4 className="text-sm font-semibold mb-2 flex items-center">
                  <Sparkles size={14} className="mr-1.5 text-primary/70" />
                  Skills Developed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {education.skills.map((skill, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 text-xs rounded-full border border-border/50 bg-background text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Institution link */}
              <div className="pt-2">
                <a 
                  href={education.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Visit Institution Website
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            </motion.div>
            
            {!isActive && (
              <button
                className="text-sm text-primary hover:text-primary/80 flex items-center mt-2 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  document.dispatchEvent(new CustomEvent('expand-education', { detail: educationData.indexOf(education) }));
                }}
              >
                Show details <ArrowRight size={14} className="ml-1" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Education = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Parallel animation for the progress line
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const springScaleY = useSpring(scaleY, { stiffness: 100, damping: 30 });
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
    
    // Listen for custom events to expand education cards
    const handleExpand = (e) => {
      setActiveIndex(e.detail);
    };
    
    document.addEventListener('expand-education', handleExpand);
    return () => {
      document.removeEventListener('expand-education', handleExpand);
    };
  }, []);

  return (
    <section 
      id="education" 
      ref={containerRef}
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-secondary/40 -z-10"></div>
      <div className="absolute top-0 right-0 w-full h-full bg-grid-pattern opacity-5 -z-10"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Section header with animated underline */}
        <div className="text-center mb-20" data-aos="fade-up">
          <motion.div
            className="inline-block relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
              My <span className="text-primary">Education</span>
            </h2>
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60 rounded-full"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: '100%', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </motion.div>
          
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4" data-aos="fade-up" data-aos-delay="100">
            My academic journey has equipped me with both theoretical knowledge and practical skills
            needed to excel in the field of computer science.
          </p>
        </div>
        
        {/* Timeline visualization */}
        <div className="relative mb-16">
          <div className="flex justify-between items-center mx-auto max-w-md relative z-10">
            {educationData.map((_, index) => (
              <TimelineNode 
                key={index} 
                index={index} 
                active={activeIndex === index}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
          
          {/* Timeline progress bar */}
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[calc(100%-8rem)] h-0.5 bg-primary/20 -z-10">
            <motion.div 
              className="h-full bg-primary origin-left"
              style={{ scaleX: springScaleY }}
            />
          </div>
        </div>
        
        {/* Education cards */}
        <div className="space-y-8">
          {educationData.map((education, index) => (
            <EducationCard 
              key={index}
              education={education}
              isActive={activeIndex === index}
              delay={index}
            />
          ))}
        </div>
        
        {/* Decorative elements */}
        <div className="flex justify-center mt-16" data-aos="fade-up" data-aos-delay="200">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 border border-primary/30">
            <BookOpen className="text-primary" size={24} />
          </div>
        </div>
      </div>
      
      {/* Custom styles for background patterns */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </section>
  );
};