import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainLayout from './layouts/MainLayout';
import BootLoader from './features/boot-loader/BootLoader';

// Lazy load page components for route-based code splitting and fast first-contentful paint (FCP)
const Home = lazy(() => import('./pages/Home'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const BlogDetails = lazy(() => import('./pages/BlogDetails'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <HelmetProvider>
      <Router>
        <BootLoader>
          <MainLayout>
            <Suspense fallback={
              <div 
                className="flex items-center justify-center text-gradient" 
                style={{ 
                  flex: 1, 
                  minHeight: '70vh', 
                  fontFamily: 'monospace', 
                  fontSize: '1rem',
                  letterSpacing: '0.05em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-live="polite"
              >
                INITIALIZING CONSOLE...
              </div>
            }>
              <Routes>
                {/* Home Dashboard */}
                <Route path="/" element={<Home />} />
                
                {/* Project Case Studies */}
                <Route path="/projects/:slug" element={<ProjectDetails />} />
                
                {/* Blog Articles */}
                <Route path="/blogs/:slug" element={<BlogDetails />} />
                
                {/* Catch-all 404 Error handling */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </MainLayout>
        </BootLoader>
      </Router>
    </HelmetProvider>
  );
}

export default App;
