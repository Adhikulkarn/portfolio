import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import Container from '../ui/Container';
import ProjectShowcase from './ProjectShowcase';
import ProjectSkeleton from './ProjectSkeleton';
import ProjectErrorState from './ProjectErrorState';
import ProjectEmptyState from './ProjectEmptyState';
import { projectService } from '../../services/projectService';

const SelectedWorkSection = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [projects, setProjects] = useState([]);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await projectService.getProjects();
      
      // Sort: Featured first, then remaining
      const sortedProjects = [...data].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });

      setProjects(sortedProjects);
    } catch (err) {
      console.error('Failed to load projects inside SelectedWorkSection:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <Section id="projects" className="selected-work-section">
      <Container>
        {/* Section Header */}
        <div className="selected-work-header">
          <h2 className="editorial-heading">
            SELECTED <br />
            <span className="accent-gradient">WORK</span>
          </h2>
          <p className="selected-work-intro">
            Some of the software I've designed and built.
          </p>
        </div>

        {/* Dynamic States */}
        <div className="selected-work-content">
          {loading ? (
            <ProjectSkeleton />
          ) : error ? (
            <ProjectErrorState onRetry={fetchProjects} />
          ) : projects.length === 0 ? (
            <ProjectEmptyState />
          ) : (
            <div className="projects-showcase-list">
              {projects.map((project, idx) => (
                <ProjectShowcase 
                  key={project.id || project.slug} 
                  project={project} 
                  index={idx} 
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};

export default SelectedWorkSection;
