import React, { useEffect, useRef, useCallback } from 'react';

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const FadeInSection: React.FC<Props> = React.memo(({ children, delay = 0, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        if (delay > 0) {
          setTimeout(() => entry.target.classList.add('visible'), delay);
        } else {
          entry.target.classList.add('visible');
        }
        observer.unobserve(entry.target);
      }
    },
    [delay]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px',
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [handleIntersection]);

  return (
    <div ref={ref} className={`fade-section ${className}`}>
      {children}
    </div>
  );
});

FadeInSection.displayName = 'FadeInSection';

export default FadeInSection;
