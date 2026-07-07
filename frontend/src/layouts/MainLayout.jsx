import React from 'react';
import Navbar from '../components/layout/Navbar';
import ScrollProgress from '../components/ui/ScrollProgress';
import ScrollToTop from '../components/ui/ScrollToTop';
import ScrollRestoration from '../components/ui/ScrollRestoration';
import OfflineBanner from '../components/ui/OfflineBanner';
import TuxCompanion from '../features/tux/TuxCompanion';

const MainLayout = ({ children }) => {
  return (
    <>
      {/* Global Scroll Restoration */}
      <ScrollRestoration />
      
      {/* Scroll Progress Bar at the top */}
      <ScrollProgress />
      
      {/* Global Navigation Header */}
      <Navbar />
      
      {/* Connection Loss Banner */}
      <OfflineBanner />
      
      {/* Main View Container */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 'var(--nav-height)' }}>
        {children}
      </main>
      
      {/* Scroll to Top floating action */}
      <ScrollToTop />

      {/* Persistent TUX scroll companion */}
      <TuxCompanion />
    </>
  );
};

export default MainLayout;
