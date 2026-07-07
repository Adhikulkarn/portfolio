import React from 'react';
import PageTransition from '../components/ui/PageTransition';
import Hero from '../components/hero/Hero';
import WhatIBuildSection from '../components/what-i-build/WhatIBuildSection';
import SelectedWorkSection from '../components/selected-work/SelectedWorkSection';
import EngineeringPhilosophy from '../components/philosophy/EngineeringPhilosophy';
import ExperienceSection from '../components/experience/ExperienceSection';
import BlogsSection from '../components/blogs/BlogsSection';
import TechStackSection from '../components/skills/TechStackSection';
import ContactSection from '../components/contact/ContactSection';

import SEO from '../components/common/SEO';

const Home = () => {
  return (
    <PageTransition>
      <SEO />
      <Hero />
      <WhatIBuildSection />
      <SelectedWorkSection />
      <EngineeringPhilosophy />
      <TechStackSection />
      <ExperienceSection />
      <BlogsSection />
      <ContactSection />
    </PageTransition>
  );
};

export default Home;
