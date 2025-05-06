import { ArrowRight, ExternalLink, Github, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Utility function to fetch GitHub repos
const fetchGitHubRepos = async (username) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    return [];
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

export const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    
    const loadGitHubProjects = async () => {
      setLoading(true);
      try {
        // Replace 'Abdullah-608' with your GitHub username
        const repos = await fetchGitHubRepos('Abdullah-608');
        setProjects(repos);
        setError(null);
      } catch (err) {
        setError('Failed to load projects from GitHub');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadGitHubProjects();
  }, []);
  
  return (
    <section id="projects" className="py-24 px-4 relative" data-aos="fade-up">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center" data-aos="fade-down">
          Featured <span className="text-primary">Projects</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto" data-aos="zoom-in">
          Here are some of my recent projects from GitHub. Each project showcases different skills and technologies I've worked with.
        </p>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2 text-muted-foreground">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="text-center p-8 bg-card rounded-lg shadow-md">
            <p className="text-red-500 mb-2">{error}</p>
            <p className="text-muted-foreground">Using fallback project data</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
                data-aos="fade-up"
                data-aos-delay={100}
              >
                <div className="h-48 overflow-hidden bg-secondary/20">
                  {/* Using GitHub social preview image if available or a gradient background */}
                  <div 
                    className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/20"
                    style={{
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <Github size={48} className="text-primary/40" />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.language && (
                      <span 
                        className="px-2 py-1 text-xs font-medium border rounded-full flex items-center"
                        style={{ 
                          backgroundColor: `${getLanguageColor(project.language)}20`, 
                          borderColor: getLanguageColor(project.language) 
                        }}
                      >
                        <span 
                          className="w-2 h-2 rounded-full mr-1"
                          style={{ backgroundColor: getLanguageColor(project.language) }}
                        ></span>
                        {project.language}
                      </span>
                    )}
                    {project.topics && project.topics.slice(0, 2).map((topic) => (
                      <span key={topic} className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                        {topic}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold mb-1">{project.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description || "A cool repository worth checking out!"}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-3">
                      <a
                        href={project.homepage || project.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/80 hover:text-primary transition-colors duration-300"
                      >
                        <ExternalLink size={20} />
                      </a>
                      <a
                        href={project.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/80 hover:text-primary transition-colors duration-300"
                      >
                        <Github size={20} />
                      </a>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {project.stargazers_count > 0 && (
                        <span className="mr-2">⭐ {project.stargazers_count}</span>
                      )}
                      {project.forks_count > 0 && (
                        <span>🍴 {project.forks_count}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12" data-aos="zoom-in-up">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            rel="noopener noreferrer" 
            href="https://github.com/Abdullah-608"
          >
            View More on GitHub <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};