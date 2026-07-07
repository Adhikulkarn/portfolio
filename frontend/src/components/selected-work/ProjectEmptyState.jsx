import React from 'react';

const ProjectEmptyState = () => {
  return (
    <div className="project-empty-state glass-panel" role="status">
      <div className="empty-icon-wrapper">
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="empty-svg">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="9" y1="9" x2="15" y2="9" />
          <line x1="9" y1="13" x2="15" y2="13" />
          <line x1="9" y1="17" x2="13" y2="17" />
        </svg>
      </div>
      <h3 className="empty-title">Nothing Published</h3>
      <p className="empty-message">No projects have been published yet.</p>
    </div>
  );
};

export default ProjectEmptyState;
