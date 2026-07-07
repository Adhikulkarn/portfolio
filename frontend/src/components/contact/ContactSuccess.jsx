import React from 'react';
import Button from '../ui/Button';

const ContactSuccess = ({ onReset }) => {
  return (
    <div className="contact-success-container glass-panel" role="status">
      <div className="success-icon-wrapper">
        <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="#27C93F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>
      <h3 className="success-title">Message Sent!</h3>
      <p className="success-message">Thank you! Your message has been sent successfully.</p>
      <Button variant="outline" onClick={onReset} className="success-reset-btn">
        Send Another Message
      </Button>
    </div>
  );
};

export default ContactSuccess;
