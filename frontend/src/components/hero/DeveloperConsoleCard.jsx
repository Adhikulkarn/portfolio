import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { healthService } from '../../services/healthService';
import { projectService } from '../../services/projectService';
import { blogService } from '../../services/blogService';
import { skillService } from '../../services/skillService';

const DeveloperConsoleCard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [stats, setStats] = useState({
    backend: 'OFFLINE',
    projects: 0,
    blogs: 0,
    skills: 0,
  });

  const [activeIndex, setActiveIndex] = useState(null);
  const timerRef = useRef(null);

  const fetchStatus = async () => {
    setLoading(true);
    setError(false);
    try {
      // Fetch health, projects, blogs, and skills concurrently
      const [healthData, projectsData, blogsData, skillsData] = await Promise.all([
        healthService.checkHealth().catch(() => 'DOWN'),
        projectService.getProjects().catch(() => []),
        blogService.getBlogs().catch(() => []),
        skillService.getSkills().catch(() => []),
      ]);

      const isHealthy = healthData === 'OK' || healthData?.status === 'OK' || healthData?.status === 'online';

      if (healthData === 'DOWN' || !isHealthy) {
        throw new Error('Backend Offline');
      }

      setStats({
        backend: 'ONLINE',
        projects: projectsData.length || 0,
        blogs: blogsData.length || 0,
        skills: skillsData.length || 0,
      });
      setError(false);
    } catch (err) {
      console.error('Developer Console API fetch error:', err);
      setError(true);
      setStats(prev => ({ ...prev, backend: 'OFFLINE' }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Interval to animate exactly ONE status row every 5 seconds
  useEffect(() => {
    if (loading || error) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      // We have 4 items: Backend (0), Projects (1), Blogs (2), Skills (3)
      setActiveIndex(prev => {
        if (prev === null) return 0;
        return (prev + 1) % 4;
      });
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [loading, error]);

  const rows = [
    { label: 'Backend Server', value: stats.backend, isStatus: true },
    { label: 'Projects Loaded', value: `${stats.projects} entries` },
    { label: 'Articles Published', value: `${stats.blogs} entries` },
    { label: 'Technologies catalog', value: `${stats.skills} skills` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="console-card glass-panel"
      role="region"
      aria-label="Developer Console Status Panel"
    >
      {/* Window Header */}
      <div className="console-header">
        <div className="console-dots">
          <span className="console-dot dot-red" />
          <span className="console-dot dot-yellow" />
          <span className="console-dot dot-green" />
        </div>
        <div className="console-title">Developer Console</div>
        <div style={{ width: '42px' }} /> {/* Spacer to align title */}
      </div>

      {/* Card Body */}
      <div className="console-body">
        <div className="console-section-title">SYSTEM STATUS</div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="console-loader"
            >
              Loading system metrics...
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="console-error-container"
            >
              <div className="console-error-message">
                [ERROR] HTTP Connection Refused.
              </div>
              <div className="console-error-message">
                Backend Offline or Database down.
              </div>
              <button
                onClick={fetchStatus}
                className="console-retry-btn"
                aria-label="Retry connection to backend"
              >
                Retry Connection
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="console-content"
            >
              {rows.map((row, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <motion.div
                    key={row.label}
                    animate={isActive ? {
                      backgroundColor: 'rgba(244, 185, 66, 0.05)',
                      borderColor: 'rgba(244, 185, 66, 0.2)',
                    } : {
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      borderColor: 'rgba(0, 0, 0, 0)',
                    }}
                    transition={{ duration: 0.5 }}
                    className="console-row"
                    style={{ border: '1px solid transparent' }}
                  >
                    <span className="console-label">{row.label}</span>
                    <span
                      className={`console-value ${
                        row.isStatus
                          ? row.value === 'ONLINE'
                            ? 'online'
                            : 'offline'
                          : ''
                      }`}
                    >
                      {row.value}
                    </span>
                  </motion.div>
                );
              })}

              <div className="console-row">
                <span className="console-label">Current Build</span>
                <span className="console-value text-gradient">Portfolio CMS v1.0</span>
              </div>

              <div className="console-row">
                <span className="console-label">Availability</span>
                <span className="console-value text-gradient">Open to Internship</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Prompt */}
        <div className="console-footer">
          <span className="console-prompt">portfolio@aditya:~$</span>
          <span className="cursor-blink" aria-hidden="true">█</span>
        </div>
      </div>
    </motion.div>
  );
};

export default DeveloperConsoleCard;
