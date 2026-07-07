import React from 'react';

const ExperienceEmptyState = () => {
  return (
    <div className="experience-empty-state glass-panel" role="status">
      <div className="empty-icon-wrapper">
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h3 className="empty-title">No Experience</h3>
      <p className="empty-message">No experience entries have been published yet.</p>
    </div>
  );
};

export default ExperienceEmptyState;
