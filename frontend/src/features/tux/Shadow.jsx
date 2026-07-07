import React from 'react';
import { motion } from 'framer-motion';

const Shadow = ({ scale = 1 }) => {
  return (
    <motion.div
      animate={{
        scaleX: scale,
        scaleY: Math.max(0.3, scale * 0.7),
        opacity: Math.max(0.1, 0.45 * scale)
      }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      style={{
        width: '36px',
        height: '7px',
        background: 'rgba(0, 0, 0, 0.55)',
        borderRadius: '50%',
        filter: 'blur(2.5px)',
        margin: '4px auto 0 auto',
        pointerEvents: 'none'
      }}
    />
  );
};

export default Shadow;
