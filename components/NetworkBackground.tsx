import React, { useEffect, useRef } from 'react';

export const NetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
    let height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
    }

    const particles: Particle[] = [];
    // Adjust density: fewer particles on smaller screens
    const particleCount = Math.min(Math.floor(width * height / 15000), 80); 

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3, // Slow movement
        vy: (Math.random() - 0.5) * 0.3
      });
    }

    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#00ff9d';
      ctx.strokeStyle = '#00ff9d';

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        ctx.globalAlpha = 0.15;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();

        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            // Opacity based on distance
            ctx.globalAlpha = 0.1 * (1 - dist / 120);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
