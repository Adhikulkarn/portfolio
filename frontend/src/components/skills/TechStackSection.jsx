import React, { useState, useEffect, useCallback } from 'react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import SkillCategory from './SkillCategory';
import Button from '../ui/Button';
import { skillService } from '../../services/skillService';

const categoryMapping = {
  languages: 'Languages',
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  devops: 'DevOps',
  tools: 'Tools',
  soft_skills: 'Soft Skills',
};

const categoryOrder = [
  'languages',
  'frontend',
  'backend',
  'database',
  'devops',
  'tools',
  'soft_skills',
];

const TechStackSection = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [groupedSkills, setGroupedSkills] = useState({});

  const fetchSkills = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await skillService.getSkills();
      
      const groups = {};
      categoryOrder.forEach((cat) => {
        groups[cat] = [];
      });

      (data || []).forEach((skill) => {
        const cat = skill.category ? skill.category.toLowerCase() : 'tools';
        if (!groups[cat]) {
          groups[cat] = [];
        }
        groups[cat].push(skill);
      });

      setGroupedSkills(groups);
    } catch (err) {
      console.error('Failed to load skills inside TechStackSection:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const hasSkills = Object.values(groupedSkills).some((arr) => arr.length > 0);

  return (
    <Section id="skills" className="tech-stack-section">
      <Container>
        {/* Section Header */}
        <div className="tech-stack-header">
          <h2 className="editorial-heading">
            TECH <br />
            <span className="accent-gradient">STACK</span>
          </h2>
          <p className="tech-stack-intro">
            The technologies I use to bring ideas to life.
          </p>
        </div>

        {/* Dynamic State Container */}
        <div className="tech-stack-content-area">
          {loading ? (
            <div className="skills-loading-skeleton" aria-hidden="true">
              {categoryOrder.slice(0, 4).map((cat) => (
                <div key={cat} className="skeleton-category-column">
                  <div className="skeleton-category-title pulse" />
                  <div className="skeleton-chips">
                    <div className="skeleton-chip pulse" style={{ width: '80px', height: '28px' }} />
                    <div className="skeleton-chip pulse" style={{ width: '105px', height: '28px' }} />
                    <div className="skeleton-chip pulse" style={{ width: '90px', height: '28px' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="skills-error-state glass-panel" role="alert">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="error-icon-wrapper">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <h3 className="error-title">Unable to load stack</h3>
              <p className="error-message">A connection error occurred. Please check your network and try again.</p>
              <Button variant="outline" onClick={fetchSkills} className="error-retry-btn">
                Retry Loading
              </Button>
            </div>
          ) : !hasSkills ? (
            <div className="skills-empty-state glass-panel" role="status">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="empty-icon-wrapper">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="9" y1="9" x2="15" y2="9" />
                <line x1="9" y1="13" x2="15" y2="13" />
              </svg>
              <h3 className="empty-title">No Technologies</h3>
              <p className="empty-message">No technologies added yet.</p>
            </div>
          ) : (
            <div className="skills-grid-columns">
              {categoryOrder.map((catKey) => {
                const skills = groupedSkills[catKey];
                const displayTitle = categoryMapping[catKey] || catKey;
                if (!skills || skills.length === 0) return null;
                return (
                  <SkillCategory
                    key={catKey}
                    title={displayTitle}
                    skills={skills}
                  />
                );
              })}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};

export default TechStackSection;
