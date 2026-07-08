import React from 'react';

const Container = ({ children, className = '', size = 'default', ...props }) => {
  return (
    <div className={`container container-${size} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Container;
