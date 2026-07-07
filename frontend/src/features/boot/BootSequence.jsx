import React from 'react';
import { motion } from 'framer-motion';
import BootScreen from './BootScreen';
import { overlayVariants } from './BootAnimations';

const BootSequence = ({
  logs,
  bootTyped,
  setStage,
  scrollRef,
  tuxReaction,
  isFadingOut,
}) => {
  return (
    <motion.div
      variants={overlayVariants}
      initial="initial"
      exit="exit"
      className="boot-sequence-overlay"
    >
      <BootScreen
        logs={logs}
        bootTyped={bootTyped}
        onBootTypedComplete={() => setStage('BOOT_SEQUENCE')}
        scrollRef={scrollRef}
        tuxReaction={tuxReaction}
        isFadingOut={isFadingOut}
      />
    </motion.div>
  );
};

export default BootSequence;
