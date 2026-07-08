import React from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import Container from '../ui/Container';
import BuildCard from './BuildCard';

// Custom inline SVG icons for Phase 2 card layouts to ensure zero asset dependency failures
const LayersIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const ShieldIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 11 2 2 4-4" />
  </svg>
);

const BrainIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="M12 6v12M6 12h12" />
  </svg>
);

const TerminalIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const cardsData = [
  {
    icon: LayersIcon,
    title: 'Full Stack Applications',
    description: 'Build responsive, scalable and maintainable web applications from frontend to backend.',
  },
  {
    icon: ShieldIcon,
    title: 'Secure Systems',
    description: 'Design secure applications with privacy, encryption and reliability as core principles.',
  },
  {
    icon: BrainIcon,
    title: 'AI Applications',
    description: 'Develop intelligent software by integrating modern AI models, APIs and automation.',
  },
  {
    icon: TerminalIcon,
    title: 'Developer Tools',
    description: 'Build tools and platforms that improve developer workflows and productivity.',
  },
];

const WhatIBuildSection = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <Section id="what-i-build" className="what-i-build-section">
      <div className="section-bg-text section-bg-text-left" aria-hidden="true">
        BUILD
      </div>
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={headerVariants}
          className="what-i-build-header"
        >
          <h2 className="editorial-heading">
            WHAT <br />
            <span className="accent-gradient">I BUILD</span>
          </h2>
          <p className="what-i-build-intro">
            I enjoy designing and building software that solves practical problems through clean architecture, scalable systems, and thoughtful user experiences.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="build-cards-grid"
        >
          {cardsData.map((card) => (
            <motion.div key={card.title} variants={itemVariants}>
              <BuildCard
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

export default WhatIBuildSection;
