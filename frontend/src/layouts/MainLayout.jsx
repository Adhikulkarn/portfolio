import React from 'react';
import Navbar from '../components/layout/Navbar';

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 'var(--nav-height)' }}>
        {children}
      </main>
    </>
  );
};

export default MainLayout;
