import React from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import Container from '../ui/Container';
import HighlightCard from './HighlightCard';

// Custom inline SVG icons for Phase 2 card layouts to ensure zero asset dependency failures
const CodeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const TrendingUpIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const UsersIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const cardsData = [
  {
    icon: CodeIcon,
    title: 'Full Stack Development',
    description: 'Building complete software solutions from frontend to backend.',
  },
  {
    icon: TrendingUpIcon,
    title: 'Continuous Learning',
    description: 'Constantly exploring software architecture, cloud platforms, AI and scalable systems.',
  },
  {
    icon: UsersIcon,
    title: 'Leadership',
    description: 'Leading teams, volunteering and collaborating to build meaningful impact.',
  },
];

const EngineeringPhilosophy = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const splitVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <Section id="philosophy" className="philosophy-section">
      <Container>
        {/* Editorial Split Layout for Text Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={splitVariants}
          className="philosophy-split-row"
        >
          {/* Left Column Heading */}
          <div className="philosophy-left">
            <h2 className="editorial-heading">
              ENGINEERING <br />
              <span className="accent-gradient">PHILOSOPHY</span>
            </h2>
          </div>

          {/* Right Column Body */}
          <div className="philosophy-right">
            <p className="philosophy-paragraph">
              I'm a Computer Science student who enjoys building software that solves real-world problems. I love working across the full development stack, from designing intuitive user interfaces to architecting secure and scalable backend systems. Over time, I've built projects in healthcare, cybersecurity, AI, and web development, with each one teaching me something new about writing clean, reliable, and maintainable software.
            </p>
            <p className="philosophy-paragraph">
              Beyond coding, I enjoy exploring system design, learning modern technologies, and continuously improving as a developer. I also volunteer at U&I, where I've developed valuable leadership and teamwork skills that shape how I approach both software and collaboration.
            </p>
          </div>
        </motion.div>

        {/* Highlight Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="philosophy-cards-grid"
        >
          {cardsData.map((card) => (
            <motion.div key={card.title} variants={itemVariants}>
              <HighlightCard
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
};

export default EngineeringPhilosophy;
