import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../contexts/ThemeContext'; // adjust this import path


const ParticleField = () => {
  const meshRef = useRef<THREE.Points>(null);
  const { theme } = useTheme(); // get current theme

  const particles = useMemo(() => {
    const count = 1000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.075;
    }
  });

  // Choose color based on context theme
  const color = theme === 'dark' ? '#64B5F6' : '#2D336B';

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={color}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
      />
    </points>
  );
};

export default ParticleField;
