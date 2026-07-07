import React from 'react';
import { motion } from 'framer-motion';

const BuildCard = ({ icon: Icon, title, description }) => {
  const handleMouseMove = (e) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    currentTarget.style.setProperty('--x', `${x}px`);
    currentTarget.style.setProperty('--y', `${y}px`);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onMouseMove={handleMouseMove}
      className="build-card glass-panel"
      role="article"
      aria-label={`${title} specialty card`}
    >
      <div className="build-card-glow" />
      <div className="build-card-icon-container">
        <Icon size={22} className="build-card-icon" />
      </div>
      <h3 className="build-card-title">{title}</h3>
      <p className="build-card-description">{description}</p>
    </motion.div>
  );
};

export default BuildCard;
