import React, { useState, useEffect } from 'react';

/**
 * Terminal-style status bar at the bottom of the screen.
 * Shows live clock, branch, file count, and connection status.
 */
const StatusBar: React.FC = React.memo(() => {
  const [time, setTime] = useState(getTime());

  useEffect(() => {
    const timer = setInterval(() => setTime(getTime()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="status-bar" aria-hidden="true">
      <div className="status-bar-left">
        <span className="status-bar-item status-bar-branch">
          <span className="status-bar-icon">⎇</span> main
        </span>
        <span className="status-bar-item">
          <span className="status-bar-icon">◆</span> 0 errors
        </span>
        <span className="status-bar-item">
          <span className="status-bar-icon">△</span> 0 warnings
        </span>
      </div>
      <div className="status-bar-right">
        <span className="status-bar-item">UTF-8</span>
        <span className="status-bar-item">TypeScript React</span>
        <span className="status-bar-item status-bar-time">{time}</span>
        <span className="status-bar-item status-bar-connected">
          <span className="status-bar-live-dot" />
          connected
        </span>
      </div>
    </div>
  );
});

function getTime(): string {
  const now = new Date();
  return now.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

StatusBar.displayName = 'StatusBar';

export default StatusBar;
