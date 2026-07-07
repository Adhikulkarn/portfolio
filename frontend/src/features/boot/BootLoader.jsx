import React, { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useBootLoader } from './useBootLoader';
import BootSequence from './BootSequence';

const SESSION_STORAGE_KEY = 'portfolio_boot_completed';

const BootLoader = ({ children }) => {
  const [shouldShowBoot, setShouldShowBoot] = useState(() => {
    if (typeof window === 'undefined') return false;
    // Skip if session storage flag exists
    return window.sessionStorage.getItem(SESSION_STORAGE_KEY) !== 'true';
  });

  const handleFinish = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
      window.dispatchEvent(new Event('portfolio_boot_finished'));
    }
    setShouldShowBoot(false);
  }, []);

  const {
    logs,
    stage,
    setStage,
    tuxReaction,
    scrollRef,
  } = useBootLoader(handleFinish);

  const bootTyped = stage !== 'BOOT_TYPING';
  const isFadingOut = stage === 'FADE_OUT' || stage === 'COMPLETE';
  const showContent = !shouldShowBoot || isFadingOut;

  if (!shouldShowBoot) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Overlay is wrapped in AnimatePresence at the parent level to run exit animations */}
      <AnimatePresence>
        {!isFadingOut && (
          <BootSequence
            logs={logs}
            bootTyped={bootTyped}
            setStage={setStage}
            scrollRef={scrollRef}
            tuxReaction={tuxReaction}
            isFadingOut={isFadingOut}
          />
        )}
      </AnimatePresence>

      {/* Render children in background. Visible during fade-out to support overlays */}
      <div
        style={{
          visibility: showContent ? 'visible' : 'hidden',
          height: showContent ? 'auto' : 0,
          overflow: showContent ? 'hidden' : 'visible'
        }}
      >
        {children}
      </div>
    </>
  );
};

export default BootLoader;
