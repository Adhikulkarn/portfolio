import React from 'react';
import { motion } from 'framer-motion';

const HighlightCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="highlight-card glass-panel"
      role="article"
      aria-label={`${title} highlight card`}
    >
      <div className="highlight-card-icon-container">
        <Icon size={20} className="highlight-card-icon" />
      </div>
      <h4 className="highlight-card-title">{title}</h4>
      <p className="highlight-card-description">{description}</p>
    </motion.div>
  );
};

export default HighlightCard;
