
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ArrowUp } from 'lucide-react';

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.',
      image: '/images/ecommerce.png',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      liveUrl: '',
      githubUrl: 'https://github.com/jahnavikotra/e-commerce'
    },
    {
      title: 'Task Management App',
      description: 'A task management application with CRUD operations.',
      image: '/images/taskmanager.png',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      liveUrl: '',
      githubUrl: 'https://github.com/jahnavikotra/task-manager'
    },
    {
      title: 'Library Management System',
      description: 'A Library Management System is a software application that helps efficiently manage book inventory, user records, borrowing, and returns in a library.',
      image: '/images/lms.png',
      technologies: ['Java', 'Servlets', 'MySql', 'HTML', 'CSS', 'JavaScript'],
      liveUrl: '',
      githubUrl: 'https://github.com/jahnavikotra/Library_Management_System-main'
    },
    {
      title: 'Freelancer-collab hub',
      description: 'A responsive weather application with location-based forecasts, interactive maps, and beautiful weather animations.',
      image: '/images/freelancer.png',
      technologies: ['React + vite', 'MongoDB', 'Socket.io', '@uimaterials'],
      liveUrl: '',
      githubUrl: 'https://github.com/jahnavikotra/freelancer_collab_hub_frontend'
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const projectCards = section?.querySelectorAll('.project-card');

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

      // Animate project cards
      projectCards?.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 100, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            delay: index * 0.2
          }
        );
      });
    }
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-6 bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">
        <h2 className="section-title text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white">Featured Projects</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="project-card bg-white dark:bg-[#222222] rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group shadow-lg">
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{project.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-blue-100 dark:bg-blue-600/20 text-blue-800 dark:text-blue-400 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    <ArrowUp size={16} />
                    <span>Live Demo</span>
                  </a> 
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
                  >
                    <Github size={16} />
                    <span>Code</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
