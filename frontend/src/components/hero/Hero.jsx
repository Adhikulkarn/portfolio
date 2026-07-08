import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Container from '../ui/Container';
import DeveloperConsoleCard from './DeveloperConsoleCard';

const Hero = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom apple-style cubic bezier ease
      },
    },
  };

  const nameVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="home" className="hero-section">
      {/* Subtle background typography watermark */}
      <div className="hero-bg-text" aria-hidden="true">
        SOFTWARE ENGINEER
      </div>

      <Container size="hero">
        <div className="hero-grid">
          {/* Left Column Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hero-left"
          >
            <motion.div variants={itemVariants} className="hero-badge-wrapper">
              <Badge>Open to Internships</Badge>
            </motion.div>

            <motion.span variants={itemVariants} className="hero-label">
              HELLO, I'M
            </motion.span>

            <motion.h1 variants={nameVariants} className="hero-name">
              ADITYA <br />
              <span className="accent-gradient">KULKARNI</span>
            </motion.h1>

            <motion.div variants={itemVariants} className="hero-roles">
              <span className="hero-role">Software Engineer</span>
              <span className="role-separator" aria-hidden="true">•</span>
              <span className="hero-role text-muted">Full Stack Developer</span>
            </motion.div>

            <motion.p variants={itemVariants} className="hero-description">
              I build scalable software, secure systems, and products that people enjoy using.
            </motion.p>

            <motion.div variants={itemVariants} className="hero-buttons">
              <Button variant="primary" href="#projects">
                View Projects
              </Button>
              <Button
                variant="secondary"
                href="https://portfolio-2xcz.onrender.com/api/resume/current/"
                download
              >
                Download Resume
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column Developer Console */}
          <div className="hero-right">
            <DeveloperConsoleCard />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
