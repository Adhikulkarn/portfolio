import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Typewriter from './Typewriter';
import Cursor from './Cursor';
import { terminalVariants } from './BootAnimations';

const BootTerminal = ({
  logs,
  bootTyped,
  onBootTypedComplete,
  scrollRef,
  isFadingOut,
}) => {
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  useEffect(() => {
    if (prefersReducedMotion && !bootTyped) {
      onBootTypedComplete();
    }
  }, [prefersReducedMotion, bootTyped, onBootTypedComplete]);

  const getLineColor = (type) => {
    switch (type) {
      case 'header': return '#FFFFFF';
      case 'success': return '#4AF626'; // terminal green
      case 'warn': return '#FF5555';    // terminal red/warn
      case 'joke': return '#8E9AA8';    // terminal gray
      default: return '#D4D4D4';
    }
  };

  return (
    <motion.div
      variants={terminalVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="boot-terminal-window"
      role="dialog"
      aria-label="Developer Environment Boot Console"
      aria-live="polite"
    >
      {/* Terminal Title Bar */}
      <div className="boot-terminal-header">
        <div className="terminal-dots">
          <span className="terminal-dot dot-red" style={{ background: '#FF5F56' }} />
          <span className="terminal-dot dot-yellow" style={{ background: '#FBBF24' }} />
          <span className="terminal-dot dot-green" style={{ background: '#22C55E' }} />
        </div>
        <div className="terminal-title" style={{ textTransform: 'none' }}>
          Developer Environment
        </div>
        <div style={{ width: '40px' }} />
      </div>

      {/* Terminal Screen Body */}
      <div
        ref={scrollRef}
        className="boot-terminal-body hide-scrollbar"
      >
        {/* Command line prompt */}
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

        {/* Dynamic Log Lines */}
        {logs.map((log, index) => (
          <div
            key={index}
            className="terminal-line"
            style={{
              color: getLineColor(log.type),
              fontWeight: log.type === 'header' ? 'bold' : 'normal',
              marginTop: log.type === 'header' ? '0.4rem' : '0',
              whiteSpace: 'pre-wrap'
            }}
          >
            {log.text}
          </div>
        ))}

        {/* Prompt line with blink cursor when typed */}
        {bootTyped && !isFadingOut && (
          <div className="terminal-prompt-line" style={{ marginTop: '0.4rem' }}>
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
