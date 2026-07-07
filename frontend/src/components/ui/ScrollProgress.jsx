import React, { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initialize progress immediately
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="scroll-progress-container" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        zIndex: 101, // placed just above the navbar drawer, but under overlays
        pointerEvents: 'none',
        background: 'transparent'
      }}
      aria-hidden="true"
    >
      <div 
        className="scroll-progress-bar"
        style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, var(--color-accent) 0%, var(--color-accent-secondary) 100%)',
          transition: 'width 0.1s cubic-bezier(0.1, 0.8, 0.2, 1)'
        }}
      />
    </div>
  );
};

export default ScrollProgress;
