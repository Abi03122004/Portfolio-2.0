import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function CustomCursor() {
  const { themeMode } = useTheme();
  const isRed = themeMode === 'red';
  const [isVisible, setIsVisible] = useState(false);
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    // Check if device is a touch screen (hides custom cursor to prevent overlay layout lag)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    let animationFrameId = null;
    let pendingX = -200;
    let pendingY = -200;
    let hasPendingUpdate = false;

    const updateSpotlightPosition = () => {
      const el = document.getElementById('tech-grid-spotlight');
      if (el) {
        el.style.setProperty('--cursor-x', `${pendingX}px`);
        el.style.setProperty('--cursor-y', `${pendingY}px`);
      }
      hasPendingUpdate = false;
    };

    const handleMouseMove = (e) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      if (!hasPendingUpdate) {
        hasPendingUpdate = true;
        animationFrameId = requestAnimationFrame(updateSpotlightPosition);
      }
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      pendingX = -200;
      pendingY = -200;
      if (!hasPendingUpdate) {
        hasPendingUpdate = true;
        animationFrameId = requestAnimationFrame(updateSpotlightPosition);
      }
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = (e) => {
      const id = Date.now();
      setClicks((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);

    // Initial position off-screen
    updateSpotlightPosition();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isVisible]);

  // Cleanup past ripples to optimize React virtual DOM footprint
  useEffect(() => {
    if (clicks.length > 0) {
      const timer = setTimeout(() => {
        setClicks((prev) => prev.slice(1));
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [clicks]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden hidden md:block select-none">
      {/* Realtime Audio-Visual click ripples */}
      <AnimatePresence>
        {clicks.map((click) => (
          <motion.div
            key={click.id}
            initial={{ opacity: 0.8, scale: 0 }}
            animate={{ opacity: 0, scale: 3.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed w-6 h-6 rounded-full border -translate-x-1/2 -translate-y-1/2 ${
              isRed
                ? 'border-brand-red bg-brand-red/10 shadow-[0_0_10px_rgba(239,68,68,0.4)]'
                : 'border-brand-cyan bg-brand-cyan/10 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
            }`}
            style={{ left: click.x, top: click.y }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
