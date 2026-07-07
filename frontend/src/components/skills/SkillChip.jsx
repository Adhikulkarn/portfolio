import React from 'react';
import { motion } from 'framer-motion';

const SkillChip = ({ name }) => {
  return (
    <motion.span
      whileHover={{ 
        scale: 1.03, 
        y: -1,
        borderColor: 'var(--color-accent)',
        color: 'var(--text-primary)',
        boxShadow: '0 5px 15px rgba(244, 185, 66, 0.05)'
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className="skill-chip"
      role="listitem"
    >
      {name}
    </motion.span>
  );
};

export default SkillChip;
