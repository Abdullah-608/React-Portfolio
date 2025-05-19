import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, ExternalLink, Github, Loader2, Star, GitFork, Code, Filter, X, Eye } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { cn } from "@/lib/utils";

// Map of repository names to custom images
// Add your repository images here - replace with your actual repository names and image paths
const REPO_IMAGES = {
  "my-portfolio": "/images/projects/portfolio.jpg",
  "e-commerce-app": "/images/projects/ecommerce.jpg",
  "chat-application": "/images/projects/chat-app.jpg",
  "task-manager": "/images/projects/task-manager.jpg",
  "weather-app": "/images/projects/weather-app.jpg",
  "blog-platform": "/images/projects/blog.jpg",
  // Add more repository name to image mappings as needed
};

// Function to fetch repository README to extract first image url
const fetchRepoReadmeImage = async (repoFullName) => {
  try {
    const response = await fetch(`https://api.github.com/repos/${repoFullName}/readme`, {
      headers: {
        Accept: "application/vnd.github.v3.raw",
      },
    });

    if (!response.ok) return null;

    const readme = await response.text();
    // Find the first image in the README using regex
    const imageMatch = readme.match(/!\[.*?\]\((.*?)\)/);
    if (imageMatch && imageMatch[1]) {
      // If image is relative, convert to full GitHub URL
      if (!imageMatch[1].startsWith('http')) {
        return `https://raw.githubusercontent.com/${repoFullName}/main/${imageMatch[1].replace(/^\//, '')}`;
      }
      return imageMatch[1];
    }
    return null;
  } catch (error) {
    console.error("Error fetching README image:", error);
    return null;
  }
};

// Enhanced GitHub API fetcher with error handling and rate limit awareness
const fetchGitHubRepos = async (username) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (response.status === 403) {
      const rateLimitReset = response.headers.get('X-RateLimit-Reset');
      const resetDate = rateLimitReset ? new Date(parseInt(rateLimitReset) * 1000) : null;
      throw new Error(`GitHub API rate limit exceeded. ${resetDate ? `Resets at ${resetDate.toLocaleTimeString()}.` : ''}`);
    }

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const repos = await response.json();
    
    // Filter out forked repositories and those with no description
    return repos
      .filter(repo => !repo.fork && repo.description)
      .slice(0, 6); // Limit to 6 repositories
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    throw error;
  }
};

// Get color for programming language
const getLanguageColor = (language) => {
  const colors = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Java: "#b07219",
    C: "#555555",
    "C++": "#f34b7d",
    Ruby: "#701516",
    PHP: "#4F5D95",
    Go: "#00ADD8",
    Rust: "#dea584",
    Swift: "#ffac45",
    Kotlin: "#F18E33",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
    "C#": "#178600",
    default: "#6e5494", // Default purple
  };

  return colors[language] || colors.default;
};

// Format date to readable string
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

export const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allLanguages, setAllLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [hoveredProject, setHoveredProject] = useState(null);
  const projectsRef = useRef(null);
  
  // Function to handle filtering by language
  const filterByLanguage = useCallback((language) => {
    setSelectedLanguage(language);
    if (language === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.language === language));
    }
  }, [projects]);

  // Process repositories with additional data
  const processRepositories = useCallback(async (repos) => {
    // Extract all unique languages
    const languages = ["All", ...new Set(repos.filter(repo => repo.language).map(repo => repo.language))];
    setAllLanguages(languages);

    // Enhanced projects with images
    const enhancedProjects = await Promise.all(repos.map(async (repo) => {
      // Check if we have a pre-defined image for this repo
      let imageUrl = REPO_IMAGES[repo.name];
      
      // If no pre-defined image, try to get from README
      if (!imageUrl) {
        imageUrl = await fetchRepoReadmeImage(repo.full_name);
      }
      
      // If still no image, use a fallback based on language
      if (!imageUrl) {
        // Generate a colored gradient based on the repo language
        const langColor = getLanguageColor(repo.language || 'default');
        const secondaryColor = repo.language ? langColor : '#6e5494';
        imageUrl = `https://via.placeholder.com/800x400/1a1a2e/ffffff?text=${encodeURIComponent(repo.name)}`;
      }
      
      return {
        ...repo,
        imageUrl
      };
    }));

    setProjects(enhancedProjects);
    setFilteredProjects(enhancedProjects);
  }, []);

  useEffect(() => {
    AOS.init({ 
      duration: 800, 
      once: true,
      easing: 'ease-out-cubic',
      mirror: false
    });
    
    const loadGitHubProjects = async () => {
      setLoading(true);
      try {
        const repos = await fetchGitHubRepos('Abdullah-608');
        await processRepositories(repos);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load projects from GitHub');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadGitHubProjects();
  }, [processRepositories]);

  // Fallback project data to use if GitHub API fails
  const fallbackProjects = [
    {
      id: 1,
      name: "Personal Portfolio",
      description: "Responsive portfolio website built with React and Tailwind CSS showcasing my work and skills.",
      html_url: "#",
      homepage: "#",
      language: "JavaScript",
      imageUrl: "/images/projects/portfolio.jpg",
      stargazers_count: 12,
      forks_count: 5,
      topics: ["react", "tailwindcss", "portfolio"],
      pushed_at: "2025-04-10T10:20:30Z"
    },
    {
      id: 2,
      name: "E-Commerce Platform",
      description: "Full-stack e-commerce application with product catalog, cart functionality, and secure checkout.",
      html_url: "#",
      homepage: "#",
      language: "TypeScript",
      imageUrl: "/images/projects/ecommerce.jpg",
      stargazers_count: 18,
      forks_count: 7,
      topics: ["mern-stack", "e-commerce", "stripe"],
      pushed_at: "2025-04-05T15:20:30Z"
    },
    {
      id: 3,
      name: "Weather Dashboard",
      description: "Real-time weather application that provides current conditions and forecasts using OpenWeather API.",
      html_url: "#",
      homepage: "#",
      language: "JavaScript",
      imageUrl: "/images/projects/weather-app.jpg",
      stargazers_count: 8,
      forks_count: 3,
      topics: ["api", "react", "weather"],
      pushed_at: "2025-03-28T12:40:30Z"
    },
    {
      id: 4,
      name: "Task Management App",
      description: "Kanban-style task management application with drag-and-drop interfaces and team collaboration features.",
      html_url: "#",
      homepage: "#",
      language: "TypeScript",
      imageUrl: "/images/projects/task-manager.jpg",
      stargazers_count: 14,
      forks_count: 6,
      topics: ["react", "redux", "firebase"],
      pushed_at: "2025-03-15T09:20:30Z"
    },
    {
      id: 5,
      name: "Blog CMS",
      description: "Content management system for blogs with markdown support, user authentication, and comment system.",
      html_url: "#",
      homepage: "#",
      language: "JavaScript",
      imageUrl: "/images/projects/blog.jpg",
      stargazers_count: 10,
      forks_count: 4,
      topics: ["nextjs", "mongodb", "cms"],
      pushed_at: "2025-02-25T14:30:30Z"
    },
    {
      id: 6,
      name: "Real-time Chat App",
      description: "WebSocket-based chat application with private messaging, group chats, and read receipts.",
      html_url: "#",
      homepage: "#",
      language: "JavaScript",
      imageUrl: "/images/projects/chat-app.jpg",
      stargazers_count: 16,
      forks_count: 8,
      topics: ["socket.io", "react", "mongodb"],
      pushed_at: "2025-02-18T11:10:30Z"
    }
  ];

  // If there's an error, use fallback projects
  useEffect(() => {
    if (error) {
      setProjects(fallbackProjects);
      setFilteredProjects(fallbackProjects);
      const languages = ["All", ...new Set(fallbackProjects.filter(p => p.language).map(p => p.language))];
      setAllLanguages(languages);
    }
  }, [error]);

  return (
    <section id="projects" className="py-24 px-4 relative" ref={projectsRef}>
      <div 
        className="absolute inset-0 bg-gradient-to-b from-background to-background/90 pointer-events-none"
        aria-hidden="true"
      />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 inline-block relative">
            Featured <span className="text-primary">Projects</span>
            <motion.div 
              className="absolute -bottom-2 left-0 h-1 bg-primary rounded-full" 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </h2>

          <p className="text-muted-foreground max-w-3xl mx-auto">
            Check out my recent development projects. Each one represents a unique challenge and showcases different
            technical skills from front-end design to back-end architecture.
          </p>
        </div>

        {/* Language filter pills */}
        {!loading && !error && allLanguages.length > 2 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10" data-aos="fade-up" data-aos-delay="100">
            {allLanguages.map((language) => (
              <button
                key={language}
                onClick={() => filterByLanguage(language)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  "border flex items-center gap-2",
                  selectedLanguage === language 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "bg-secondary/30 hover:bg-secondary/50 border-border"
                )}
              >
                {language !== "All" && (
                  <span 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getLanguageColor(language) }}
                  />
                )}
                {language === "All" ? <Filter size={14} className="mr-1" /> : null}
                {language}
                {selectedLanguage === language && language !== "All" && (
                  <X size={14} className="ml-1 cursor-pointer" onClick={(e) => {
                    e.stopPropagation();
                    filterByLanguage("All");
                  }} />
                )}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground animate-pulse">Fetching latest projects...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedLanguage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                  className="group relative bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border/50 h-full flex flex-col"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Project image with overlay */}
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 opacity-70 transition-opacity group-hover:opacity-90" />
                    
                    <img 
                      src={project.imageUrl} 
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(project.name)}&background=${getLanguageColor(project.language || 'default').replace('#', '')}&color=fff&size=512`;
                      }}
                    />
                    
                    {/* Quick action buttons */}
                    <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {project.homepage && (
                        <a
                          href={project.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-background/90 hover:bg-background p-2 rounded-full transition-all transform hover:scale-110"
                          title="View live demo"
                        >
                          <ExternalLink size={16} className="text-primary" />
                        </a>
                      )}
                      <a
                        href={project.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-background/90 hover:bg-background p-2 rounded-full transition-all transform hover:scale-110"
                        title="View source code"
                      >
                        <Github size={16} className="text-primary" />
                      </a>
                    </div>
                    
                    {/* Project title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
                      <h3 className="text-xl font-bold text-white">
                        {project.name.replace(/-/g, ' ').replace(/_/g, ' ')}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.language && (
                          <span 
                            className="px-2 py-1 text-xs font-medium rounded-full border flex items-center"
                            style={{ 
                              backgroundColor: `${getLanguageColor(project.language)}40`, 
                              borderColor: getLanguageColor(project.language),
                              color: 'white'
                            }}
                          >
                            <span 
                              className="w-2 h-2 rounded-full mr-1"
                              style={{ backgroundColor: getLanguageColor(project.language) }}
                            ></span>
                            {project.language}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Project details */}
                  <div className="p-5 flex-grow flex flex-col">
                    <p className="text-muted-foreground text-sm mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.topics && project.topics.slice(0, 3).map((topic) => (
                        <span key={topic} className="px-2 py-1 text-xs font-medium rounded-full bg-secondary/50 text-secondary-foreground">
                          {topic}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/50">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        <span>Updated {formatDate(project.pushed_at)}</span>
                      </div>
                      <div className="flex gap-4">
                        {project.stargazers_count > 0 && (
                          <span className="flex items-center">
                            <Star size={14} className="mr-1" />
                            {project.stargazers_count}
                          </span>
                        )}
                        {project.forks_count > 0 && (
                          <span className="flex items-center">
                            <GitFork size={14} className="mr-1" />
                            {project.forks_count}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* View details button (only visible on hover) */}
                  <div className={cn(
                    "absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300",
                    hoveredProject === project.id ? "opacity-100" : "opacity-0 pointer-events-none"
                  )}>
                    <a
                      href={project.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-full flex items-center gap-2 hover:bg-primary/90 transition-all transform hover:scale-105"
                    >
                      <Eye size={18} />
                      View Project
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* No projects found message */}
        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <Code size={48} className="mx-auto text-muted-foreground opacity-30" />
            <h3 className="text-xl font-semibold mt-4">No projects found</h3>
            <p className="text-muted-foreground mt-2">
              No projects match the selected filter. Try another category or view all projects.
            </p>
            <button
              onClick={() => filterByLanguage("All")}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-full inline-flex items-center gap-2 hover:bg-primary/90 transition-all"
            >
              <Filter size={16} />
              Show All Projects
            </button>
          </div>
        )}

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          data-aos="fade-up"
        >
          <a
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full inline-flex items-center gap-2 transition-all shadow-lg hover:shadow-primary/20 font-medium"
            target="_blank"
            rel="noopener noreferrer" 
            href="https://github.com/Abdullah-608"
          >
            View More on GitHub <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};