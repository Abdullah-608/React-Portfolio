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
  return (
    <footer className="py-12 px-4 bg-card relative border-t border-border mt-12 flex flex-col items-center">
      {/* Scroll to top button - positioned at top center */}
      <a
        href="#hero"
        className="absolute -top-5 p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary 
                   transition-all duration-300 hover:scale-110 shadow-md"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </a>
      
      {/* Social media icons - centered */}
      <div className="flex justify-center flex-wrap gap-5 my-8">
        <SocialIcon 
          href="https://github.com/Abdullah-608" 
          icon={faGithub} 
          label="GitHub" 
        />
        <SocialIcon 
          href="http://www.linkedin.com/in/abdullah-608-mansoor" 
          icon={faLinkedin} 
          label="LinkedIn" 
          className="text-blue-600 dark:text-blue-400"
        />
        <SocialIcon 
          href="notfound" 
          icon={faTwitter} 
          label="Twitter"
          className="text-sky-500 dark:text-sky-400" 
        />
        <SocialIcon 
          href="notfound" 
          icon={faInstagram} 
          label="Instagram"
          className="text-pink-600 dark:text-pink-400" 
        />
        <SocialIcon 
          href="notfound" 
          icon={faYoutube} 
          label="YouTube"
          className="text-red-600 dark:text-red-400" 
        />
        <SocialIcon 
          href="mailto:abdullahmansoor608@email.com" 
          icon={faEnvelope} 
          label="Email" 
        />
      </div>
      
      {/* Copyright text */}
      <p className="text-sm text-muted-foreground text-center">
        &copy; {new Date().getFullYear()} Abdullah Mansoor. All rights reserved.
      </p>
    </footer>
  );
};

// Helper component for social media icons
const SocialIcon = ({ href, icon, label, className = "" }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`p-3 ${className} hover:text-primary transition-all duration-300
                 rounded-full bg-background/80 hover:bg-primary/10 hover:scale-110 hover:-translate-y-1
                 shadow-sm hover:shadow-md
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
    >
      <FontAwesomeIcon icon={icon} size="lg" />
    </a>
  );
};
