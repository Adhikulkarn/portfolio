export const breathingVariants = {
  idle: {
    scaleY: [1, 1.03, 1],
    transition: {
      duration: 2.2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  falling: { scaleY: 1 }
};

export const wingIdleVariants = {
  idle: { rotate: 0 },
  scratch: {
    rotate: [0, -95, -115, -95, -115, 0],
    transition: { duration: 1.6, ease: "easeInOut" }
  },
  wave: {
    rotate: [0, -80, -40, -80, -40, 0],
    transition: { duration: 1.3, ease: "easeInOut" }
  }
};

export const headIdleVariants = {
  idle: { rotate: 0 },
  scratch: {
    rotate: [0, 7, 3, 7, 0],
    transition: { duration: 1.6 }
  },
  lookLeft: {
    rotate: -8,
    transition: { duration: 0.4 }
  },
  lookRight: {
    rotate: 8,
    transition: { duration: 0.4 }
  }
};
