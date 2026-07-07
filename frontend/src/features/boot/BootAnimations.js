export const overlayVariants = {
  initial: { opacity: 1 },
  exit: { 
    opacity: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

export const terminalVariants = {
  initial: { opacity: 0, scale: 0.96, y: 15 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  },
  exit: { 
    opacity: 0, 
    scale: 0.92, 
    y: -20,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

export const tuxVariants = {
  initial: { opacity: 0, x: 25 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};
