import { useEffect, useRef } from 'react';
import './ParticleField.css';

/**
 * ParticleField
 * Inspired by Google Antigravity (Reference 1)
 * Renders an organic, subtle radial constellation of colorful micro-dots
 * floating smoothly on a pristine white background.
 */
function ParticleField({ density = 65, interactive = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Tasteful Google-Antigravity inspired pastel dot palette
    const colors = [
      'rgba(59, 130, 246, 0.7)',   // Soft Blue
      'rgba(147, 51, 234, 0.65)',  // Soft Violet
      'rgba(236, 72, 153, 0.65)',  // Soft Pink / Coral
      'rgba(245, 158, 11, 0.65)',  // Soft Amber
      'rgba(14, 165, 233, 0.7)',   // Soft Cyan
      'rgba(16, 185, 129, 0.6)',   // Soft Emerald
    ];

    // Generate particles
    const particles = Array.from({ length: density }, () => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 80 + Math.random() * Math.min(width, height) * 0.45;
      return {
        x: width / 2 + Math.cos(angle) * distance,
        y: height / 2 + Math.sin(angle) * distance,
        baseX: width / 2 + Math.cos(angle) * distance,
        baseY: height / 2 + Math.sin(angle) * distance,
        radius: 1.2 + Math.random() * 2.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: angle,
        angularSpeed: (Math.random() - 0.5) * 0.0015,
        radialSpeed: (Math.random() - 0.5) * 0.15,
        alpha: 0.25 + Math.random() * 0.6,
        pulseSpeed: 0.01 + Math.random() * 0.02,
        pulseOffset: Math.random() * Math.PI * 2,
      };
    });

    let mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Orbit & gentle drift
        p.angle += p.angularSpeed;
        p.x = width / 2 + Math.cos(p.angle) * (100 + Math.sin(time + p.pulseOffset) * 25 + (p.baseX - width / 2));
        p.y = height / 2 + Math.sin(p.angle) * (100 + Math.cos(time + p.pulseOffset) * 25 + (p.baseY - height / 2));

        // Subtle interactive mouse repulsion
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const force = (140 - dist) / 140;
            p.x -= (dx / dist) * force * 15;
            p.y -= (dy / dist) * force * 15;
          }
        }

        const currentAlpha = p.alpha * (0.7 + 0.3 * Math.sin(time * 1.5 + p.pulseOffset));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/g, `${currentAlpha})`);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, interactive]);

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />;
}

export default ParticleField;
