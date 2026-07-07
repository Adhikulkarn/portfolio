import React from 'react';

const Section = ({ children, className = '', id = '', ...props }) => {
  return (
    <section id={id} className={`section ${className}`} {...props}>
      {children}
    </section>
  );
};

export default Section;
