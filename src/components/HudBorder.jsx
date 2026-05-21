import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function HudBorder({ 
  children, 
  title = "DATA_PANEL", 
  status = "OK", 
  color = "primary", 
  className = "" 
}) {
  const { themeMode } = useTheme();
  const isRedMode = themeMode === 'red';

  let cornerColor = "border-brand-cyan";
  let textColor = "text-brand-cyan";
  let statusColor = "text-brand-cyan";
  let dotColor = "bg-brand-cyan";
  let shadowClass = "shadow-cyan-glow";

  if (color === 'red' || (isRedMode && color === 'primary')) {
    cornerColor = "border-brand-red";
    textColor = "text-brand-red";
    statusColor = "text-brand-red";
    dotColor = "bg-brand-red";
    shadowClass = "shadow-red-glow";
  } else if (color === 'blue') {
    cornerColor = "border-brand-blue";
    textColor = "text-brand-blue";
    statusColor = "text-brand-blue";
    dotColor = "bg-brand-blue";
    shadowClass = "shadow-blue-glow";
  }

  // Cinematic transitions and hover behaviors
  // Red Alert mode has aggressive snap-scaling & pulsing hover triggers
  // Blue Assistant mode has smooth floating visual transitions
  const hoverAnimation = React.useMemo(() => (isRedMode 
    ? { y: -4, scale: 1.015, transition: { type: "spring", stiffness: 350, damping: 12 } }
    : { y: -2, scale: 1.0, transition: { duration: 0.4, ease: "easeInOut" } }
  ), [isRedMode]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={hoverAnimation}
      className={`relative p-5 bg-brand-card border border-slate-800/80 rounded backdrop-blur-md ${shadowClass} transition-all duration-500 group ${className}`}
    >
      {/* Corner Bracket Overlays */}
      <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${cornerColor} rounded-tl transition-colors duration-500`} />
      <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 ${cornerColor} rounded-tr transition-colors duration-500`} />
      <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${cornerColor} rounded-bl transition-colors duration-500`} />
      <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${cornerColor} rounded-br transition-colors duration-500`} />

      {/* Decorative Crosshair Ticks */}
      <div className={`absolute top-[-3px] left-1/2 transform -translate-x-1/2 text-[8px] font-tech opacity-40 select-none ${textColor} transition-colors duration-500`}>
        +
      </div>
      <div className={`absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 text-[8px] font-tech opacity-40 select-none ${textColor} transition-colors duration-500`}>
        +
      </div>

      {/* Futuristic Telemetry Header */}
      <div className="flex justify-between items-center mb-3 text-[10px] font-tech tracking-wider border-b border-slate-800/60 pb-2 select-none">
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse transition-all duration-500`} />
          <span className="text-slate-400 font-bold">{title}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <span>SYS_VAL:</span>
          <span className={`${statusColor} transition-colors duration-500`}>{status}</span>
        </div>
      </div>

      {/* Inner Content */}
      <div className="relative z-10 text-slate-300">
        {children}
      </div>

      {/* Futuristic Bottom Status Strip */}
      <div className="mt-3 pt-2 border-t border-slate-850 flex justify-between text-[8px] font-tech text-slate-500 tracking-widest select-none">
        <span>MEM_ARR: [0x5FF9]</span>
        <span>LATENCY: 0.04ms</span>
      </div>
    </motion.div>
  );
}
