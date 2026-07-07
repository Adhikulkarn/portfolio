import React from 'react';
import Button from './Button';

const ErrorState = ({
  title = 'Unable to load content',
  message = 'A connection error occurred. Please check your network and try again.',
  onRetry,
  className = '',
}) => {
  return (
    <div className={`error-state glass-panel ${className}`} role="alert" style={{ maxWidth: '500px', margin: '3rem auto' }}>
      <div className="error-icon-wrapper" style={{ color: '#FF5F56', marginBottom: '1.25rem' }}>
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h3 className="error-title" style={{ marginBottom: '0.5rem' }}>{title}</h3>
      <p className="error-message" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
        {message}
      </p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="error-retry-btn">
          Retry Loading
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
