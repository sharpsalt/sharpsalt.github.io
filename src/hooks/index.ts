import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Custom hook for IntersectionObserver-based visibility detection.
 * Used for fade-in animations and lazy rendering.
 */
export const useIntersectionObserver = (
  options: IntersectionObserverInit = { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(el);
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

/**
 * Throttle a callback to at most once per `delay` ms using rAF.
 */
export const useThrottledCallback = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T => {
  const lastCall = useRef(0);
  const rafId = useRef(0);

  return useCallback(
    ((...args: any[]) => {
      const now = performance.now();
      if (now - lastCall.current >= delay) {
        lastCall.current = now;
        callback(...args);
      } else {
        cancelAnimationFrame(rafId.current);
        rafId.current = requestAnimationFrame(() => {
          lastCall.current = performance.now();
          callback(...args);
        });
      }
    }) as T,
    [callback, delay]
  );
};

/**
 * Scroll progress tracking (0-100).
 * Uses passive scroll listener and rAF for performance.
 */
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return progress;
};

/**
 * Mouse position tracker with throttled updates.
 */
export const useMousePosition = () => {
  const position = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      position.current = { x: e.clientX, y: e.clientY };
    };
    const handleLeave = () => {
      position.current = { x: -999, y: -999 };
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return position;
};

/**
 * Typing animation effect hook.
 */
export const useTypingEffect = (text: string, speed: number = 55, trigger: boolean = true) => {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    if (!trigger) return;
    let i = 0;
    setTypedText('');

    const timer = setInterval(() => {
      if (i <= text.length) {
        setTypedText(text.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, trigger]);

  return typedText;
};

/**
 * Keyboard shortcut listener.
 */
export const useKeyboardShortcut = (
  key: string,
  callback: () => void,
  modifiers: { ctrl?: boolean; meta?: boolean; shift?: boolean } = {}
) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const ctrlOrMeta = modifiers.ctrl || modifiers.meta;
      if (ctrlOrMeta && !(e.ctrlKey || e.metaKey)) return;
      if (modifiers.shift && !e.shiftKey) return;
      if (e.key.toLowerCase() === key.toLowerCase()) {
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [key, callback, modifiers.ctrl, modifiers.meta, modifiers.shift]);
};

/**
 * Lock body scroll (for modals/overlays).
 */
export const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    document.body.style.overflow = isLocked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLocked]);
};

/**
 * Media query hook for responsive detection.
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    mql.addEventListener('change', handler);
    setMatches(mql.matches);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
};
