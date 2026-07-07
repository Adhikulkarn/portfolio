import React from 'react';

const Badge = ({ children, className = '', ...props }) => {
  return (
    <span className={`badge ${className}`} {...props}>
      <span className="badge-dot" />
      {children}
    </span>
  );
};

export default Badge;
