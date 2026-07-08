import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Section from '../ui/Section';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { experienceService } from '../../services/experienceService';

// Individual Experience Terminal Window
const ExperienceTerminalWindow = ({ item }) => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [isTypingPrompt, setIsTypingPrompt] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const containerRef = useRef(null);
  // Trigger exactly once per page load when the user visits the experience section
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
    }
  }, [isInView, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let active = true;
    let timer = null;

    const runTerminal = async () => {
      setDisplayedLines([]);
      setCurrentPrompt('');

      const typeCommand = async (text) => {
        setIsTypingPrompt(true);
        let current = '';
        for (let i = 0; i < text.length; i++) {
          if (!active) return;
          current += text[i];
          setCurrentPrompt(current);
          await new Promise((resolve) => {
            timer = setTimeout(resolve, 50);
          });
        }
        await new Promise((resolve) => {
          timer = setTimeout(resolve, 150);
        });
        setIsTypingPrompt(false);
        setDisplayedLines((prev) => [...prev, { type: 'command', text }]);
        setCurrentPrompt('');
      };

      const addLine = async (label, value, color, delay = 250) => {
        if (!active) return;
        setDisplayedLines((prev) => [...prev, { type: 'field', label, value, color }]);
        await new Promise((resolve) => {
          timer = setTimeout(resolve, delay);
        });
      };

      // Slight random delay to stagger side-by-side terminal typing animations
      const offset = Math.floor(Math.random() * 500) + 100;
      await new Promise((resolve) => {
        timer = setTimeout(resolve, offset);
      });

      const orgSlug = (item.organization || 'job').toLowerCase().replace(/\s+/g, '_');
      await typeCommand(`cat ${orgSlug}_profile.sh`);

      await addLine('ROLE', item.role, '#4AF626');
      await addLine('COMPANY', item.organization, '#F4B942');
      await addLine('DURATION', item.duration, '#00E5FF');
      await addLine('DETAILS', item.description, '#FFFFFF', 400);
    };

    runTerminal();

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [hasStarted, item]);

  const orgName = (item.organization || 'job').toLowerCase().replace(/\s+/g, '');
  const terminalTitle = `spidy: ~/experience/${orgName}`;

  return (
    <motion.div
      ref={containerRef}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="terminal-window"
    >
      {/* Header Controls */}
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="terminal-dot dot-red" />
          <span className="terminal-dot dot-yellow" />
          <span className="terminal-dot dot-green" />
        </div>
        <div className="terminal-title">{terminalTitle}</div>
      </div>

      {/* Screen Output */}
      <div className="terminal-body small-terminal" role="log" aria-live="polite">
        {displayedLines.map((line, idx) => {
          if (line.type === 'command') {
            return (
              <div key={idx} className="terminal-prompt-line">
                <span className="terminal-user">spidy</span>
                <span className="terminal-dollar">$</span>
                <span className="terminal-line command">{` ${line.text}`}</span>
              </div>
            );
          } else if (line.type === 'field') {
            const isHighlighted = line.label === 'ROLE' || line.label === 'COMPANY';
            return (
              <div key={idx} className="terminal-line experience-item-line">
                <span className="experience-field-label" style={{ color: line.color }}>
                  {line.label}:
                </span>{' '}
                <span 
                  className={`experience-field-value ${isHighlighted ? 'highlighted-value' : ''}`}
                  style={line.label === 'COMPANY' ? { color: '#F4B942' } : undefined}
                >
                  {line.value}
                </span>
              </div>
            );
          }
          return null;
        })}

        {isTypingPrompt && (
          <div className="terminal-prompt-line">
            <span className="terminal-user">spidy</span>
            <span className="terminal-dollar">$</span>
            {` ${currentPrompt}`}
            <span className="cursor-blink">_</span>
          </div>
        )}

        {!isTypingPrompt && (
          <div className="terminal-prompt-line">
            <span className="terminal-user">spidy</span>
            <span className="terminal-dollar">$</span>
            <span className="cursor-blink">_</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

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
      <div className="section-bg-text section-bg-text-right" aria-hidden="true">
        SYSTEMS
      </div>
      <Container>
        {/* Section Header */}
        <div className="experience-header">
          <h2 className="editorial-heading">EXPERIENCE</h2>
          <p className="experience-intro">
            Professional roles, internships and project positions recorded in my developer logs.
          </p>
        </div>

        {/* Dynamic Screen Area */}
        <div className="experience-content-area">
          {loading ? (
            <div className="experience-terminals-grid" aria-hidden="true">
              {[1, 2].map((i) => (
                <div key={i} className="terminal-window pulse" style={{ opacity: 0.6 }}>
                  <div className="terminal-header">
                    <div className="terminal-dots">
                      <span className="terminal-dot dot-red" />
                      <span className="terminal-dot dot-yellow" />
                      <span className="terminal-dot dot-green" />
                    </div>
                    <div className="terminal-title">spidy: ~/experience/loading</div>
                  </div>
                  <div className="terminal-body small-terminal" style={{ minHeight: '240px' }} />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="experience-error-state glass-panel" role="alert">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="error-icon-wrapper">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <h3 className="error-title">Terminal Offline</h3>
              <p className="error-message">Unable to query experience records from database.</p>
              <Button variant="outline" onClick={fetchExperience} className="error-retry-btn">
                Retry Connection
              </Button>
            </div>
          ) : experiences.length === 0 ? (
            <div className="experience-empty-state glass-panel" role="status">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="empty-icon-wrapper">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <h3 className="empty-title">Logs Empty</h3>
              <p className="empty-message">No work history records found in databases.</p>
            </div>
          ) : (
            <div className="experience-terminals-grid">
              {experiences.map((item, idx) => (
                <ExperienceTerminalWindow key={item.id || idx} item={item} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};

export default ExperienceSection;
