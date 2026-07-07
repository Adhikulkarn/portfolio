import { useState, useEffect, useRef } from 'react';
import { calculateFallVelocity, calculateRotationFactor, calculateShadowScale } from './PhysicsEngine';

export const useTuxPhysics = (activeSection, isScrolling, onLandingComplete) => {
  const [tuxState, setTuxState] = useState('idle');
  const [rotation, setRotation] = useState(0);
  const [shadowScale, setShadowScale] = useState(1);
  const [dustTrigger, setDustTrigger] = useState(0);
  
  const fallStartTime = useRef(null);
  const physicsFrameId = useRef(null);
  const landingTimeout = useRef(null);

  // Monitor scrolling dynamics
  useEffect(() => {
    if (isScrolling) {
      // Clear pending landing animations if scroll resumes mid-air
      if (landingTimeout.current) {
        clearTimeout(landingTimeout.current);
        landingTimeout.current = null;
      }

      if (tuxState !== 'falling') {
        setTuxState('falling');
        fallStartTime.current = Date.now();
      }

      // Physics loop driven by requestAnimationFrame to guarantee 60fps velocity calculations
      const updatePhysics = () => {
        if (!fallStartTime.current) return;
        const elapsed = Date.now() - fallStartTime.current;
        const velocity = calculateFallVelocity(elapsed);
        
        // Sway slightly based on fall velocity direction
        setRotation(calculateRotationFactor(velocity));
        setShadowScale(calculateShadowScale(velocity));
        
        physicsFrameId.current = requestAnimationFrame(updatePhysics);
      };

      physicsFrameId.current = requestAnimationFrame(updatePhysics);

    } else {
      // Scroll motion halted
      if (physicsFrameId.current) {
        cancelAnimationFrame(physicsFrameId.current);
        physicsFrameId.current = null;
      }

      if (tuxState === 'falling') {
        setTuxState('landing');
        setRotation(0);
        setShadowScale(1);
        setDustTrigger(Date.now()); // Trigger dust puff particles

        // Wait for landing squash/stretch keyframes to settle, then yield to idle/sitting
        landingTimeout.current = setTimeout(() => {
          if (activeSection === 'contact') {
            setTuxState('sitting');
          } else {
            setTuxState('idle');
          }
          if (onLandingComplete) {
            onLandingComplete(activeSection);
          }
        }, 700);
      }
    }

    return () => {
      if (physicsFrameId.current) {
        cancelAnimationFrame(physicsFrameId.current);
      }
    };
  }, [isScrolling, activeSection, tuxState, onLandingComplete]);

  // Sync sitting states with contact section entries
  useEffect(() => {
    if (tuxState === 'falling' || tuxState === 'landing' || tuxState === 'honk') return;

    if (activeSection === 'contact') {
      setTuxState('sitting');
    } else {
      setTuxState('idle');
    }
  }, [activeSection, tuxState]);

  // Click honk override transition
  const triggerHonk = () => {
    if (tuxState === 'falling') return; // prevent honking mid-fall

    setTuxState('honk');
    setRotation(0);
    setShadowScale(1);

    if (landingTimeout.current) {
      clearTimeout(landingTimeout.current);
    }

    landingTimeout.current = setTimeout(() => {
      if (activeSection === 'contact') {
        setTuxState('sitting');
      } else {
        setTuxState('idle');
      }
    }, 600); // match length of honk squash variant
  };

  // Cleanup timeouts on hook unmount
  useEffect(() => {
    return () => {
      if (landingTimeout.current) {
        clearTimeout(landingTimeout.current);
      }
    };
  }, []);

  return {
    tuxState,
    rotation,
    shadowScale,
    dustTrigger,
    triggerHonk
  };
};
