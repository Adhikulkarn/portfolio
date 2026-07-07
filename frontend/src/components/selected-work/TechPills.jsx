import React from 'react';

const TechPills = ({ techStack }) => {
  if (!techStack) return null;

  const pills = techStack
    .split(',')
    .map((tech) => tech.trim())
    .filter((tech) => tech.length > 0);

  return (
    <div className="tech-pills-container">
      {pills.map((tech) => (
        <span key={tech} className="tech-pill">
          {tech}
        </span>
      ))}
    </div>
  );
};

export default TechPills;
