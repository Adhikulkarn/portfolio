import React from 'react';

const ProjectSkeleton = () => {
  return (
    <div className="project-skeletons" aria-hidden="true">
      {[1, 2].map((i) => (
        <div key={i} className={`skeleton-showcase ${i % 2 === 0 ? 'alt' : ''}`}>
          <div className="skeleton-image pulse" />
          <div className="skeleton-content">
            <div className="skeleton-meta pulse" />
            <div className="skeleton-title pulse" />
            <div className="skeleton-description pulse" />
            <div className="skeleton-pills">
              <div className="skeleton-pill pulse" />
              <div className="skeleton-pill pulse" />
              <div className="skeleton-pill pulse" />
            </div>
            <div className="skeleton-buttons">
              <div className="skeleton-btn pulse" />
              <div className="skeleton-btn pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectSkeleton;
