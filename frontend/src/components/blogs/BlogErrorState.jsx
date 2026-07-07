import React from 'react';
import Button from '../ui/Button';

const BlogErrorState = ({ onRetry }) => {
  return (
    <div className="blog-error-state glass-panel" role="alert">
      <div className="error-icon-wrapper">
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h3 className="error-title">Unable to load articles</h3>
      <p className="error-message">A connection error occurred while retrieving writing entries. Please check your network and try again.</p>
      <Button variant="outline" onClick={onRetry} className="error-retry-btn">
        Retry Loading
      </Button>
    </div>
  );
};

export default BlogErrorState;
