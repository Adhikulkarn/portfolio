import React from 'react';
import { motion } from 'framer-motion';
import SkillChip from './SkillChip';

const SkillCategory = ({ title, skills }) => {
  if (!skills || skills.length === 0) return null;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="skill-category-column">
      <h3 className="skill-category-title">{title}</h3>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="skill-chips-container"
        role="list"
        aria-label={`${title} skills`}
      >
        {skills.map((skill) => (
          <motion.div key={skill.id || skill.name} variants={itemVariants} style={{ display: 'inline-block' }}>
            <SkillChip name={skill.name} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SkillCategory;
