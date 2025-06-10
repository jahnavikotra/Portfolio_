import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Navigation from '../components/Navigation';
import LoadingScreen from '../components/LoadingScreen'; 

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (!showLoading) {
      // Smooth scrolling + ScrollTrigger setup after loading finishes
      gsap.set("html", { scrollBehavior: "smooth" });
      ScrollTrigger.refresh();

      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, [showLoading]);

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  return (
    <>
      {showLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}

      {!showLoading && (
        <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen transition-colors duration-300">
          <Navigation />
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Contact />
        </div>
      )}
    </>
  );
};

export default Index;
