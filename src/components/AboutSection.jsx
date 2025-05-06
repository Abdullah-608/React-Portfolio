import { Briefcase, Code, Download, User } from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';


export const AboutSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  
  return (
    <section id="about" className="py-24 px-4 relative"data-aos="fade-up">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center relative" data-aos="fade-down" >
          About <span className="text-primary">Me</span>
          <div className="absolute w-20 h-1 bg-gradient-to-r from-primary/80 to-primary/30 bottom-0 left-1/2 transform -translate-x-1/2 mt-4"></div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"data-aos="fade-right">
          <div className="space-y-6 bg-card/50 p-8 rounded-xl shadow-lg border border-primary/10 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold text-primary/90">
             CS Student |  Building, Learning, Growing 🚀
            </h3>

            <p className="text-muted-foreground leading-relaxed">
            Hey! I’m Abdullah — a 20-year-old computer science enthusiast who loves building cool stuff with code. I’m all about web development (especially React and Node.js), staying fit, learning new things every day, and becoming the best version of myself — spiritually, mentally, and physically. Right now, I’m on a mission to grow in Development, build awesome projects, and earn a Fortune.
            </p>

            

            <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center sm:justify-start"data-aos="zoom-in">
              <a href="#contact" className="cosmic-button shadow-lg hover:shadow-primary/20 transform hover:-translate-y-1 transition-all duration-300">
                Get In Touch
              </a>

              <a
                href="/public/projects/CV.pdf"
                download="Abdullah_Mansoor_CV.pdf"
                className="px-6 py-2 rounded-full border-2 border-primary/60 text-primary hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                <Download className="h-4 w-4" />
                <span>Download CV</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover transform transition-transform duration-300 hover:-translate-y-2 bg-card/30 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 shadow-inner">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg text-primary/90">Web Development</h4>
                  <p className="text-muted-foreground">
                    Creating responsive websites and web applications with
                    modern frameworks.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="gradient-border p-6 card-hover transform transition-transform duration-300 hover:-translate-y-2 bg-card/30 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 shadow-inner">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg text-primary/90">App Develoment</h4>
                  <p className="text-muted-foreground">
                    Creative Android Apps in Android Studio with Help of Jetpack Compose
                  </p>
                </div>
              </div>
            </div>
            
            <div className="gradient-border p-6 card-hover transform transition-transform duration-300 hover:-translate-y-2 bg-card/30 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 shadow-inner">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg text-primary/90">Computer Science</h4>
                  <p className="text-muted-foreground">
                    Leading projects from conception to completion with agile
                    methodologies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};