import React from 'react';

const BlogEmptyState = () => {
  return (
    <div className="blog-empty-state glass-panel" role="status">
      <div className="empty-icon-wrapper">
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      </div>
      <h3 className="empty-title">No Writing</h3>
      <p className="empty-message">No articles published yet.</p>
    </div>
  );
};

export default BlogEmptyState;
