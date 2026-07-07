import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const TuxCompanion = ({ reaction = 'idle' }) => {
  const [localReaction, setLocalReaction] = useState('idle');
  const [isBlinking, setIsBlinking] = useState(false);

  // Coordinating TUX idle behavior loop and reactive state overrides
  useEffect(() => {
    if (reaction !== 'idle') {
      setLocalReaction(reaction);
      return;
    }

    setLocalReaction('idle');

    let active = true;

    // TUX Idle Sequence: Look left -> Blink -> Small wave -> Bounce -> Look back
    const playIdleSequence = async () => {
      while (active) {
        // Sleep between idle loops
        await sleep(3500 + Math.random() * 2000);
        if (!active) return;

        // 1. Look toward the terminal
        setLocalReaction('lookLeft');
        await sleep(800);
        if (!active) return;

        // 2. Blink eyes
        setIsBlinking(true);
        await sleep(120);
        setIsBlinking(false);
        if (!active) return;

        // 3. Small friendly wave
        setLocalReaction('smallWave');
        await sleep(1000);
        if (!active) return;

        // 4. Tiny happy bounce
        setLocalReaction('bounce');
        await sleep(600);
        if (!active) return;

        // 5. Look back to user
        setLocalReaction('idle');
      }
    };

    playIdleSequence();

    return () => {
      active = false;
    };
  }, [reaction]);

  // Framer Motion variants mapping TUX reactions
  const bodyVariants = {
    idle: { y: 0 },
    bounce: { y: [0, -6, 0], transition: { duration: 0.4, ease: 'easeOut' } },
    nod: { y: [0, 2, 0], transition: { duration: 0.3 } },
    wave: { y: [0, -2, 0, -2, 0], transition: { duration: 1 } },
    lookLeft: { y: 0 }
  };

  const headVariants = {
    idle: { rotate: 0, y: 0 },
    lookLeft: { rotate: -3, y: 0 },
    nod: { y: [0, 5, 0], rotate: 0, transition: { duration: 0.4, repeat: 1 } },
    tilt: { rotate: -14, y: 2, transition: { duration: 0.5, ease: 'easeInOut' } },
    smile: { y: -2, rotate: [0, 3, -3, 0], transition: { duration: 0.6 } },
    wave: { rotate: [0, 4, 0, 4, 0], transition: { duration: 1.2 } }
  };

  const leftWingVariants = {
    idle: { rotate: 0 },
    lookLeft: { rotate: 8 },
    nod: { rotate: 4 },
    tilt: { rotate: -4 },
    smile: { rotate: 5 },
    wave: { rotate: 0 }
  };

  const rightWingVariants = {
    idle: { rotate: 0 },
    lookLeft: { rotate: -5 },
    smallWave: { rotate: [0, -25, -10, -25, 0], transition: { duration: 0.8, ease: 'easeInOut' } },
    wave: { rotate: [0, -75, -35, -75, -35, -75, 0], transition: { duration: 1.5, ease: 'easeInOut' } },
    tilt: { rotate: 10 },
    smile: { rotate: -8 }
  };

  const pupilVariants = {
    idle: { x: 0, y: 0 },
    lookLeft: { x: -3, y: 1 },
    tilt: { x: -2, y: 0 },
    smile: { x: 0, y: -1 },
    wave: { x: 0, y: 0 }
  };

  return (
    <div className="tux-companion-container" style={{ textAlign: 'center', width: '100%' }}>
      {/* Dynamic Animated Vector SVG Mascot */}
      <div 
        className="tux-mascot-wrapper" 
        style={{ 
          margin: '0 auto 1.5rem auto', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
      >
        <svg 
          viewBox="0 0 200 200" 
          style={{ width: '100%', height: '100%', maxWidth: '100%' }}
          role="img" 
          aria-label="Linux Penguin Mascot Companion"
        >
          {/* Entire TUX container */}
          <motion.g
            variants={bodyVariants}
            animate={localReaction}
            style={{ transformOrigin: '100px 170px' }}
          >
            {/* Ground shadow drop */}
            <ellipse cx="100" cy="182" rx="55" ry="9" fill="rgba(0, 0, 0, 0.25)" />

            {/* Left foot flipper */}
            <path d="M 52,171 C 42,171 32,176 37,183 C 42,191 70,186 75,179 Z" fill="#FFA726" />
            
            {/* Right foot flipper */}
            <path d="M 148,171 C 158,171 168,176 163,183 C 158,191 130,186 125,179 Z" fill="#FFA726" />

            {/* Primary black torso -> updated to high-contrast slate charcoal */}
            <ellipse cx="100" cy="116" rx="52" ry="56" fill="#383C4A" stroke="#5A5D6E" strokeWidth="1.5" />

            {/* White belly panel */}
            <ellipse cx="100" cy="125" rx="36" ry="42" fill="#FFFFFF" />

            {/* Left black wing arm */}
            <motion.path
              variants={leftWingVariants}
              animate={localReaction}
              d="M 50,98 C 40,108 34,126 38,140 C 41,150 47,146 49,136 C 51,126 53,108 50,98 Z"
              fill="#383C4A"
              stroke="#5A5D6E"
              strokeWidth="1.5"
              style={{ transformOrigin: '50px 98px' }}
            />

            {/* Right black wing arm (Waver) */}
            <motion.path
              variants={rightWingVariants}
              animate={localReaction}
              d="M 150,98 C 160,108 166,126 162,140 C 159,150 153,146 151,136 C 149,126 147,108 150,98 Z"
              fill="#383C4A"
              stroke="#5A5D6E"
              strokeWidth="1.5"
              style={{ transformOrigin: '150px 98px' }}
            />

            {/* Head group container */}
            <motion.g
              variants={headVariants}
              animate={localReaction}
              style={{ transformOrigin: '100px 75px' }}
            >
              {/* Black head base */}
              <ellipse cx="100" cy="71" rx="39" ry="35" fill="#383C4A" stroke="#5A5D6E" strokeWidth="1.5" />

              {/* Left Eye background */}
              <ellipse cx="86" cy="66" rx="10" ry="13" fill="#FFFFFF" />
              {/* Right Eye background */}
              <ellipse cx="114" cy="66" rx="10" ry="13" fill="#FFFFFF" />

              {/* Eye Pupils looking left/right */}
              <motion.g
                variants={pupilVariants}
                animate={localReaction}
              >
                <circle cx="88" cy="66" r="4.5" fill="#0D0E11" />
                <circle cx="112" cy="66" r="4.5" fill="#0D0E11" />
                
                {/* Glossy eye highlights */}
                <circle cx="90" cy="64" r="1.5" fill="#FFFFFF" />
                <circle cx="114" cy="64" r="1.5" fill="#FFFFFF" />
              </motion.g>

              {/* Blinking Eyelid overlays */}
              <motion.ellipse
                cx="86"
                cy="58"
                rx="10.5"
                ry="11"
                fill="#383C4A"
                animate={{ scaleY: isBlinking ? 1 : 0 }}
                style={{ transformOrigin: '86px 52px' }}
              />
              <motion.ellipse
                cx="114"
                cy="58"
                rx="10.5"
                ry="11"
                fill="#383C4A"
                animate={{ scaleY: isBlinking ? 1 : 0 }}
                style={{ transformOrigin: '114px 52px' }}
              />

              {/* Orange Beak */}
              <path d="M 87,74 Q 100,68 113,74 Q 100,88 87,74 Z" fill="#FF9800" />
            </motion.g>
          </motion.g>
        </svg>
      </div>

      {/* Title & Description metadata */}
      <h3 
        className="tux-title" 
        style={{ 
          fontSize: '1.25rem', 
          fontWeight: 'bold', 
          color: 'var(--text-primary)',
          letterSpacing: '0.05em',
          marginBottom: '0.25rem',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-headings)'
        }}
      >
        TUX
      </h3>
      <span 
        className="tux-subtitle" 
        style={{ 
          fontSize: '0.75rem', 
          color: 'var(--color-accent)', 
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: '1.25rem',
          fontFamily: 'var(--font-body)'
        }}
      >
        Aditya's Tech Friend
      </span>

      <p 
        className="tux-message" 
        style={{ 
          fontSize: '0.9rem', 
          color: 'var(--text-muted)', 
          lineHeight: '1.6', 
          maxWidth: '240px', 
          margin: '0 auto',
          fontFamily: 'var(--font-body)'
        }}
      >
        Meet TUX.<br />
        He's making sure everything is ready before introducing you to Aditya Kulkarni.
      </p>
    </div>
  );
};

export default TuxCompanion;
