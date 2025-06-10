
import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import ParticleField from './ParticleField';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline({ delay: 1 });
    
    timeline
      .fromTo(titleRef.current, 
        { opacity: 0, y: 50, scale: 0.8 }, 
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
      )
      .fromTo(subtitleRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 
        "-=0.6"
      )
      .fromTo(ctaRef.current, 
        { opacity: 0, y: 30, scale: 0.9 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }, 
        "-=0.4"
      );
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-black">
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.1} />
          <pointLight position={[10, 10, 10]} intensity={0.3} />
          <ParticleField />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} autoRotate={true} autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Hero Content */}
      <div ref={heroRef} className="relative z-10 text-center px-6">
        <h1 ref={titleRef} className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Jahnavi Kotra
        </h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Creative Web Developer & UI Designer
          <br />
          Crafting digital experiences with passion and precision
        </p>
        <button 
          ref={ctaRef}
          onClick={scrollToProjects}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
        >
          View My Work
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-[49%] transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-black dark:border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-black dark:bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
