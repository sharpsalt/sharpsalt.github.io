import React, { useEffect, useRef } from 'react';

const GlowCursor: React.FC = React.memo(() => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (glowRef.current) {
          glowRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={glowRef} className="glow-cursor" aria-hidden="true" />;
});

GlowCursor.displayName = 'GlowCursor';

export default GlowCursor;
