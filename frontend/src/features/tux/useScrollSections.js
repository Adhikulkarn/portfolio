import { useState, useEffect, useRef } from 'react';

export const useScrollSections = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = (isInitial = false) => {
      // Only set scrolling status if this is an actual user scroll event
      if (!isInitial) {
        setIsScrolling(true);
      }

      // Debounce scrolling stop detection
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      // Detect active section in viewport matching home element DOM IDs
      const sections = ['home', 'what-i-build', 'projects', 'philosophy', 'skills', 'experience', 'blogs', 'contact'];
      let currentSection = 'home';

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section top threshold crosses the upper half of screen (45%), it is active
          if (rect.top <= window.innerHeight * 0.45) {
            currentSection = sectionId;
          }
        }
      }

      setActiveSection(currentSection);
    };

    const onScroll = () => handleScroll(false);

    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once on load to find initial section without triggering scrolling states
    handleScroll(true);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return { activeSection, isScrolling };
};
