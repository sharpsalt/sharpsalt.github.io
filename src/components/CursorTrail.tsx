import React, { useEffect, useRef } from 'react';

/**
 * Canvas-based cursor trail — fading dots that follow the mouse
 * for a sleek, ghostly trail effect.
 */
const CursorTrail: React.FC = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    interface Trail {
      x: number;
      y: number;
      life: number;
      maxLife: number;
    }

    const trails: Trail[] = [];
    let animId = 0;
    let mouseX = -100;
    let mouseY = -100;
    let lastX = -100;
    let lastY = -100;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const handleMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouse, { passive: true });
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Only add trail if mouse moved enough
      const dx = mouseX - lastX;
      const dy = mouseY - lastY;
      if (dx * dx + dy * dy > 16) {
        trails.push({
          x: mouseX,
          y: mouseY,
          life: 1,
          maxLife: 1,
        });
        lastX = mouseX;
        lastY = mouseY;
      }

      // Keep trails manageable
      while (trails.length > 30) trails.shift();

      for (let i = trails.length - 1; i >= 0; i--) {
        const t = trails[i];
        t.life -= 0.025;

        if (t.life <= 0) {
          trails.splice(i, 1);
          continue;
        }

        const alpha = t.life * 0.3;
        const radius = t.life * 3 + 1;

        ctx.beginPath();
        ctx.arc(t.x, t.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(161, 161, 170, ${alpha})`;
        ctx.fill();

        // Subtle glow ring
        ctx.beginPath();
        ctx.arc(t.x, t.y, radius + 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(74, 222, 128, ${alpha * 0.15})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="cursor-trail"
      aria-hidden="true"
    />
  );
});

CursorTrail.displayName = 'CursorTrail';

export default CursorTrail;
