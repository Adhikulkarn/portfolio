import React, { useState, useEffect } from 'react';

const ContactLogs = ({ onComplete, apiPromise }) => {
  const [logs, setLogs] = useState([]);

  const funLogs = [
    "Initializing secure SMTP port uplink...",
    "Heuristics scan: fixing spellcheck typos and adding sarcasm layers...",
    "Encrypting message bits with highly complex retro cipher codes...",
    "Spam-filters bypassed using active stealth-matrix headers...",
    "Attaching jetpacks to carrier pigeons for fiber-optical speed...",
    "Transmitting message package across oceanic fiber lines...",
    "Uplink confirmed! Broadcaster package successfully delivered to Aditya...",
  ];

  useEffect(() => {
    let active = true;
    let currentIndex = 0;
    let timer = null;

    const printNextLine = () => {
      if (!active) return;

      if (currentIndex < funLogs.length) {
        const nextLine = funLogs[currentIndex];
        setLogs((prev) => [...prev, nextLine]);
        currentIndex++;
        // Print the next line after 300ms
        timer = setTimeout(printNextLine, 300);
      } else {
        // Completed printing all logs: wait for API promise to resolve
        apiPromise
          .then(() => {
            if (active) onComplete();
          })
          .catch(() => {
            // Parent catch handler will restore the form fields
          });
      }
    };

    // Trigger printing sequence
    printNextLine();

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [apiPromise, onComplete]);

  return (
    <div className="terminal-window">
      {/* Window Controls */}
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="terminal-dot dot-red" />
          <span className="terminal-dot dot-yellow" />
          <span className="terminal-dot dot-green" />
        </div>
        <div className="terminal-title">spidy: ~/contact/send</div>
      </div>

      {/* Console output display */}
      <div className="terminal-body small-terminal font-mono text-xs" style={{ minHeight: '260px' }}>
        <div className="terminal-prompt-line">
          <span className="terminal-user">spidy</span>
          <span className="terminal-dollar">$</span>
          <span className="terminal-line command"> ./send_message.sh</span>
        </div>

        {logs.map((log, idx) => (
          <div key={idx} className="terminal-line" style={{ color: '#4AF626' }}>
            {`[OK] ${log}`}
          </div>
        ))}

        {logs.length < funLogs.length ? (
          <div className="terminal-prompt-line">
            <span className="terminal-user">spidy</span>
            <span className="terminal-dollar">$</span>
            <span className="cursor-blink">_</span>
          </div>
        ) : (
          <div className="terminal-line mt-2" style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
            {`[!] Securing handshake...`}
            <span className="cursor-blink">_</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactLogs;
