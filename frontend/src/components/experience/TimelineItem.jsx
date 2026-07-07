import React from 'react';
import { motion } from 'framer-motion';

const TimelineItem = ({ item, index }) => {
  const isLeft = index % 2 === 0;

  const itemVariants = {
    hidden: { opacity: 0, x: isLeft ? -30 : 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className={`timeline-item-wrapper ${isLeft ? 'wrapper-left' : 'wrapper-right'}`}>
      {/* Timeline Bullet Indicator */}
      <div className="timeline-bullet-indicator" />

      {/* Card Content wrapper */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        whileHover={{ y: -4 }}
        className="experience-card glass-panel"
        role="article"
        aria-label={`${item.role} at ${item.organization}`}
      >
        <div className="experience-card-header">
          {item.logo_url && (
            <img
              src={item.logo_url}
              alt={`${item.organization} logo`}
              className="experience-logo"
              loading="lazy"
            />
          )}
          <div className="experience-header-details">
            <h3 className="experience-role">{item.role}</h3>
            <span className="experience-org">{item.organization}</span>
          </div>
        </div>

        <span className="experience-duration">{item.duration}</span>
        
        <p className="experience-description">{item.description}</p>
      </motion.div>
    </div>
  );
};

export default TimelineItem;
