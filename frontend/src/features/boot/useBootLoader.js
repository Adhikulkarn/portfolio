import { useState, useEffect, useRef, useCallback } from 'react';
import { LogPool } from './LogPool';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const useBootLoader = (onFinish) => {
  const [logs, setLogs] = useState([]);
  const [stage, setStage] = useState('BOOT_TYPING');
  const [tuxReaction, setTuxReaction] = useState('idle');
  const scrollRef = useRef(null);
  
  // Guard ref: guarantees the sequence is run exactly once (Strict Mode resilient)
  const hasStarted = useRef(false);

  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Randomly select 18-22 unique middle logs
  const [selectedLogs] = useState(() => {
    const count = Math.floor(Math.random() * 5) + 18; // 18 to 22
    const shuffled = [...LogPool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  });

  // Stable log addition callback
  const addLog = useCallback((text, type = 'info') => {
    setLogs((prev) => [...prev, { text, type }]);
  }, []);

  // Update text/type of the last log line
  const updateLastLog = useCallback((text, type) => {
    setLogs((prev) => {
      const next = [...prev];
      if (next.length > 0) {
        next[next.length - 1] = {
          ...next[next.length - 1],
          text,
          ...(type ? { type } : {})
        };
      }
      return next;
    });
  }, []);

  // Auto scroll terminal body
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Boot sequence runner
  useEffect(() => {
    if (stage !== 'BOOT_SEQUENCE') return;

    if (hasStarted.current) return;
    hasStarted.current = true;

    const runSequence = async () => {
      // Clear logs
      setLogs([]);

      // 1. FIXED OPENING
      addLog("Initializing Portfolio...", "header");
      await sleep(150);
      if (!isMounted.current) return;

      addLog("✓ Configuration Loaded", "success");
      await sleep(250);
      if (!isMounted.current) return;

      addLog("Loading React Runtime...", "header");
      setTuxReaction('nod'); // TUX tiny head nod
      await sleep(200);
      if (!isMounted.current) return;

      addLog("✓ Runtime Ready", "success");
      setTuxReaction('idle');
      await sleep(350);
      if (!isMounted.current) return;

      // 2. RANDOM MIDDLE LOGS (18-22 items)
      for (const logItem of selectedLogs) {
        if (!isMounted.current) return;

        // Drive TUX reactions dynamically based on log texts
        if (logItem.text.includes("React") || logItem.text.includes("caffeine")) {
          setTuxReaction('nod');
        } else if (logItem.text.includes("Bugs") || logItem.text.includes("Conflicts") || logItem.text.includes("Sentient")) {
          setTuxReaction('tilt'); // Confused head tilt
        } else if (logItem.text.includes("Impression") || logItem.text.includes("Lighthouse") || logItem.text.includes("div")) {
          setTuxReaction('smile'); // Happy smile
        } else {
          setTuxReaction('idle');
        }

        if (logItem.style === 'type') {
          addLog("", "joke");
          let typedText = "";
          for (let i = 0; i < logItem.text.length; i++) {
            if (!isMounted.current) return;
            typedText += logItem.text[i];
            updateLastLog(typedText);
            await sleep(10); // fast character typing
          }
          await sleep(150);
        } else if (logItem.style === 'progress') {
          addLog(`${logItem.text} [                    ] 0%`, "joke");
          const totalBlocks = 20;
          for (let i = 1; i <= totalBlocks; i++) {
            if (!isMounted.current) return;
            const percentage = Math.round((i / totalBlocks) * 100);
            const blocks = "█".repeat(i) + " ".repeat(totalBlocks - i);
            updateLastLog(`${logItem.text} [${blocks}] ${percentage}%`);
            await sleep(20); // rapid progress bar ticks
          }
          updateLastLog(`${logItem.text} [${"█".repeat(totalBlocks)}] 100%`, "success");
          await sleep(200);
        } else {
          const isSuccess = logItem.text.startsWith("✓") || logItem.text.includes("✓");
          const isError = logItem.text.startsWith("✖") || logItem.text.includes("✖");
          
          let lineType = "joke";
          if (isSuccess) lineType = "success";
          else if (isError) lineType = "warn";

          addLog(logItem.text, lineType);
          await sleep(120); // natural log scroll delay
        }
      }

      setTuxReaction('idle');

      // 3. FIXED ENDING
      addLog("✓ Environment Ready", "success");
      await sleep(180);
      if (!isMounted.current) return;

      addLog("✓ Portfolio Compiled", "success");
      await sleep(180);
      if (!isMounted.current) return;

      addLog("✓ UI Initialized", "success");
      await sleep(250);
      if (!isMounted.current) return;

      addLog("Welcome, Recruiter.", "header");
      await sleep(250);
      if (!isMounted.current) return;

      addLog("Hope you enjoy exploring.", "header");
      await sleep(250);
      if (!isMounted.current) return;

      addLog("Launching Portfolio...", "success");
      setTuxReaction('wave'); // TUX big friendly waving
      await sleep(750);
      if (!isMounted.current) return;

      // 4. Outro Pause (700ms) - TUX looks at visitor, final friendly wave and happy bounce
      setTuxReaction('wave');
      await sleep(700);
      if (!isMounted.current) return;

      setStage('FADE_OUT');

      // Outro scaling transition delay
      await sleep(700);
      if (isMounted.current) {
        setStage('COMPLETE');
        onFinish();
      }
    };

    runSequence();
  }, [stage, selectedLogs, onFinish, addLog, updateLastLog]);

  return {
    logs,
    stage,
    setStage,
    tuxReaction,
    scrollRef,
  };
};
