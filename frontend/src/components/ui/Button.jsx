import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  onClick,
  variant = 'primary', // 'primary' | 'secondary' | 'outline'
  className = '',
  href,
  download,
  ...props
}) => {
  const buttonClass = `btn btn-${variant} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.02, y: -1 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 15 }
  };

  if (href) {
    return (
      <motion.a
        href={href}
        download={download}
        target={download ? undefined : "_blank"}
        rel={download ? undefined : "noopener noreferrer"}
        className={buttonClass}
        {...motionProps}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={buttonClass}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
