import React, { useState, useEffect, useCallback } from 'react';

const bootLines = [
  { text: '> POST ... system check passed', delay: 80 },
  { text: '> BIOS v3.2.1 ... OK', delay: 100 },
  { text: '> CPU: AMD Ryzen 9 7950X @ 5.7GHz ... detected', delay: 120 },
  { text: '> initializing memory ... 32768 MB DDR5 @ 6000MHz', delay: 180 },
  { text: '> loading kernel modules ...', delay: 250 },
  { text: '  [████████████████████] grub.mod     OK', delay: 100 },
  { text: '  [████████████████████] fs.mod       OK', delay: 80 },
  { text: '  [████████████████████] net.mod      OK', delay: 90 },
  { text: '  [████████████████████] gpu.mod      OK', delay: 70 },
  { text: '  [████████████████████] crypto.mod   OK', delay: 60 },
  { text: '> mounting filesystem ... ext4 on /dev/nvme0n1p2', delay: 200 },
  { text: '> starting network daemon ... eth0 UP [192.168.1.42]', delay: 160 },
  { text: '> starting display server ... wayland', delay: 120 },
  { text: '> loading user environment ...', delay: 200 },
  { text: '', delay: 80 },
  { text: '  ███████╗██████╗ ██╗     ██╗ █████╗ ', delay: 40 },
  { text: '  ██╔════╝██╔══██╗██║     ██║██╔══██╗', delay: 40 },
  { text: '  ███████╗██████╔╝██║     ██║███████║', delay: 40 },
  { text: '  ╚════██║██╔══██╗██║██   ██║██╔══██║', delay: 40 },
  { text: '  ███████║██║  ██║██║╚█████╔╝██║  ██║', delay: 40 },
  { text: '  ╚══════╝╚═╝  ╚═╝╚═╝ ╚════╝ ╚═╝  ╚═╝', delay: 40 },
  { text: '', delay: 80 },
  { text: '> environment loaded. session authenticated.', delay: 200 },
  { text: '> system ready. welcome back, srija.', delay: 300 },
  { text: '> launching interface ...', delay: 400 },
];

interface Props {
  onComplete: () => void;
}

const BootLoader: React.FC<Props> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [progress, setProgress] = useState(0);

  const finish = useCallback(() => {
    if (skipped) return;
    setFadeOut(true);
    setTimeout(() => {
      setDone(true);
      onComplete();
    }, 600);
  }, [onComplete, skipped]);

  const skip = useCallback(() => {
    if (skipped) return;
    setSkipped(true);
    setFadeOut(true);
    setTimeout(() => {
      setDone(true);
      onComplete();
    }, 300);
  }, [onComplete, skipped]);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const showLines = async () => {
      for (let i = 0; i < bootLines.length; i++) {
        if (cancelled) return;
        await new Promise<void>((resolve) => {
          timeoutId = setTimeout(() => {
            setLines((prev) => [...prev, bootLines[i].text]);
            setProgress(((i + 1) / bootLines.length) * 100);
            resolve();
          }, bootLines[i].delay);
        });
      }
      if (!cancelled) {
        timeoutId = setTimeout(finish, 300);
      }
    };

    showLines();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [finish]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') {
        skip();
      }
    };
    const handleClick = () => skip();
    window.addEventListener('keydown', handleKey);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('click', handleClick);
    };
  }, [skip]);

  if (done) return null;

  return (
    <div className={`boot-loader ${fadeOut ? 'boot-fade-out' : ''}`}>
      <div className="boot-scanlines" />
      <div className="boot-content">
        {lines.map((line, i) => (
          <div key={i} className="boot-line">{line}</div>
        ))}
        <span className="boot-cursor">█</span>
      </div>
      <div className="boot-progress-container">
        <div className="boot-progress-bar" style={{ width: `${progress}%` }} />
        <span className="boot-progress-text">{Math.round(progress)}%</span>
      </div>
      <div className="boot-footer">
        <div className="boot-stats">
          <span>MEM: 32GB</span>
          <span>CPU: 12 cores</span>
          <span>GPU: RTX 4090</span>
          <span>NET: 1Gbps</span>
        </div>
        <div className="boot-skip">press any key to skip</div>
      </div>
    </div>
  );
};

export default BootLoader;
