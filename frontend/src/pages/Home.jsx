import React from 'react';
import PageTransition from '../components/ui/PageTransition';
import Hero from '../components/hero/Hero';
import WhatIBuildSection from '../components/what-i-build/WhatIBuildSection';
import SelectedWorkSection from '../components/selected-work/SelectedWorkSection';
import EngineeringPhilosophy from '../components/philosophy/EngineeringPhilosophy';

const Home = () => {
  return (
    <PageTransition>
      <Hero />
      <WhatIBuildSection />
      <SelectedWorkSection />
      <EngineeringPhilosophy />
    </PageTransition>
  );
};

export default Home;
