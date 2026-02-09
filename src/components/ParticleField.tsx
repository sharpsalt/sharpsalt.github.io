import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

const ParticleField: React.FC = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -999, y: -999 });
  const animId = useRef(0);
  const isVisible = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const count = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 18000));

    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    const handleMouse = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouse.current = { x: -999, y: -999 };
    };

    // Pause animation when tab is not visible
    const handleVisibility = () => {
      isVisible.current = !document.hidden;
      if (isVisible.current) {
        animId.current = requestAnimationFrame(draw);
      }
    };

    window.addEventListener('mousemove', handleMouse, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', handleVisibility);

    const draw = () => {
      if (!isVisible.current) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pts = particles.current;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(161, 161, 170, ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const distSq = dx * dx + dy * dy;

          // Use squared distance to avoid sqrt
          if (distSq < 14400) { // 120^2
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(161, 161, 170, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        const mx = mouse.current.x;
        const my = mouse.current.y;
        const mdx = p.x - mx;
        const mdy = p.y - my;
        const mDistSq = mdx * mdx + mdy * mdy;

        if (mDistSq < 22500) { // 150^2
          const mDist = Math.sqrt(mDistSq);
          const force = (150 - mDist) / 150;
          p.vx += (mdx / mDist) * force * 0.08;
          p.vy += (mdy / mDist) * force * 0.08;

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(161, 161, 170, ${0.08 * (1 - mDist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        p.vx *= 0.995;
        p.vy *= 0.995;
      }

      animId.current = requestAnimationFrame(draw);
    };

    animId.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId.current);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-field"
      aria-hidden="true"
    />
  );
});

ParticleField.displayName = 'ParticleField';

export default ParticleField;
