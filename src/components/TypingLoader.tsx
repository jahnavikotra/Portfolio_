import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface TypingLoaderProps {
  onComplete?: () => void;
}

const TypingLoader = ({ onComplete }: TypingLoaderProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [currentText, setCurrentText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  const fullText = "Loading...";

  useEffect(() => {
    const tl = gsap.timeline();

    // Cursor blinking animation
    tl.to(cursorRef.current, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    // Typing animation
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < fullText.length) {
        setCurrentText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
        setIsComplete(true);

        // Fade out the loader text
        setTimeout(() => {
          gsap.to(textRef.current, {
            opacity: 0,
            y: -20,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
              onComplete?.();
            }
          });
        }, 1500);
      }
    }, 100);

    return () => {
      clearInterval(typeInterval);
      tl.kill();
    };
  }, [onComplete]);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div 
      ref={textRef}
      className="text-center z-10 relative"
    >
      <h1 className="text-3xl md:text-6xl font-bold text-white mb-4 tracking-wider">
        {currentText}
        <span
          ref={cursorRef}
          className="inline-block w-1 h-12 md:h-16 bg-white ml-2 animate-pulse-glow"
        >
          |
        </span>
      </h1>

      <div className="w-32 h-1 bg-white/20 mx-auto rounded-full overflow-hidden">
        <div
          className="h-full bg-white rounded-full transition-all duration-300 ease-out"
          style={{ width: `${(currentText.length / fullText.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default TypingLoader;
