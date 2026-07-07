import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import ProjectMetadata from './ProjectMetadata';
import TechPills from './TechPills';
import StatusBadge from './StatusBadge';

const ProjectShowcase = ({ project, index }) => {
  const isImageLeft = index % 2 === 0;

  const contentVariants = {
    hidden: { opacity: 0, x: isImageLeft ? 40 : -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <article className={`project-showcase-row ${isImageLeft ? '' : 'row-reverse'}`}>
      {/* Image Block */}
      <motion.div
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="project-showcase-image-container"
      >
        <a href={`/projects/${project.slug}`} className="project-image-link" aria-label={`View case study for ${project.title}`}>
          <div className="project-image-wrapper">
            <img
              src={project.cover_image}
              alt={`${project.title} screenshot preview`}
              className="project-image"
              loading="lazy"
            />
            <div className="project-image-overlay">
              <span className="view-case-study-label">View Case Study</span>
            </div>
          </div>
        </a>
      </motion.div>

      {/* Content Block */}
      <motion.div
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="project-showcase-content"
      >
        <div className="project-showcase-top">
          <ProjectMetadata project={project} />
          <StatusBadge status={project.status} />
        </div>

        <h3 className="project-showcase-title">{project.title}</h3>
        
        <p className="project-showcase-description">{project.description}</p>
        
        <div className="project-showcase-tech">
          <TechPills techStack={project.tech_stack} />
        </div>

        <div className="project-showcase-buttons">
          <Button variant="primary" href={`/projects/${project.slug}`}>
            View Case Study
          </Button>
          {project.github_url && (
            <Button variant="secondary" href={project.github_url}>
              GitHub
            </Button>
          )}
          {project.live_url && (
            <Button variant="outline" href={project.live_url}>
              Live Demo
            </Button>
          )}
        </div>
      </motion.div>
    </article>
  );
};

export default React.memo(ProjectShowcase);
