import React from 'react';

const SectionHeading = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`section-header ${className}`}>
      {subtitle && <span className="section-subtitle">{subtitle}</span>}
      <h2 className="section-title">{title}</h2>
    </div>
  );
};

export default SectionHeading;
