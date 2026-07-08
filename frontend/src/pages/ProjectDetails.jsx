import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageTransition from '../components/ui/PageTransition';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import ErrorState from '../components/ui/ErrorState';
import SEO from '../components/common/SEO';
import { projectService } from '../services/projectService';
import TechPills from '../components/selected-work/TechPills';

const ProjectDetails = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchProject = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await projectService.getProjectBySlug(slug);
      setProject(data);
    } catch (err) {
      console.error('Failed to load project details:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  if (loading) {
    return (
      <PageTransition>
        <SEO title="Loading Project..." noIndex={true} />
        <Container>
          <div style={{ padding: '4rem 0' }}>
            <div className="skeleton-meta pulse" style={{ width: '120px', height: '14px', marginBottom: '1.5rem' }} />
            <div className="skeleton-title pulse" style={{ width: '60%', height: '48px', marginBottom: '2.5rem' }} />
            <div className="skeleton-image pulse" style={{ width: '100%', aspectRatio: '16/9', borderRadius: '12px', marginBottom: '4rem' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
              <div className="skeleton-description pulse" style={{ width: '100%', height: '180px' }} />
            </div>
          </div>
        </Container>
      </PageTransition>
    );
  }

  if (error || !project) {
    return (
      <PageTransition>
        <SEO title="Project Not Found" noIndex={true} />
        <Container>
          <div style={{ padding: '6rem 0', textAlign: 'center' }}>
            <ErrorState
              title="Project Not Found"
              message={`The project with slug "${slug}" could not be resolved or does not exist.`}
              onRetry={fetchProject}
            />
            <div style={{ marginTop: '2rem' }}>
              <Button href="/" variant="secondary">
                Back to Home
              </Button>
            </div>
          </div>
        </Container>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <SEO 
        title={`${project.title} | Projects`} 
        description={project.description ? project.description.substring(0, 150) : undefined}
        slug={`projects/${slug}`}
        image={project.cover_image}
      />
      <Container>
        <article className="project-details-page" style={{ padding: '4rem 0' }}>
          {/* Back Nav Link */}
          <div style={{ marginBottom: '2rem' }}>
            <Link to="/" className="nav-link" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              &larr; Back to home
            </Link>
          </div>

          {/* Heading block */}
          <header style={{ marginBottom: '3rem' }}>
            <h1 className="editorial-heading text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
              {project.title}
            </h1>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {project.status && (
                <span>
                  Status: <strong style={{ color: 'var(--color-accent)' }}>{project.status.toUpperCase()}</strong>
                </span>
              )}
              {project.created_at && (
                <span>
                  Published: <strong>{new Date(project.created_at).toLocaleDateString()}</strong>
                </span>
              )}
            </div>
          </header>

          {/* Large Hero Image */}
          {project.cover_image && (
            <div className="project-image-link" style={{ cursor: 'default', marginBottom: '4rem', width: '100%' }}>
              <div className="project-image-wrapper">
                <img
                  src={project.cover_image}
                  alt={`${project.title} featured image`}
                  className="project-image"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          )}

          {/* Main Info Columns */}
          <div className="project-info-grid">
            <div className="project-desc-col">
              <h2 className="section-subtitle" style={{ marginBottom: '1.5rem' }}>Overview</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                {project.description}
              </p>
            </div>

            <div className="project-meta-col glass-panel" style={{ padding: '2.5rem', borderRadius: '12px', border: '1px solid var(--color-border)', height: 'fit-content' }}>
              <h3 className="section-subtitle" style={{ marginBottom: '1.5rem' }}>Project Metadata</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {project.tech_stack && (
                  <div>
                    <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Technologies</h4>
                    <TechPills techStack={project.tech_stack} />
                  </div>
                )}

                <div>
                  <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Project Links</h4>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {project.live_url && (
                      <Button variant="primary" href={project.live_url} target="_blank" rel="noopener noreferrer">
                        Live Site
                      </Button>
                    )}
                    {project.github_url && (
                      <Button variant="secondary" href={project.github_url} target="_blank" rel="noopener noreferrer">
                        GitHub Repo
                      </Button>
                    )}
                    {!project.live_url && !project.github_url && (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>No links public.</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </Container>
    </PageTransition>
  );
};

export default ProjectDetails;
