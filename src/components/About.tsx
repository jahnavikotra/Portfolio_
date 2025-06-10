import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { name: 'React', level: 80 },
    { name: 'HTML 5', level: 95 },
    { name: 'CSS', level: 90 },
    { name: 'JavaScript', level: 75 },
    { name: 'WordPress', level: 80 },
    { name: 'Canva', level: 90 },
    { name: 'Figma', level: 80 },
    { name: 'Git', level: 85 },
    { name: 'PHP', level: 70 },
    { name: 'Bootstrap', level: 80 },
    { name: 'SQL', level: 75 },
    { name: 'Python', level: 70 },
    { name: 'Node.js', level: 75 },
    { name: 'REST API', level: 75 },
    { name: 'jQuery', level: 70 },
    { name: 'Tailwind css', level: 75 }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const skillBars = skillsRef.current?.querySelectorAll('.skill-bar');

    if (section) {
      gsap.fromTo(section.querySelector('.about-content'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      skillBars?.forEach((bar, index) => {
        const skillLevel = skills[index].level;
        const progressBar = bar.querySelector('.progress');

        gsap.fromTo(progressBar,
          { width: '0%' },
          {
            width: `${skillLevel}%`,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }
  }, []);

  const mid = Math.ceil(skills.length / 2);
  const firstHalf = skills.slice(0, mid);
  const secondHalf = skills.slice(mid);

  return (
    <div className="bg-white dark:bg-black py-10 px-4">
    <section
    id="about"
    ref={sectionRef}
    className="py-20 px-6 bg-[#F0F4FA] dark:bg-[#222222] border-2 border-[#E0E7FF] dark:border-gray-500 rounded-2xl mx-4 sm:mx-8 shadow-lg transition-all duration-300"
    >

      <div className="container mx-auto max-w-6xl">
        <div className="about-content">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black dark:text-white">About Me</h2>

          <div className="text-center mb-16">
            <p className="text-lg text-black dark:text-gray-300 mb-6 leading-relaxed">
              I'm a frontend developer and a soon-to-be CS graduate from IIIT Tiruchirappalli.
              I'm passionate about designing and building engaging, user-focused websites and love turning ideas into digital realities.
            </p>
            <p className="text-lg text-black dark:text-gray-300 mb-6 leading-relaxed">
              Outside of coding, I enjoy reading books, listening to music, and exploring creative design inspirations.
            </p>
            <div className="flex justify-center">
              <a
                href="/JahnaviKotra_resume.pdf"
                 download
                 className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-colors duration-300">
                Download Resume
              </a>
            </div>
          </div>

          <div ref={skillsRef}>
            <h3 className="text-2xl font-semibold mb-8 text-black dark:text-gray-300 text-center">Here are some Technologies I have been working with</h3>
            <div className="grid md:grid-cols-2 gap-12">
              {[firstHalf, secondHalf].map((column, colIdx) => (
                <div key={colIdx} className="space-y-6">
                  {column.map((skill) => (
                    <div key={skill.name} className="skill-bar">
                      <div className="flex justify-between mb-2">
                        <span className="text-black-300">{skill.name}</span>
                        <span className="text-black-600">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3">
                      <div className="progress bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default About;
