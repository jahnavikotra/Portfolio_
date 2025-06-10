
import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { Github, Linkedin, Sun, Moon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '../contexts/ThemeContext';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Animate navigation on load
    gsap.fromTo('.nav-item', 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.5 }
    );

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
  isScrolled 
  ? 'bg-white/90 dark:bg-black/95 backdrop-blur-sm py-4 shadow-lg' 
  : 'bg-transparent py-6'
}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="nav-item text-2xl font-bold text-gray-900 dark:text-white">Jahnavi Kotra</div>
        
        <div className="hidden md:flex space-x-8">
          {['home', 'about', 'projects', 'experience', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="nav-item capitalize text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text[#222222] transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <div className="nav-item flex items-center space-x-2">
            <Sun className={`h-4 w-4 text-gray-900 dark:text-white transition-opacity ${theme === 'light' ? 'opacity-100' : 'opacity-50'}`} />
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg[#222222]"
            />
            <Moon className={`h-4 w-4 text-gray-900 dark:text-white transition-opacity ${theme === 'dark' ? 'opacity-100' : 'opacity-50'}`} />
          </div>

          <a href="https://github.com/jahnavikotra" target="_blank" rel="noopener noreferrer" 
             className="nav-item text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
            <Github size={24} />
          </a>
          <a href="https://www.linkedin.com/in/jahnavi-kotra-288398287/" target="_blank" rel="noopener noreferrer"
             className="nav-item text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
