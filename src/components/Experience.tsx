import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      year: '2023 - Present',
      title: 'Frontend Developer',
      company: 'Tech Innovations Inc.',
      description: 'Lead frontend development for large-scale web applications. Mentored junior developers and implemented modern development practices.',
      achievements: ['Led team of 5 developers', 'Improved app performance by 40%', 'Implemented CI/CD pipeline']
    },
    {
      year: 'Feb-Mar - 2024',
      title: 'Web Developer',
      company: 'Ediglobe.',
      description: 'Developed responsive web applications using HTML, CSS, JavaScript, and PHP. Transformed Figma designs into functional user interfaces and handled complete frontend design implementation.',
      achievements: ['Built 2 production applications', 'Task Manager', 'Online Quiz Platform']
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');

    if (section) {
      // Animate section title
      gsap.fromTo(section.querySelector('.section-title'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animate timeline line
      gsap.fromTo(timelineRef.current?.querySelector('.timeline-line'),
        { height: '0%' },
        {
          height: '100%',
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1
          }
        }
      );

      // Animate timeline items
      timelineItems?.forEach((item, index) => {
        gsap.fromTo(item,
          { 
            opacity: 0, 
            x: index % 2 === 0 ? -100 : 100,
            scale: 0.8 
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }
  }, []);

  return (
    <div className="bg-white dark:bg-black py-10 px-4">
    <section id="experience" ref={sectionRef} className="py-20 px-6 bg-[#F0F4FA] dark:bg-[#222222] border-2 border-[#E0E7FF] dark:border-gray-500 rounded-2xl mx-4 sm:mx-8 shadow-lg transition-all duration-300">
      <div className="container mx-auto max-w-4xl">
        <h2 className="section-title text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white">Experience</h2>
        
        <div ref={timelineRef} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 dark:bg-gray-600 h-full">
            <div className="timeline-line w-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
          </div>

          {experiences.map((experience, index) => (
            <div key={index} className={`timeline-item relative flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              {/* Timeline Node */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-800 z-10"></div>
              
              {/* Content */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <div className="bg-white dark:bg-black p-6 rounded-lg shadow-xl">
                  <div className="text-blue-600 dark:text-blue-800 font-semibold mb-2">{experience.year}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{experience.title}</h3>
                  <h4 className="text-purple-600 dark:text-purple-400 font-semibold mb-3">{experience.company}</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{experience.description}</p>
                  
                  <div className="space-y-1">
                    {experience.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
};

export default Experience;
