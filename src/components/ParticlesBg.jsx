import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ParticlesBg() {
  const { themeMode } = useTheme();
  const canvasRef = useRef(null);
  
  // Cache theme mode inside a ref so we can update colors dynamically inside the draw loop
  const themeRef = useRef(themeMode);
  useEffect(() => {
    themeRef.current = themeMode;
  }, [themeMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    let currentR = themeRef.current === 'red' ? 255 : 0;
    let currentG = themeRef.current === 'red' ? 0 : 240;
    let currentB = themeRef.current === 'red' ? 60 : 255;
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.alpha = 0.4;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw(fillStyleString) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = fillStyleString;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const density = Math.floor((canvas.width * canvas.height) / 18000);
      const count = Math.min(density, 80); // Cap particles for performance
      for (let i = 0; i < count; i++) {
        particles.push(
          new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          )
        );
      }
    };

    const maxDistance = 110;
    const maxDistanceSq = maxDistance * maxDistance;

    const drawConnections = (alphaStrings) => {
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistanceSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / maxDistance) * 0.12;
            const alphaIndex = Math.max(0, Math.min(12, Math.round(alpha * 100)));
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = alphaStrings[alphaIndex];
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const targetR = themeRef.current === 'red' ? 255 : 0;
      const targetG = themeRef.current === 'red' ? 0 : 240;
      const targetB = themeRef.current === 'red' ? 60 : 255;

      currentR += (targetR - currentR) * 0.08;
      currentG += (targetG - currentG) * 0.08;
      currentB += (targetB - currentB) * 0.08;

      const rRound = Math.round(currentR);
      const gRound = Math.round(currentG);
      const bRound = Math.round(currentB);

      const fillStyleString = `rgba(${rRound}, ${gRound}, ${bRound}, 0.4)`;
      
      // Cache the 13 alpha string segments to prevent GC garbage compilation loops
      const alphaStrings = [];
      for (let a = 0; a <= 12; a++) {
        alphaStrings[a] = `rgba(${rRound}, ${gRound}, ${bRound}, ${(a / 100).toFixed(2)})`;
      }

      particles.forEach((particle) => {
        particle.update();
        particle.draw(fillStyleString);
      });

      drawConnections(alphaStrings);
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Triggers width/height set and initialization
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
