import React from 'react';

const ExperienceSkeleton = () => {
  return (
    <div className="experience-skeletons" aria-hidden="true">
      <div className="skeleton-timeline-line" />
      {[1, 2].map((i) => (
        <div key={i} className={`skeleton-timeline-item-wrapper ${i % 2 === 0 ? 'alt' : ''}`}>
          <div className="skeleton-timeline-bullet pulse" />
          <div className="skeleton-timeline-card glass-panel">
            <div className="skeleton-timeline-header">
              <div className="skeleton-timeline-logo pulse" />
              <div className="skeleton-timeline-info">
                <div className="skeleton-timeline-title pulse" />
                <div className="skeleton-timeline-org pulse" />
              </div>
            </div>
            <div className="skeleton-timeline-duration pulse" />
            <div className="skeleton-timeline-desc pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceSkeleton;
