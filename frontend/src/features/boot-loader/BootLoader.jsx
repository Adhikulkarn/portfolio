import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBootLoader } from './useBootLoader';
import BootTerminal from './BootTerminal';
import { overlayVariants } from './bootAnimations';

const SESSION_STORAGE_KEY = 'portfolio_boot_completed';

const BootLoader = ({ children }) => {
  const [shouldShowBoot, setShouldShowBoot] = useState(() => {
    if (typeof window === 'undefined') return false;
    // Skip completely if session marker exists
    return window.sessionStorage.getItem(SESSION_STORAGE_KEY) !== 'true';
  });

  // Memoize handleFinish to guarantee it has a stable identity across parent updates
  const handleFinish = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
    }
    setShouldShowBoot(false);
  }, []);

  const {
    logs,
    stage,
    setStage,
    scrollRef,
  } = useBootLoader(handleFinish);

  // Compute presentation flags for BootTerminal based on state machine stages
  const bootTyped = stage !== 'BOOT_TYPING';
  const isFadingOut = stage === 'FADE_OUT' || stage === 'COMPLETE';

  if (!shouldShowBoot) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          variants={overlayVariants}
          initial="initial"
          exit="exit"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#07080B',
            zIndex: 9999, // overlay all navbars, progress headers, and content grids
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
        >
          <BootTerminal
            logs={logs}
            bootTyped={bootTyped}
            onBootTypedComplete={() => setStage('BOOT_SEQUENCE')}
            scrollRef={scrollRef}
            isFadingOut={isFadingOut}
          />
        </motion.div>
      )}
      {/* Cinematic fade-in of children begins overlay fadeout */}
      {isFadingOut && <>{children}</>}
    </AnimatePresence>
  );
};

export default BootLoader;
