import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiCpu, FiWifi, FiShield, FiHeart, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { soundEngine } from '../utils/soundEngine';

export default function Navbar() {
  const { themeMode, toggleThemeMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [latency, setLatency] = useState(24);
  const [audioEnabled, setAudioEnabled] = useState(soundEngine.getEnabled());

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  // Detect scroll to adjust glassmorphism intensity
  useEffect(() => {
    let scrolledState = false;
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolledState) {
        scrolledState = isScrolled;
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate network telemetry changing
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 10) + 12);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleAudio = () => {
    const nextVal = !audioEnabled;
    soundEngine.setEnabled(nextVal);
    setAudioEnabled(nextVal);
    soundEngine.playClick();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b ${
          scrolled
            ? 'bg-brand-dark/75 backdrop-blur-md border-brand-cyan/20 py-3 shadow-[0_4px_30px_rgba(var(--color-primary-rgb),0.05)]'
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo Section */}
          <a 
            href="#home" 
            onClick={() => soundEngine.playClick()}
            onMouseEnter={() => soundEngine.playHover()}
            className="flex items-center gap-2 group"
          >
            <div className="relative w-8 h-8 flex items-center justify-center border border-brand-cyan/40 group-hover:border-brand-cyan transition-all duration-300 rounded">
              <span className="text-[10px] font-tech text-brand-cyan font-bold tracking-widest text-glow-cyan">AI</span>
              {/* Corner brackets inside logo box */}
              <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-brand-cyan" />
              <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-brand-cyan" />
            </div>
            <div className="flex flex-col">
              <span className="font-orbitron font-extrabold tracking-widest text-slate-100 text-sm group-hover:text-brand-cyan transition-colors duration-300">
                ABINESH A
              </span>
              <span className="font-tech text-[8px] tracking-widest text-slate-500">
                HOST: ABINESH A // {themeMode === 'blue' ? 'ASSIST_CORE' : 'COMBAT_SYS'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => soundEngine.playClick()}
                onMouseEnter={() => soundEngine.playHover()}
                className="relative text-xs tracking-widest font-tech font-medium text-slate-400 hover:text-brand-cyan uppercase transition-colors duration-350 select-none py-1 group"
              >
                {item.name}
                {/* Neon glow underline indicator */}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-cyan group-hover:w-full transition-all duration-300 shadow-[0_0_8px_var(--color-primary)]" />
              </a>
            ))}
          </nav>

          {/* Right Panel Control Station */}
          <div className="hidden md:flex items-center gap-4">
            {/* Audio Toggle Widget */}
            <button
              onClick={handleToggleAudio}
              onMouseEnter={() => soundEngine.playHover()}
              className={`p-2 border font-tech text-[9px] tracking-widest uppercase rounded transition-all duration-300 cursor-pointer flex items-center justify-center ${
                audioEnabled
                  ? 'border-brand-cyan/40 hover:border-brand-cyan text-brand-cyan bg-brand-cyan/5 hover:shadow-cyan-glow'
                  : 'border-slate-800 text-slate-500 hover:text-slate-300 bg-transparent'
              }`}
              title={audioEnabled ? "Mute UI Audio" : "Unmute UI Audio"}
            >
              {audioEnabled ? <FiVolume2 className="text-xs" /> : <FiVolumeX className="text-xs" />}
            </button>

            {/* Protocol Mode Toggle button */}
            <button
              id="btn-protocol-toggle"
              onClick={() => {
                toggleThemeMode();
              }}
              onMouseEnter={() => soundEngine.playHover()}
              className={`flex items-center gap-1.5 px-3 py-1.5 border font-tech text-[9px] tracking-widest uppercase rounded transition-all duration-300 cursor-pointer ${
                themeMode === 'blue'
                  ? 'border-brand-red/40 hover:border-brand-red text-brand-red bg-brand-red/5 hover:shadow-red-glow'
                  : 'border-brand-cyan/40 hover:border-brand-cyan text-brand-cyan bg-brand-cyan/5 hover:shadow-cyan-glow'
              }`}
            >
              {themeMode === 'blue' ? (
                <>
                  <FiShield className="animate-pulse" />
                  <span>ACTIVATE_CYBER_RED</span>
                </>
              ) : (
                <>
                  <FiHeart className="animate-bounce" />
                  <span>ACTIVATE_ASSIST_BLUE</span>
                </>
              )}
            </button>

            {/* HUD Diagnostics Widget */}
            <div className="hidden lg:flex items-center gap-4 border border-slate-800/80 rounded px-3 py-1 bg-brand-dark/40 font-tech text-[9px] text-slate-400 select-none">
              <div className="flex items-center gap-1">
                <FiWifi className="text-brand-cyan animate-pulse" />
                <span>PING: <span className="text-brand-cyan">{latency}ms</span></span>
              </div>
              <div className="w-[1px] h-3 bg-slate-850" />
              <div className="flex items-center gap-1">
                <FiCpu className="text-brand-red animate-spin-slow" />
                <span>SYS_ST: <span className="text-brand-green">99%</span></span>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Mobile Audio Toggler */}
            <button
              onClick={handleToggleAudio}
              className={`p-2 border rounded transition-colors ${
                audioEnabled
                  ? 'border-brand-cyan/30 text-brand-cyan hover:bg-brand-cyan/10'
                  : 'border-slate-800 text-slate-500'
              }`}
            >
              {audioEnabled ? <FiVolume2 size={16} /> : <FiVolumeX size={16} />}
            </button>

            {/* Mobile Mode Switcher */}
            <button
              onClick={() => {
                toggleThemeMode();
              }}
              className={`p-2 border rounded transition-colors ${
                themeMode === 'blue'
                  ? 'border-brand-red/30 text-brand-red hover:bg-brand-red/10'
                  : 'border-brand-cyan/30 text-brand-cyan hover:bg-brand-cyan/10'
              }`}
            >
              {themeMode === 'blue' ? <FiShield size={16} /> : <FiHeart size={16} />}
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                setIsOpen(!isOpen);
              }}
              onMouseEnter={() => soundEngine.playHover()}
              className="p-2 border border-brand-cyan/20 hover:border-brand-cyan/60 rounded text-brand-cyan transition-colors"
            >
              {isOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[60px] z-30 w-full h-[calc(100vh-60px)] bg-brand-darker/80 backdrop-blur-md border-b border-brand-cyan/20 flex flex-col items-center justify-center p-6 md:hidden"
          >
            {/* Background grids inside mobile drawer */}
            <div className="absolute inset-0 tech-dot-bg opacity-15 pointer-events-none" />

            <div className="flex flex-col gap-6 w-full max-w-sm text-center relative z-10">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    soundEngine.playClick();
                    setIsOpen(false);
                  }}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="py-3 text-sm tracking-widest font-tech font-bold text-slate-300 hover:text-brand-cyan uppercase border-b border-slate-900/60 transition-colors"
                >
                  {item.name}
                </a>
              ))}
              
              {/* Toggle in mobile layout */}
              <button
                onClick={() => {
                  toggleThemeMode();
                  setIsOpen(false);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`mt-4 py-2 border font-tech text-xs tracking-widest uppercase rounded transition-colors ${
                  themeMode === 'blue'
                    ? 'border-brand-red text-brand-red bg-brand-red/5'
                    : 'border-brand-cyan text-brand-cyan bg-brand-cyan/5'
                }`}
              >
                {themeMode === 'blue' ? 'RUN_RED_PROTOCOL' : 'RUN_BLUE_PROTOCOL'}
              </button>
            </div>

            {/* Diagnostics at bottom of mobile menu */}
            <div className="absolute bottom-10 flex gap-4 text-[10px] font-tech text-slate-500">
              <span>LATENCY: {latency}MS</span>
              <span>•</span>
              <span>PROTOCOL: {themeMode.toUpperCase()}</span>
              <span>•</span>
              <span>STATUS: SAFE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
