import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DustParticles = ({ trigger }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!trigger) return;
    
    // Generate 6 mini dust particles shooting left and right
    const newParticles = Array.from({ length: 6 }).map((_, i) => {
      const isLeft = i % 2 === 0;
      const angle = (Math.random() * 40 + 10) * (Math.PI / 180); // angle 10 to 50 degrees
      const distance = Math.random() * 30 + 15; // horizontal distance
      
      return {
        id: Date.now() + i + Math.random(),
        targetX: isLeft ? -distance : distance,
        targetY: -Math.sin(angle) * (distance * 0.4),
        size: Math.random() * 4 + 3 // 3px to 7px diameter
      };
    });

    setParticles(newParticles);
    
    // Clear particles after animation
    const timer = setTimeout(() => {
      setParticles([]);
    }, 600);

    return () => clearTimeout(timer);
  }, [trigger]);

  return (
    <div 
      style={{ 
        position: 'absolute', 
        bottom: 8, 
        left: '50%', 
        transform: 'translateX(-50%)', 
        pointerEvents: 'none',
        zIndex: -1 
      }}
    >
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: 0, y: 0, opacity: 0.7, scale: 1 }}
            animate={{
              x: p.targetX,
              y: p.targetY,
              opacity: 0,
              scale: 0.1
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.4)',
              boxShadow: '0 0 3px rgba(255, 255, 255, 0.15)'
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default DustParticles;
