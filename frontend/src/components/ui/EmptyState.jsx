import React from 'react';

const EmptyState = ({
  title = 'No records found',
  message = 'There is nothing to display right now.',
  icon,
  className = '',
}) => {
  return (
    <div className={`empty-state glass-panel ${className}`} role="status" style={{ maxWidth: '500px', margin: '3rem auto' }}>
      <div className="empty-icon-wrapper" style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
        {icon || (
          <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        )}
      </div>
      <h3 className="empty-title" style={{ marginBottom: '0.5rem' }}>{title}</h3>
      <p className="empty-message" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
        {message}
      </p>
    </div>
  );
};

export default EmptyState;
