import React from 'react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


const educationData = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'Information Technology University',
    startYear: '2023',
    endYear: '2027',
    description: ' Focused on Development and machine learning.'
  },
  {
    degree: 'FSC(Pre-Engineering',
    institution: 'Government College University Lahore (GCU)',
    startYear: '2021',
    endYear: '2023',
    description: 'Blends a rich heritage with academic excellence, continues to foster critical thinking, innovation, and holistic development .'
  }
  // Add more education entries as needed
];

export const Education = () => {
    useEffect(() => {
        AOS.init({
          duration: 1000,
          once: true,
        });
      }, []);
      
  return (
    <section id="education" className="py-24 px-4 bg-gradient-to-b from-secondary/20 to-secondary/40"data-aos="fade-up">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center relative"  data-aos="fade-down">
          My <span className="text-primary">Education</span>
          <div className="absolute w-20 h-1 bg-primary left-1/2 -translate-x-1/2 bottom--4"></div>
        </h2>
        
        <div className="overflow-hidden rounded-xl shadow-xl bg-white/5 backdrop-blur-sm border border-white/10"data-aos="zoom-in-up">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary/20 text-left border-b-2 border-primary/30">
                  <th className="p-5 font-semibold text-lg">Degree</th>
                  <th className="p-5 font-semibold text-lg">Institution</th>
                  <th className="p-5 font-semibold text-lg">Duration</th>
                  <th className="p-5 font-semibold text-lg">Description</th>
                </tr>
              </thead>
              <tbody>
                {educationData.map((edu, index) => (
                  <tr
                    key={index}
                    className="border-b border-white/10 hover:bg-primary/5 transition-all duration-300"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <td className="p-5 font-medium text-primary/90">{edu.degree}</td>
                    <td className="p-5 text-muted-foreground italic font-medium">
                      {edu.institution}
                    </td>
                    <td className="p-5">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary/30 text-white/80">
                        {edu.startYear} - {edu.endYear}
                      </span>
                    </td>
                    <td className="p-5 text-muted-foreground">{edu.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        
      </div>
    </section>
  );
};