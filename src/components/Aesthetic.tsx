import React, { useState, useCallback } from 'react';
import FadeInSection from './FadeInSection';

const images = [
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=300&h=400&fit=crop',
] as const;

const Aesthetic: React.FC = React.memo(() => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const handleMouseEnter = useCallback((idx: number) => setHoveredIdx(idx), []);
  const handleMouseLeave = useCallback(() => setHoveredIdx(null), []);

  return (
    <section className="section" id="aesthetic">
      <FadeInSection>
        <div className="terminal-prompt">
          <span className="terminal-symbol">$</span>
          <span className="terminal-cmd">cat /dev/aesthetic</span>
          <span className="terminal-cursor">_</span>
        </div>

        <div className="aesthetic-grid">
          {images.map((src, idx) => (
            <div
              className={`aesthetic-item ${hoveredIdx === idx ? 'hovered' : ''} ${hoveredIdx !== null && hoveredIdx !== idx ? 'dimmed' : ''}`}
              key={idx}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
            >
              <img src={src} alt={`aesthetic ${idx + 1}`} loading="lazy" />
              <div className="aesthetic-overlay" />
            </div>
          ))}
        </div>
      </FadeInSection>
    </section>
  );
});

Aesthetic.displayName = 'Aesthetic';

export default Aesthetic;
