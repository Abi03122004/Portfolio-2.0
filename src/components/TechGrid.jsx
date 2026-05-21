import React from 'react';

export default function TechGrid() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Moving Tech Grid */}
      <div 
        className="absolute inset-0 tech-grid-bg opacity-35 animate-grid-drift"
        style={{ 
          top: '-40px',
          height: 'calc(100% + 40px)',
          willChange: 'transform'
        }}
      />
      
      {/* Tech Dots */}
      <div className="absolute inset-0 tech-dot-bg opacity-20" />
      
      {/* Vignette Shadow Overlay (Moved before the torch overlay so the torch is drawn on top) */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-transparent to-brand-darker opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-darker via-transparent to-brand-darker opacity-80" />

      {/* Hidden Circuit Board Torch Overlay (Visible in 1cm+ radius of cursor, rendered on top of vignette) */}
      <div 
        id="tech-grid-spotlight"
        className="absolute inset-0 transition-colors duration-500"
        style={{
          color: 'var(--color-primary)',
          opacity: 0.85,
          filter: 'drop-shadow(0 0 3px var(--color-primary))',
          maskImage: 'radial-gradient(circle 42px at var(--cursor-x, -200px) var(--cursor-y, -200px), black 45%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle 42px at var(--cursor-x, -200px) var(--cursor-y, -200px), black 45%, transparent 100%)'
        }}
      >
        <svg className="w-full h-full">
          <defs>
            <pattern id="circuit-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              {/* Circuit background dots */}
              <circle cx="10" cy="10" r="1.0" fill="currentColor" opacity="0.35"/>
              <circle cx="50" cy="10" r="1.0" fill="currentColor" opacity="0.35"/>
              <circle cx="30" cy="30" r="1.0" fill="currentColor" opacity="0.35"/>
              <circle cx="70" cy="30" r="1.0" fill="currentColor" opacity="0.35"/>
              <circle cx="10" cy="50" r="1.0" fill="currentColor" opacity="0.35"/>
              <circle cx="50" cy="50" r="1.0" fill="currentColor" opacity="0.35"/>
              <circle cx="30" cy="70" r="1.0" fill="currentColor" opacity="0.35"/>
              <circle cx="70" cy="70" r="1.0" fill="currentColor" opacity="0.35"/>

              {/* Circuit lines */}
              <path d="M 10,10 L 30,30 L 30,50 L 50,70 L 70,70" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.75"/>
              <path d="M 50,10 L 70,30 L 70,50 L 50,50 L 30,70" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.75"/>
              <path d="M 10,50 L 30,50" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.75"/>
              <path d="M 50,30 L 50,10" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.75"/>

              {/* Node Pads */}
              <circle cx="10" cy="10" r="2.8" fill="none" stroke="currentColor" strokeWidth="0.9" opacity="0.75"/>
              <circle cx="10" cy="10" r="1.1" fill="currentColor" opacity="0.9"/>
              
              <circle cx="70" cy="70" r="2.8" fill="none" stroke="currentColor" strokeWidth="0.9" opacity="0.75"/>
              <circle cx="70" cy="70" r="1.1" fill="currentColor" opacity="0.9"/>

              <circle cx="50" cy="10" r="2.8" fill="none" stroke="currentColor" strokeWidth="0.9" opacity="0.75"/>
              <circle cx="50" cy="10" r="1.1" fill="currentColor" opacity="0.9"/>

              <circle cx="30" cy="70" r="2.8" fill="none" stroke="currentColor" strokeWidth="0.9" opacity="0.75"/>
              <circle cx="30" cy="70" r="1.1" fill="currentColor" opacity="0.9"/>

              <circle cx="30" cy="30" r="1.9" fill="currentColor" opacity="0.9"/>
              <circle cx="70" cy="30" r="1.9" fill="currentColor" opacity="0.9"/>
              <circle cx="50" cy="50" r="1.9" fill="currentColor" opacity="0.9"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>
      </div>
      
      {/* Top and Bottom Glowing Tech Borders */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent shadow-cyan-glow" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent shadow-cyan-glow" />
    </div>
  );
}
