export const landingVariants = {
  falling: {
    scaleY: 1.15,
    scaleX: 0.85,
    y: -25, // lift off platform visually
    transition: { duration: 0.2 }
  },
  landing: {
    scaleY: [1.15, 0.55, 1.25, 0.9, 1],
    scaleX: [0.85, 1.45, 0.75, 1.1, 1],
    y: [0, 0, 0, 0, 0],
    transition: {
      duration: 0.7,
      ease: "easeInOut",
      times: [0, 0.25, 0.5, 0.75, 1]
    }
  },
  sitting: {
    scaleY: 0.8,
    scaleX: 1.15,
    y: 12,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  honk: {
    scaleY: [1, 0.5, 1.5, 0.8, 1.1, 1],
    scaleX: [1, 1.5, 0.5, 1.2, 0.9, 1],
    rotate: [0, -10, 10, -5, 5, 0],
    transition: { duration: 0.6, ease: "easeInOut" }
  }
};
