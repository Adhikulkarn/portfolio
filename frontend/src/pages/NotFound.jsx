import React from 'react';
import PageTransition from '../components/ui/PageTransition';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import SEO from '../components/common/SEO';

const NotFound = () => {
  return (
    <PageTransition>
      <SEO title="Page Not Found" noIndex={true} />
      <div 
        className="flex flex-col items-center justify-center" 
        style={{ flex: 1, minHeight: '70vh', textAlign: 'center', padding: '3rem 1.5rem' }}
      >
        <Container>
          <div className="terminal-window" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="terminal-dot dot-red" />
                <span className="terminal-dot dot-yellow" />
                <span className="terminal-dot dot-green" />
              </div>
              <div className="terminal-title">spidy: ~/404</div>
            </div>
            <div className="terminal-body font-mono text-left" style={{ padding: '2rem', minHeight: 'auto' }}>
              <div className="terminal-line" style={{ color: '#FF5555', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1rem' }}>
                ERROR 404: ROUTE_NOT_FOUND
              </div>
              <p className="terminal-line" style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                The address you navigated to does not exist, has been moved, or resides in an alternate directory.
              </p>
              <div className="terminal-prompt-line" style={{ marginBottom: '1.5rem' }}>
                <span className="terminal-user">spidy</span>
                <span className="terminal-dollar">$</span>
                <span className="terminal-line command"> cd /home</span>
              </div>
              <Button href="/" variant="primary">
                Return to Dashboard
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </PageTransition>
  );
};

export default NotFound;
