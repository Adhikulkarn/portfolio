import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, speed = 40, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let active = true;
    let index = 0;
    let timer = null;

    const typeChar = () => {
      if (!active) return;

      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
        
        const variance = Math.random() * 30 - 15;
        const delay = Math.max(10, speed + variance);
        timer = setTimeout(typeChar, delay);
      } else {
        if (onComplete) {
          onComplete();
        }
      }
    };

    typeChar();

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [text, speed, onComplete]);

  return <span>{displayedText}</span>;
};

export default Typewriter;
