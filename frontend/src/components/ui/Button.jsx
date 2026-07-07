import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MotionLink = motion.create(Link);

const Button = ({
  children,
  onClick,
  variant = 'primary', // 'primary' | 'secondary' | 'outline'
  className = '',
  href,
  download,
  target,
  rel,
  ...props
}) => {
  const buttonClass = `btn btn-${variant} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.02, y: -1 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 15 }
  };

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');

    if (isExternal) {
      return (
        <motion.a
          href={href}
          download={download}
          target={target || (download ? undefined : "_blank")}
          rel={rel || (download ? undefined : "noopener noreferrer")}
          className={buttonClass}
          {...motionProps}
          {...props}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <MotionLink
        to={href}
        className={buttonClass}
        {...motionProps}
        {...props}
      >
        {children}
      </MotionLink>
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
