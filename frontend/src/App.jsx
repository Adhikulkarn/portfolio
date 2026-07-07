import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Lazy load pages for performance optimization
const Home = lazy(() => import('./pages/Home'));

function App() {
  return (
    <Router>
      <MainLayout>
        <Suspense fallback={
          <div 
            className="flex items-center justify-center text-gradient" 
            style={{ 
              flex: 1, 
              minHeight: '60vh', 
              fontFamily: 'monospace', 
              fontSize: '1rem',
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            INITIALIZING CONSOLE...
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </Router>
  );
}

export default App;
