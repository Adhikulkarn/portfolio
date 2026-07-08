import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import ProjectMetadata from './ProjectMetadata';
import TechPills from './TechPills';

const ProjectShowcase = ({ project, index }) => {
  const isImageLeft = index % 2 === 0;
  const ImageLinkComponent = Link;
  const imageLinkProps = {
    to: `/projects/${project.slug}`
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
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
        <ImageLinkComponent 
          {...imageLinkProps}
          className="project-image-link" 
          aria-label={`View project details for ${project.title}`}
        >
          <div className="project-image-wrapper">
            <img
              src={project.cover_image}
              alt={`${project.title} screenshot preview`}
              className="project-image"
              loading="lazy"
            />
            <div className="project-image-overlay">
              <span className="view-case-study-label">
                View Project
              </span>
            </div>
          </div>
        </ImageLinkComponent>
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
        </div>

        <h3 className="project-showcase-title">
          <Link to={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        
        <p className="project-showcase-description">{project.description}</p>
        
        <div className="project-showcase-tech">
          <TechPills techStack={project.tech_stack} />
        </div>

        <div className="project-showcase-buttons">
          <Button variant="primary" href={`/projects/${project.slug}`}>
            View Project
          </Button>
          {project.live_url && (
            <Button variant="outline" href={project.live_url} target="_blank" rel="noopener noreferrer">
              Live Demo
            </Button>
          )}
          {project.github_url && (
            <Button variant="secondary" href={project.github_url} target="_blank" rel="noopener noreferrer">
              GitHub
            </Button>
          )}
        </div>
      </motion.div>
    </article>
  );
};

export default React.memo(ProjectShowcase);
