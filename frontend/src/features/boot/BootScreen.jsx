import React from 'react';
import { motion } from 'framer-motion';
import BootTerminal from './BootTerminal';
import TuxCompanion from './TuxCompanion';
import { tuxVariants } from './BootAnimations';

const BootScreen = ({
  logs,
  bootTyped,
  onBootTypedComplete,
  scrollRef,
  tuxReaction,
  isFadingOut,
}) => {
  return (
    <div className="boot-screen-overlay">
      <div className="boot-screen-container">
        {/* Left Section: 70% Terminal window */}
        <div className="boot-screen-left">
          <BootTerminal
            logs={logs}
            bootTyped={bootTyped}
            onBootTypedComplete={onBootTypedComplete}
            scrollRef={scrollRef}
            isFadingOut={isFadingOut}
          />
        </div>

        {/* Right Section: 30% Tux Mascot details */}
        <motion.div
          variants={tuxVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="boot-screen-right"
        >
          <TuxCompanion reaction={tuxReaction} />
        </motion.div>
      </div>
    </div>
  );
};

export default BootScreen;
