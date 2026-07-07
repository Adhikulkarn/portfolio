import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollSections } from './useScrollSections';
import { useTuxPhysics } from './useTuxPhysics';
import Shadow from './Shadow';
import DustParticles from './DustParticles';
import { landingVariants } from './LandingAnimation';
import { breathingVariants, wingIdleVariants, headIdleVariants } from './IdleAnimations';

// Scripted section speech bubbles pool
const sectionMessages = {
  home: "👋 Hey! I'm TUX.\nThis is Aditya.\nHe turns coffee into code...\nmost of the time.",
  'what-i-build': "This is where ideas become real projects.\nSometimes after many cups of coffee.",
  projects: "Here are some of Aditya's favorite projects.\nGo ahead...\nI already clicked all of them.",
  experience: "Somehow...\nPeople trusted him to manage projects.\nEverything turned out fine.\nI'm still impressed.",
  blogs: "He writes blogs so Future Aditya\ndoesn't forget what Present Aditya built.\nA surprisingly good strategy.",
  skills: "Here's the tech stack Aditya uses\nto build high-performance products.\nHe's quite picky.",
  philosophy: "Aditya believes code should be\nsimple, clean, and fast.\nI couldn't agree more.",
  contact: "You've reached the end!\nIf you liked what you saw,\ngo say hello.\nHe actually replies."
};

const TuxCompanion = () => {
  const { activeSection, isScrolling } = useScrollSections();
  
  const [clicks, setClicks] = useState(0);
  const [showNeofetch, setShowNeofetch] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [subIdle, setSubIdle] = useState('idle');
  const [isBlinking, setIsBlinking] = useState(false);

  // Speech bubble states
  const [bubbleText, setBubbleText] = useState(null);
  const [showBubble, setShowBubble] = useState(false);
  
  const idleTimer = useRef(null);
  const blinkTimer = useRef(null);
  const dismissTimer = useRef(null);
  const speechDelayTimeout = useRef(null);
  const speechDisplayTimeout = useRef(null);

  // Once-per-section and hover state tracking refs
  const lastSpokenSection = useRef(null);
  const isHoveringBubble = useRef(false);

  // Check if the boot screen overlay is currently active (using state for event synchronization)
  const [isBootActive, setIsBootActive] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.sessionStorage.getItem('portfolio_boot_completed') !== 'true';
  });

  // Listen to custom boot finish event to update state
  useEffect(() => {
    const handleBootFinished = () => {
      setIsBootActive(false);
    };
    window.addEventListener('portfolio_boot_finished', handleBootFinished);
    return () => {
      window.removeEventListener('portfolio_boot_finished', handleBootFinished);
    };
  }, []);

  // Landing Complete Callback to trigger speech bubble
  const onLandingComplete = useCallback((sectionId) => {
    if (isBootActive) return;

    // Prevent showing again if we've already spoken on this section landing
    if (lastSpokenSection.current === sectionId) return;

    // Clear any pending timers
    if (speechDelayTimeout.current) clearTimeout(speechDelayTimeout.current);
    if (speechDisplayTimeout.current) clearTimeout(speechDisplayTimeout.current);

    // Wait 700ms before displaying speech bubble
    speechDelayTimeout.current = setTimeout(() => {
      const text = sectionMessages[sectionId];
      if (text) {
        lastSpokenSection.current = sectionId;
        setBubbleText(text);
        setShowBubble(true);

        // Auto close in 4.5 seconds (within the 4-5s checklist spec) unless cursor is hovering
        speechDisplayTimeout.current = setTimeout(() => {
          if (isHoveringBubble.current) {
            // Stay open while hovered; close triggers later on MouseLeave
            return;
          }
          setShowBubble(false);
          setBubbleText(null);
        }, 4500);
      }
    }, 700);
  }, [isBootActive]);

  const {
    tuxState,
    rotation,
    shadowScale,
    dustTrigger,
    triggerHonk
  } = useTuxPhysics(activeSection, isScrolling, onLandingComplete);

  // Initial trigger for welcome bubble on load/boot finish
  useEffect(() => {
    if (isBootActive) return;
    if (tuxState === 'idle' || tuxState === 'sitting') {
      onLandingComplete(activeSection);
    }
  }, [isBootActive, tuxState, activeSection, onLandingComplete]);

  // Handle immediate dismissals when TUX is falling or user is actively scrolling
  useEffect(() => {
    if (tuxState === 'falling') {
      setShowBubble(false);
      setBubbleText(null);
      isHoveringBubble.current = false;
      if (speechDelayTimeout.current) clearTimeout(speechDelayTimeout.current);
      if (speechDisplayTimeout.current) clearTimeout(speechDisplayTimeout.current);
    }
  }, [tuxState]);

  // Check prefers-reduced-motion
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Manage random sub-idle behavior cycles when TUX is idle and NOT speaking
  useEffect(() => {
    if (tuxState !== 'idle' && tuxState !== 'sitting') {
      setSubIdle('idle');
      if (idleTimer.current) clearTimeout(idleTimer.current);
      return;
    }

    const runIdleCycle = () => {
      // If TUX is currently speaking, do not override his look direction (he must look at the bubble)
      if (showBubble) return;

      const moods = ['idle', 'idle', 'lookLeft', 'lookRight', 'scratch', 'wave'];
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      
      setSubIdle(randomMood);

      // Trigger standard eye blink during idle transitions
      if (Math.random() > 0.4) {
        setIsBlinking(true);
        blinkTimer.current = setTimeout(() => setIsBlinking(false), 140);
      }

      idleTimer.current = setTimeout(runIdleCycle, 3000 + Math.random() * 3000);
    };

    idleTimer.current = setTimeout(runIdleCycle, 2000);

    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      if (blinkTimer.current) clearTimeout(blinkTimer.current);
    };
  }, [tuxState, showBubble]);

  // Speaking state blinks and gaze controls
  useEffect(() => {
    if (!showBubble) return;

    // Force TUX to look left toward the speech bubble
    setSubIdle('lookLeft');

    let active = true;
    const runSpeakingBlinks = async () => {
      while (active) {
        // Sleep between eye blinks while talking
        await new Promise((r) => setTimeout(r, 600 + Math.random() * 800));
        if (!active) return;
        setIsBlinking(true);
        await new Promise((r) => setTimeout(r, 100));
        if (!active) return;
        setIsBlinking(false);
      }
    };

    runSpeakingBlinks();

    return () => {
      active = false;
    };
  }, [showBubble]);

  // Dismiss speech bubble when manual close button is clicked
  const handleDismissBubbleClick = (e) => {
    if (e) e.stopPropagation();
    setShowBubble(false);
    setBubbleText(null);
    isHoveringBubble.current = false;
    if (speechDelayTimeout.current) clearTimeout(speechDelayTimeout.current);
    if (speechDisplayTimeout.current) clearTimeout(speechDisplayTimeout.current);
  };

  // Close immediately if cursor leaves speech bubble bounding box
  const handleMouseLeaveBubble = () => {
    isHoveringBubble.current = false;
    setShowBubble(false);
    setBubbleText(null);
    if (speechDisplayTimeout.current) clearTimeout(speechDisplayTimeout.current);
  };

  // Handle clicking TUX mascot
  const handleClick = () => {
    if (tuxState === 'falling') return;
    
    triggerHonk();

    const newClicks = clicks + 1;
    if (newClicks >= 5) {
      setClicks(0);
      setShowNeofetch(true);
      
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
      dismissTimer.current = setTimeout(() => {
        setShowNeofetch(false);
      }, 7000);
    } else {
      setClicks(newClicks);
    }
  };

  // Close neofetch panel
  const handleCloseNeofetch = (e) => {
    e.stopPropagation();
    setShowNeofetch(false);
  };

  // Cleanup dismiss timers
  useEffect(() => {
    return () => {
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    };
  }, []);

  const isFalling = tuxState === 'falling';
  const isSitting = tuxState === 'sitting';
  const isHonking = tuxState === 'honk';

  const activeAnimation = isFalling 
    ? 'falling' 
    : isSitting 
      ? 'sitting' 
      : isHonking 
        ? 'honk' 
        : tuxState === 'landing' 
          ? 'landing' 
          : 'idle';

  return (
    <div 
      className="tux-scroll-companion"
      style={{
        position: 'fixed',
        right: '1.25rem',
        bottom: '4.5rem',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: isFalling ? 'default' : 'pointer',
        pointerEvents: 'auto'
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip text when hovered */}
      <AnimatePresence>
        {isHovered && !showNeofetch && !isFalling && !showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: -8, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="tux-tooltip"
            style={{
              position: 'absolute',
              top: '-32px',
              background: 'rgba(22, 23, 29, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '0.25rem 0.5rem',
              borderRadius: '6px',
              color: '#FFFFFF',
              fontSize: '0.68rem',
              fontFamily: 'monospace',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              pointerEvents: 'none'
            }}
          >
            Hi! I'm TUX 👋
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Retro Neofetch Terminal Popup */}
      <AnimatePresence>
        {showNeofetch && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 20, y: -40 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: -40 }}
            exit={{ opacity: 0, scale: 0.9, x: 10, y: -30 }}
            style={{
              position: 'absolute',
              bottom: '100%',
              right: '0',
              background: '#0D0E11',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.6)',
              borderRadius: '8px',
              padding: '0.8rem 1rem',
              width: '210px',
              fontFamily: "monospace",
              fontSize: '0.68rem',
              lineHeight: '1.45',
              color: '#CCCCCC',
              zIndex: 10000
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.3rem', marginBottom: '0.4rem' }}>
              <span style={{ color: '#00E5FF', fontWeight: 'bold' }}>tux@neofetch</span>
              <button 
                onClick={handleCloseNeofetch}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#8E9AA8', 
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  padding: 0
                }}
              >
                ×
              </button>
            </div>
            <div>
              <span style={{ color: '#4AF626' }}>$ neofetch</span><br />
              <span style={{ color: '#00E5FF' }}>OS:</span> Arch Linux<br />
              <span style={{ color: '#00E5FF' }}>Developer:</span> Aditya Kulkarni<br />
              <span style={{ color: '#00E5FF' }}>Status:</span> Building cool things...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Glassmorphic Speech Bubble */}
      <AnimatePresence>
        {showBubble && bubbleText && !isFalling && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 15 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 0,
              transition: {
                type: 'spring',
                stiffness: 260,
                damping: 20
              }
            }}
            exit={{ opacity: 0, scale: 0.8, x: 10 }}
            className="tux-speech-bubble"
            onMouseEnter={() => { isHoveringBubble.current = true; }}
            onMouseLeave={handleMouseLeaveBubble}
            style={{
              display: 'flex',
              flexDirection: 'column',
              pointerEvents: 'auto' // allow mouse interactions
            }}
          >
            <div style={{ whiteSpace: 'pre-line' }}>{bubbleText}</div>
            <button
              onClick={handleDismissBubbleClick}
              className="tux-bubble-btn"
              style={{
                marginTop: '0.6rem',
                alignSelf: 'flex-end',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '6px',
                color: '#FFFFFF',
                fontSize: '0.68rem',
                fontWeight: 'bold',
                padding: '0.2rem 0.6rem',
                cursor: 'pointer',
                fontFamily: 'monospace',
                transition: 'all 0.2s ease',
                display: 'inline-block'
              }}
            >
              Ok Tux
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Mascot Vector SVG Wrapper */}
      <motion.div
        variants={prefersReducedMotion ? {} : landingVariants}
        animate={activeAnimation}
        style={{
          width: 'var(--tux-size)',
          height: 'var(--tux-size)',
          transformOrigin: 'bottom center',
          rotate: rotation
        }}
      >
        <svg 
          viewBox="0 0 200 200" 
          style={{ width: '100%', height: '100%' }}
        >
          <motion.g
            variants={prefersReducedMotion ? {} : breathingVariants}
            animate={isFalling ? 'falling' : 'idle'}
            style={{ transformOrigin: '100px 170px' }}
          >
            {/* Left foot flipper */}
            <motion.path 
              animate={{ rotate: isSitting ? -18 : 0, y: isSitting ? -2 : 0 }}
              d="M 52,171 C 42,171 32,176 37,183 C 42,191 70,186 75,179 Z" 
              fill="#FF9800" 
            />
            
            {/* Right foot flipper */}
            <motion.path 
              animate={{ rotate: isSitting ? 18 : 0, y: isSitting ? -2 : 0 }}
              d="M 148,171 C 158,171 168,176 163,183 C 158,191 130,186 125,179 Z" 
              fill="#FF9800" 
            />

            {/* Torso */}
            <ellipse cx="100" cy="116" rx="52" ry="56" fill="#383C4A" stroke="#5A5D6E" strokeWidth="1.5" />

            {/* Belly */}
            <ellipse cx="100" cy="125" rx="36" ry="42" fill="#FFFFFF" />

            {/* Left Wing */}
            <motion.path
              variants={prefersReducedMotion ? {} : {
                falling: {
                  rotate: [15, -55, 15],
                  transition: { duration: 0.25, repeat: Infinity, ease: 'easeInOut' }
                },
                idle: { rotate: 0 }
              }}
              animate={isFalling ? 'falling' : 'idle'}
              d="M 50,98 C 40,108 34,126 38,140 C 41,150 47,146 49,136 C 51,126 53,108 50,98 Z"
              fill="#383C4A"
              stroke="#5A5D6E"
              strokeWidth="1.5"
              style={{ transformOrigin: '50px 98px' }}
            />

            {/* Right Wing */}
            <motion.path
              variants={prefersReducedMotion ? {} : (isFalling ? {
                falling: {
                  rotate: [-15, 55, -15],
                  transition: { duration: 0.25, repeat: Infinity, ease: 'easeInOut' }
                }
              } : wingIdleVariants)}
              animate={isFalling ? 'falling' : (isSitting ? 'wave' : subIdle)}
              d="M 150,98 C 160,108 166,126 162,140 C 159,150 153,146 151,136 C 149,126 147,108 150,98 Z"
              fill="#383C4A"
              stroke="#5A5D6E"
              strokeWidth="1.5"
              style={{ transformOrigin: '150px 98px' }}
            />

            {/* Head group */}
            <motion.g
              variants={prefersReducedMotion ? {} : headIdleVariants}
              animate={isFalling ? 'idle' : (isSitting ? 'lookLeft' : subIdle)}
              style={{ transformOrigin: '100px 75px' }}
            >
              <ellipse cx="100" cy="71" rx="39" ry="35" fill="#383C4A" stroke="#5A5D6E" strokeWidth="1.5" />

              {/* Eyes */}
              <ellipse cx="86" cy="66" rx="10" ry="13" fill="#FFFFFF" />
              <ellipse cx="114" cy="66" rx="10" ry="13" fill="#FFFFFF" />

              {/* Pupils */}
              <motion.g
                animate={
                  isSitting || subIdle === 'lookLeft'
                    ? { x: -3.5, y: 1 } 
                    : subIdle === 'lookRight' 
                      ? { x: 3, y: 1 } 
                      : { x: 0, y: 0 }
                }
                transition={{ duration: 0.25 }}
              >
                <circle cx="88" cy="66" r="4.5" fill="#0D0E11" />
                <circle cx="112" cy="66" r="4.5" fill="#0D0E11" />
                <circle cx="90" cy="64" r="1.5" fill="#FFFFFF" />
                <circle cx="114" cy="64" r="1.5" fill="#FFFFFF" />
              </motion.g>

              {/* Eyelids */}
              <motion.ellipse
                cx="86"
                cy="58"
                rx="10.5"
                ry="11"
                fill="#383C4A"
                animate={{ scaleY: isBlinking ? 1 : 0 }}
                transition={{ duration: 0.08 }}
                style={{ transformOrigin: '86px 52px' }}
              />
              <motion.ellipse
                cx="114"
                cy="58"
                rx="10.5"
                ry="11"
                fill="#383C4A"
                animate={{ scaleY: isBlinking ? 1 : 0 }}
                transition={{ duration: 0.08 }}
                style={{ transformOrigin: '114px 52px' }}
              />

              {/* Beak */}
              <path d="M 87,74 Q 100,68 113,74 Q 100,88 87,74 Z" fill="#FF9800" />
            </motion.g>
          </motion.g>
        </svg>
      </motion.div>

      {/* Drop shadow */}
      {!prefersReducedMotion && <Shadow scale={shadowScale} />}

      {/* Landing particles */}
      {!prefersReducedMotion && <DustParticles trigger={dustTrigger} />}
    </div>
  );
};

export default TuxCompanion;
