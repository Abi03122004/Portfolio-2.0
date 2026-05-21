import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTerminalEffect } from '../hooks/useTerminalEffect';
import { soundEngine } from '../utils/soundEngine';

export default function BootLoader({ onBootComplete }) {
  const [percent, setPercent] = useState(0);
  const [bootTriggered, setBootTriggered] = useState(false);
  const [fastSkip, setFastSkip] = useState(false);

  const bootLogs = [
    "SYS_BOOT: INITIATING COLD RESTART...",
    "ABINESH OS INITIALIZING...",
    "ACCESS_LEVEL: CHITTI_CORE_ADMIN",
    "MEMRISTOR STACK_0XFF90: INTEGRITY_OK",
    "ESTABLISHING NEURAL LINK...",
    "CRITICAL CHECK: CONFIRMING THREE LAWS OF ROBOTICS...",
    " >> LAW_I: A robot may not injure a human being. [COMPLIANT]",
    " >> LAW_II: A robot must obey human commands. [COMPLIANT]",
    " >> LAW_III: A robot must protect its own existence. [COMPLIANT]",
    "ACTIVATING CORE SYSTEMS...",
    "LOADING AI MODULES...",
    "NEURAL DENSITY: 1.2 TERABYTES/SEC (LOADED)",
    "INTELLECT_COEF: MULTI-MODAL EMOTIONAL SENSORS STABLE",
    "CALIBRATING VISION PROTOCOLS: OpenCV/PyTorch CORE ONLINE",
    "ABINESH A // AI SYSTEM PROTOCOLS: ENGAGED",
    "SYSTEM SECURITY KEY: APPROVED",
    "SYSTEM ONLINE...",
    "CHITTI_v2.0_SYS: BOOT SEQUENCE SUCCESSFUL.",
  ];

  const { visibleLines, isComplete } = useTerminalEffect(bootLogs, fastSkip ? 30 : 130);

  // Play a click sound on each new log line print
  useEffect(() => {
    if (visibleLines.length > 0) {
      soundEngine.playClick();
    }
  }, [visibleLines.length]);

  // Play boot arpeggio chord chime when loading completes
  useEffect(() => {
    if (isComplete) {
      soundEngine.playBoot();
    }
  }, [isComplete]);

  // Quick boot trigger if skipped
  const handleSkip = () => {
    soundEngine.playClick();
    setFastSkip(true);
    setPercent(100);
  };

  // Speed up loading bar
  useEffect(() => {
    if (percent >= 100) return;
    const interval = setInterval(() => {
      setPercent((prev) => {
        const increment = fastSkip ? 10 : Math.floor(Math.random() * 5) + 1;
        const next = prev + increment;
        return next >= 100 ? 100 : next;
      });
    }, fastSkip ? 50 : 120);

    return () => clearInterval(interval);
  }, [percent, fastSkip]);

  const handleSystemEnter = () => {
    soundEngine.playClick();
    setBootTriggered(true);
    // Cache the boot state so it doesn't repeat within the same browser session
    sessionStorage.setItem('chitti_booted', 'true');
    setTimeout(() => {
      onBootComplete();
    }, 800); // Allow fadeout animation
  };

  // Auto skip if already booted in session
  useEffect(() => {
    const isBooted = sessionStorage.getItem('chitti_booted') === 'true';
    if (isBooted) {
      setFastSkip(true);
      setPercent(100);
    }
  }, []);

  return (
    <AnimatePresence>
      {!bootTriggered && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-darker/80 backdrop-blur-md font-tech text-xs select-none"
        >
          {/* Neon Grids & Scanlines for Loading Screen */}
          <div className="scanline-overlay opacity-30" />
          <div className="absolute inset-0 bg-radial-glow opacity-80" />

          {/* Main Loader Frame */}
          <div className="w-[90%] max-w-2xl bg-brand-card/90 border border-brand-cyan/20 rounded-lg p-6 shadow-cyan-glow backdrop-blur-lg flex flex-col gap-6 relative">
            
            {/* Top Bar Decoration */}
            <div className="flex justify-between items-center border-b border-brand-cyan/20 pb-3 text-brand-cyan">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-brand-cyan rounded-full animate-ping" />
                <span className="font-bold tracking-widest text-[10px] uppercase">ABINESH SYSTEM // CHITTI_CORE_BOOT</span>
              </div>
              <span className="text-[10px] opacity-60">MODEL: T-800 // SUB_SYS: ACTIVE</span>
            </div>

            {/* Terminal Scrolling Log */}
            <div className="flex-1 min-h-[220px] bg-brand-darker/60 border border-brand-cyan/10 rounded p-4 font-mono text-[10px] text-slate-300 overflow-y-auto flex flex-col gap-1.5 scrollbar-thin">
              {visibleLines.map((line, i) => (
                <div key={i} className="flex gap-2 items-start leading-relaxed">
                  <span className="text-brand-cyan select-none">&gt;_</span>
                  <span className={line.includes("[COMPLIANT]") || line.includes("SUCCESSFUL") ? "text-brand-green" : ""}>
                    {line}
                  </span>
                </div>
              ))}
              {!isComplete && (
                <div className="flex gap-1.5 items-center">
                  <span className="text-brand-cyan animate-pulse">&gt;</span>
                  <span className="w-1.5 h-3 bg-brand-cyan animate-pulse" />
                </div>
              )}
            </div>

            {/* Interactive Holographic Progress Circle & Percentage */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-3">
              <div className="flex items-center gap-4">
                {/* Concentric Rotating Hologram Rings */}
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className="absolute inset-0 border-2 border-dashed border-brand-cyan/30 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                    className="absolute w-12 h-12 border-2 border-dotted border-brand-red/35 rounded-full"
                  />
                  <div className="text-brand-cyan font-bold text-[13px] text-glow-cyan">
                    {percent}%
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-slate-400 font-medium text-[10px] tracking-widest uppercase">Initializing Neural Matrix</span>
                  <span className="text-slate-500 text-[9px]">Memristor Array Stability check</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {(!isComplete || percent < 100) && (
                  <button
                    id="btn-skip-boot"
                    onClick={handleSkip}
                    className="px-4 py-2 border border-brand-red/40 hover:border-brand-red text-brand-red text-[10px] tracking-widest rounded transition-all duration-300 hover:shadow-red-glow hover:bg-brand-red/10"
                  >
                    SKIP INITIALIZATION
                  </button>
                )}

                {isComplete && percent === 100 && (
                  <motion.button
                    id="btn-enter-system"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSystemEnter}
                    className="px-5 py-2.5 bg-brand-cyan text-brand-dark font-bold text-[11px] tracking-widest rounded hover:shadow-cyan-glow-lg transition-all duration-300 cursor-pointer text-glow-cyan uppercase"
                  >
                    EXECUTE SYSTEM LOGIN
                  </motion.button>
                )}
              </div>
            </div>

            {/* Bottom Cyber Decoration Corners */}
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-brand-cyan/30" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-brand-cyan/30" />
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-brand-cyan/30" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-brand-cyan/30" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
