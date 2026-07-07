import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Typewriter from './Typewriter';
import Cursor from './Cursor';
import { terminalVariants } from './bootAnimations';

const BootTerminal = ({
  logs,
  bootTyped,
  onBootTypedComplete,
  scrollRef,
  isFadingOut,
}) => {
  // Check user preference for reduced motion
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  useEffect(() => {
    if (prefersReducedMotion && !bootTyped) {
      // Instantly trigger boot complete to skip typewriter sequence
      onBootTypedComplete();
    }
  }, [prefersReducedMotion, bootTyped, onBootTypedComplete]);

  const getLineColor = (type) => {
    switch (type) {
      case 'header': return '#FFFFFF';
      case 'success': return '#4AF626'; // terminal green
      case 'warn': return '#F4B942';    // terminal yellow
      case 'joke': return '#8E9AA8';    // terminal gray
      default: return '#E4E4E4';
    }
  };

  return (
    <motion.div
      variants={terminalVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="terminal-window boot-terminal-window"
      style={{
        width: '100%',
        maxWidth: '640px',
        background: '#0D0E11',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.75)',
        borderRadius: '10px',
        overflow: 'hidden'
      }}
      role="dialog"
      aria-label="Developer Environment Boot Console"
      aria-live="polite"
    >
      {/* Terminal Title Bar */}
      <div className="terminal-header" style={{ background: '#16171D', borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
        <div className="terminal-dots">
          <span className="terminal-dot dot-red" style={{ background: '#FF5F56' }} />
          <span className="terminal-dot dot-yellow" style={{ background: '#FBBF24' }} />
          <span className="terminal-dot dot-green" style={{ background: '#22C55E' }} />
        </div>
        <div className="terminal-title" style={{ fontFamily: 'var(--font-body)', color: '#8E9AA8', fontWeight: 500 }}>
          Developer Environment
        </div>
        <div style={{ width: '40px' }} /> {/* Spacing balance */}
      </div>

      {/* Terminal Display screen */}
      <div
        ref={scrollRef}
        className="terminal-body small-terminal hide-scrollbar"
        style={{
          height: '320px',
          overflowY: 'scroll',
          padding: '1.5rem',
          fontFamily: 'monospace',
          fontSize: '0.85rem',
          lineHeight: '1.6',
          color: '#E4E4E4',
          scrollbarWidth: 'none', /* Firefox */
          msOverflowStyle: 'none'  /* IE 10+ */
        }}
      >
        {/* Initial Prompt line */}
        <div className="terminal-prompt-line">
          <span style={{ color: '#00E5FF', fontWeight: 'bold' }}>portfolio@aditya</span>
          <span style={{ color: '#8E9AA8' }}>:~$</span>
          {prefersReducedMotion || bootTyped ? (
            <span style={{ color: '#FFFFFF' }}> boot</span>
          ) : (
            <span style={{ color: '#FFFFFF' }}>
              {' '}
              <Typewriter text="boot" speed={80} onComplete={onBootTypedComplete} />
            </span>
          )}
          {!bootTyped && <Cursor />}
        </div>

        {/* Dynamic Boot Sequence Log Output */}
        {logs.map((log, index) => (
          <div
            key={index}
            className="terminal-line"
            style={{
              color: getLineColor(log.type),
              fontWeight: log.type === 'header' ? 'bold' : 'normal',
              marginTop: log.type === 'header' ? '0.5rem' : '0'
            }}
          >
            {log.text}
          </div>
        ))}

        {/* Bottom prompt line with blinking cursor */}
        {bootTyped && !isFadingOut && (
          <div className="terminal-prompt-line" style={{ marginTop: '0.5rem' }}>
            <span style={{ color: '#00E5FF', fontWeight: 'bold' }}>portfolio@aditya</span>
            <span style={{ color: '#8E9AA8' }}>:~$</span>
            <Cursor />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BootTerminal;
