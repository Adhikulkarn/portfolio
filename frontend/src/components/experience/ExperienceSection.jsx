import React, { useState, useEffect, useCallback } from 'react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import TimelineItem from './TimelineItem';
import ExperienceSkeleton from './ExperienceSkeleton';
import ExperienceEmptyState from './ExperienceEmptyState';
import ExperienceErrorState from './ExperienceErrorState';
import { experienceService } from '../../services/experienceService';

const ExperienceSection = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [experiences, setExperiences] = useState([]);

  const fetchExperience = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await experienceService.getExperience();
      setExperiences(data || []);
    } catch (err) {
      console.error('Failed to load experiences inside ExperienceSection:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperience();
  }, [fetchExperience]);

  return (
    <Section id="experience" className="experience-section">
      <Container>
        {/* Section Header */}
        <div className="experience-header">
          <h2 className="editorial-heading">EXPERIENCE</h2>
          <p className="experience-intro">
            The people, organizations and communities that shaped my journey.
          </p>
        </div>

        {/* Dynamic State Container */}
        <div className="experience-content-area">
          {loading ? (
            <ExperienceSkeleton />
          ) : error ? (
            <ExperienceErrorState onRetry={fetchExperience} />
          ) : experiences.length === 0 ? (
            <ExperienceEmptyState />
          ) : (
            <div className="timeline-container">
              <div className="timeline-center-line" />
              {experiences.map((item, idx) => (
                <TimelineItem
                  key={item.id || idx}
                  item={item}
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

export default ExperienceSection;
