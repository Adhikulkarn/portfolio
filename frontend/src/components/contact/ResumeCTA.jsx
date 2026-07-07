import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import { resumeService } from '../../services/resumeService';

const ResumeCTA = () => {
  const [resumeUrl, setResumeUrl] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const data = await resumeService.getCurrentResume();
        if (data && data.resume_url) {
          setResumeUrl(data.resume_url);
        }
      } catch (err) {
        // Fail silently as the resume download action is optional if no resume is published
        console.log('Active resume not found or endpoint unavailable:', err.message);
      }
    };
    fetchResume();
  }, []);

  if (!resumeUrl) return null;

  return (
    <div className="resume-cta-container">
      <Button variant="outline" href={resumeUrl} download className="resume-cta-btn">
        Download Resume
      </Button>
    </div>
  );
};

export default ResumeCTA;
