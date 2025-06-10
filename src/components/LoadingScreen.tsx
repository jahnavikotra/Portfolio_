import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import ParticleField from '../components/Particle';
import TypingLoader from '../components/TypingLoader';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleLoadingComplete = () => {
    setTimeout(() => {
      setIsVisible(false);
      onLoadingComplete?.();
    }, 500);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 w-full h-full bg-black overflow-hidden z-50">
      {/* 3D Particle Background */}
      <Canvas className="absolute inset-0 w-full h-full">
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <ParticleField count={1500} />
          <OrbitControls 
            enabled={false} 
            autoRotate 
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-particles opacity-30" />
      
      {/* Loading Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <TypingLoader onComplete={handleLoadingComplete} />
      </div>
      
      {/* Subtle glow effects */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse-glow" />
      <div 
        className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse-glow" 
        style={{ animationDelay: '1s' }} 
      />
    </div>
  );
};

export default LoadingScreen;
