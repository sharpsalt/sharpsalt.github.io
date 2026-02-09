import React, { useEffect, useRef, useState } from 'react';

interface Props {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  trigger?: boolean;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?<>/';

const TextScramble: React.FC<Props> = React.memo(({ text, className = '', as: Tag = 'span', trigger = true }) => {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!trigger || hasRun.current) return;
    hasRun.current = true;

    let iteration = 0;
    const totalFrames = text.length * 2;

    const scramble = () => {
      const result = text
        .split('')
        .map((char, idx) => {
          if (char === ' ') return ' ';
          if (idx < iteration / 2) return text[idx];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      setDisplay(result);
      iteration++;

      if (iteration <= totalFrames) {
        frameRef.current = requestAnimationFrame(scramble);
      } else {
        setDisplay(text);
      }
    };

    frameRef.current = requestAnimationFrame(scramble);

    return () => cancelAnimationFrame(frameRef.current);
  }, [text, trigger]);

  return <Tag className={className}>{display}</Tag>;
});

TextScramble.displayName = 'TextScramble';

export default TextScramble;
