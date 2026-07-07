import React from 'react';
import { deriveCategory } from '../../utils/categoryDerivation';

const ProjectMetadata = ({ project }) => {
  if (!project) return null;

  const year = project.created_at 
    ? new Date(project.created_at).getFullYear() 
    : new Date().getFullYear();
    
  const category = deriveCategory(project);
  const status = (project.status || 'Completed').toUpperCase();

  return (
    <div className="project-metadata-row" aria-label="Project details metadata">
      <span className="metadata-item">{year}</span>
      <span className="metadata-divider" aria-hidden="true">•</span>
      <span className="metadata-item highlight">{category}</span>
      <span className="metadata-divider" aria-hidden="true">•</span>
      <span className="metadata-item">{status}</span>
    </div>
  );
};

export default ProjectMetadata;
