import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusDetails = (statusStr = '') => {
    const s = statusStr.toLowerCase();
    switch (s) {
      case 'completed':
        return { label: 'Completed', color: '#27C93F' };
      case 'ongoing':
        return { label: 'Ongoing', color: '#F4B942' };
      case 'archived':
        return { label: 'Archived', color: '#AFAFAF' };
      default:
        return { label: statusStr || 'Unknown', color: '#AFAFAF' };
    }
  };

  const { label, color } = getStatusDetails(status);

  return (
    <span 
      className="status-badge" 
      style={{ 
        borderColor: `${color}25`, 
        backgroundColor: `${color}06`,
        color: color
      }}
      role="status"
    >
      <span className="status-dot" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
};

export default StatusBadge;
