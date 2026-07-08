import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Section from '../ui/Section';
import Container from '../ui/Container';
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

const getCategoryColor = (catKey) => {
  switch (catKey) {
    case 'languages': return '#4AF626'; // bright green
    case 'frontend': return '#F4B942';  // yellow
    case 'backend': return '#00E5FF';   // cyan
    case 'database': return '#FF007F';  // pink/magenta
    case 'devops': return '#BD93F9';    // purple
    case 'tools': return '#FF5555';     // red
    case 'soft_skills': return '#FFFFFF'; // white
    default: return '#AFAFAF';
  }
};

// Reusable Terminal Window for each skill category - runs typing animation every time it enters view
const TerminalWindow = ({ title, command, skills, color }) => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [isTypingPrompt, setIsTypingPrompt] = useState(false);

  const containerRef = useRef(null);
  // once: false enables triggering the view state repeatedly on scrolling in and out
  const isInView = useInView(containerRef, { once: false, margin: '-100px' });

  useEffect(() => {
    let active = true;
    let timer = null;

    if (!isInView) {
      // Scrolled out of view: reset display buffers immediately
      setDisplayedLines([]);
      setCurrentPrompt('');
      setIsTypingPrompt(false);
      return;
    }

    // Scrolled into view: trigger the typing sequence
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
            timer = setTimeout(resolve, 60);
          });
        }
        await new Promise((resolve) => {
          timer = setTimeout(resolve, 150);
        });
        setIsTypingPrompt(false);
        setDisplayedLines((prev) => [...prev, { type: 'command', text }]);
        setCurrentPrompt('');
      };

      const addSkillLines = async () => {
        for (let skill of skills) {
          if (!active) return;
          setDisplayedLines((prev) => [...prev, { type: 'skill', text: skill }]);
          await new Promise((resolve) => {
            timer = setTimeout(resolve, 250); // Type skills sequentially
          });
        }
      };

      // Offset initial typing slightly per category for a more organic, async feel
      const offset = Math.floor(Math.random() * 600) + 100;
      await new Promise((resolve) => {
        timer = setTimeout(resolve, offset);
      });

      // Run typing commands once per view entry
      await typeCommand(command);
      await addSkillLines();
    };

    runTerminal();

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [isInView, skills, command]);

  return (
    <motion.div
      ref={containerRef}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="terminal-window"
    >
      {/* Header bar controls */}
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="terminal-dot dot-red" />
          <span className="terminal-dot dot-yellow" />
          <span className="terminal-dot dot-green" />
        </div>
        <div className="terminal-title">{title}</div>
      </div>

      {/* Output Screen */}
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
          } else if (line.type === 'skill') {
            return (
              <div key={idx} className="terminal-line skill-item" style={{ color }}>
                {`> ${line.text}`}
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

const TechStackSection = () => {
  const [skills, setSkills] = useState([]);
  const [groupedSkills, setGroupedSkills] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchSkills = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await skillService.getSkills();
      setSkills(data || []);

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
            Interactive command-line shells listing active technologies and framework environments.
          </p>
        </div>

        {/* Terminals Grid */}
        <div className="tech-stack-content-area">
          {loading ? (
            <div className="skills-terminals-grid" aria-hidden="true">
              {categoryOrder.slice(0, 4).map((cat) => (
                <div key={cat} className="terminal-window pulse" style={{ opacity: 0.6 }}>
                  <div className="terminal-header">
                    <div className="terminal-dots">
                      <span className="terminal-dot dot-red" />
                      <span className="terminal-dot dot-yellow" />
                      <span className="terminal-dot dot-green" />
                    </div>
                    <div className="terminal-title">spidy: ~/skills/{cat}</div>
                  </div>
                  <div className="terminal-body small-terminal" style={{ minHeight: '220px' }} />
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
              <h3 className="error-title">Terminal Grid Offline</h3>
              <p className="error-message">A connection error occurred while loading stack databases.</p>
              <Button variant="outline" onClick={fetchSkills} className="error-retry-btn">
                Retry Connection
              </Button>
            </div>
          ) : (
            <div className="skills-terminals-grid">
              {categoryOrder.map((catKey) => {
                const list = groupedSkills[catKey] || [];
                if (list.length === 0) return null;
                const displayTitle = categoryMapping[catKey] || catKey;
                return (
                  <TerminalWindow
                    key={catKey}
                    title={`spidy: ~/skills/${catKey}`}
                    command={`cat ${catKey}.json`}
                    skills={list.map((s) => s.name)}
                    color={getCategoryColor(catKey)}
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
