/**
 * Physics engine calculations for TUX scroll companion
 */

export const calculateFallVelocity = (elapsedTime, maxVelocity = 20) => {
  const gravity = 15; // simulated gravity acceleration
  // v = g * t
  return Math.min(maxVelocity, gravity * (elapsedTime / 1000));
};

export const calculateRotationFactor = (velocity) => {
  // Rotate slightly sideways while falling based on velocity
  return Math.min(18, velocity * 1.8);
};

export const calculateShadowScale = (velocity) => {
  // Shadow shrinks as TUX lifts off section platform during acceleration
  return Math.max(0.45, 1 - (velocity / 25));
};
