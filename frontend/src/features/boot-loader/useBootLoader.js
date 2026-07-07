import { useState, useEffect, useRef, useCallback } from 'react';
import { LogPool } from './LogPool';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const useBootLoader = (onFinish) => {
  const [logs, setLogs] = useState([]);
  const [stage, setStage] = useState('BOOT_TYPING');
  const scrollRef = useRef(null);
  
  // Guard ref: guarantees the sequence is run exactly once (resilient to StrictMode double-execution)
  const hasStarted = useRef(false);

  // Randomly select 18-22 unique messages from the 64-item pool
  const [selectedLogs] = useState(() => {
    const count = Math.floor(Math.random() * 5) + 18; // 18 to 22
    const shuffled = [...LogPool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  });

  // Stable log addition callback
  const addLog = useCallback((text, type = 'info') => {
    setLogs((prev) => [...prev, { text, type }]);
  }, []);

  // Update the text/type of the last added log row
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

  // Scroll to bottom of terminal screen
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Main Scripted Boot Sequence Effect
  useEffect(() => {
    if (stage !== 'BOOT_SEQUENCE') return;

    if (hasStarted.current) return;
    hasStarted.current = true;

    let active = true;

    const runSequence = async () => {
      // 0. Reset log buffer
      setLogs([]);

      // 1. Initial Scripted Headers
      addLog("Initializing Portfolio...", "header");
      await sleep(150);
      if (!active) return;

      addLog("✓ Configuration Loaded", "success");
      await sleep(250);
      if (!active) return;

      addLog("Loading React Runtime...", "header");
      await sleep(150);
      if (!active) return;

      addLog("✓ Runtime Ready", "success");
      await sleep(350);
      if (!active) return;

      // 2. Play Selected Humorous Logs (18-22 items)
      for (const logItem of selectedLogs) {
        if (!active) return;

        if (logItem.style === 'type') {
          // Type out character-by-character
          addLog("", "joke");
          let typedText = "";
          for (let i = 0; i < logItem.text.length; i++) {
            if (!active) return;
            typedText += logItem.text[i];
            updateLastLog(typedText);
            await sleep(12); // fast typing speed
          }
          await sleep(150);
        } else if (logItem.style === 'progress') {
          // Animate text progress bar loader
          addLog(`${logItem.text} [                    ] 0%`, "joke");
          const totalBlocks = 20;
          for (let i = 1; i <= totalBlocks; i++) {
            if (!active) return;
            const percentage = Math.round((i / totalBlocks) * 100);
            const blocks = "█".repeat(i) + " ".repeat(totalBlocks - i);
            updateLastLog(`${logItem.text} [${blocks}] ${percentage}%`);
            await sleep(30); // 20 * 30ms = 600ms total progress duration
          }
          // Color green upon completion
          updateLastLog(`${logItem.text} [${"█".repeat(totalBlocks)}] 100%`, "success");
          await sleep(200);
        } else {
          // Instant log appearance
          // Format based on message prefixes
          const isSuccess = logItem.text.startsWith("✓") || logItem.text.includes("✓");
          const isError = logItem.text.startsWith("✖") || logItem.text.includes("✖");
          
          let lineType = "joke";
          if (isSuccess) lineType = "success";
          else if (isError) lineType = "warn";

          addLog(logItem.text, lineType);
          await sleep(140); // natural delay before next line
        }
      }

      // 3. Final Operational Logs (Always printed)
      addLog("✓ Environment Ready", "success");
      await sleep(200);
      if (!active) return;

      addLog("✓ Portfolio Compiled", "success");
      await sleep(200);
      if (!active) return;

      addLog("✓ UI Initialized", "success");
      await sleep(300);
      if (!active) return;

      addLog("Welcome, Recruiter.", "header");
      await sleep(250);
      if (!active) return;

      addLog("Hope you enjoy exploring.", "header");
      await sleep(250);
      if (!active) return;

      addLog("Launching Portfolio...", "success");
      await sleep(800);
      if (!active) return;

      // 4. Trigger exit transitions
      setStage('FADE_OUT');
      
      // Wait for outro scale down animation to complete
      await sleep(700);
      if (active) {
        setStage('COMPLETE');
        onFinish();
      }
    };

    runSequence();

    return () => {
      active = false;
    };
  }, [stage, selectedLogs, onFinish, addLog, updateLastLog]);

  return {
    logs,
    stage,
    setStage,
    scrollRef,
  };
};
