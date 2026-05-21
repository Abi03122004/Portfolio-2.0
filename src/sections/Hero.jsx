import React from 'react';
import { motion } from 'framer-motion';
import { useTypewriter } from '../hooks/useTerminalEffect';
import { useTheme } from '../context/ThemeContext';
import CountUp from '../components/CountUp';
import { FiDownload, FiTerminal, FiDatabase, FiSettings, FiActivity } from 'react-icons/fi';
import profileImg from '../assets/profile.jpg';

const TYPING_WORDS = ["Machine Learning", "AI Systems", "Network Security", "Full Stack Development"];

export default function Hero() {
  const { themeMode } = useTheme();
  const isRed = themeMode === 'red';
  const typingText = useTypewriter(TYPING_WORDS, 80, 40, 1500);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Rotation speeds: Red mode has faster, aggressive alert telemetry, Blue mode is smooth and floating
  const outerSpeed = isRed ? 10 : 25;
  const scanLineSpeed = isRed ? 6 : 15;
  const middleSpeed = isRed ? 8 : 20;
  const innerSpeed = isRed ? 4 : 8;

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Text and Terminal HUD */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col gap-6 text-left"
        >
          {/* SECURE SYSTEM LABEL */}
          <motion.div 
            variants={itemVariants} 
            className="inline-flex items-center gap-2 border border-brand-cyan/20 bg-brand-cyan/5 w-fit px-3 py-1 rounded text-brand-cyan font-tech text-[10px] tracking-widest select-none transition-all duration-500"
          >
            <FiTerminal className="animate-pulse" />
            <span>[SECURE_CONNECTION: TR-800 // {isRed ? 'RED_ALERT_MODE' : 'ESTABLISHED'}]</span>
          </motion.div>

          {/* INITIALIZING LOG */}
          <motion.span 
            variants={itemVariants}
            className="text-[10px] tracking-[0.25em] font-tech text-slate-500 uppercase select-none"
          >
            {isRed ? 'ALERT: CYBER DEPLOYMENT SEQUENCE ACTIVE...' : 'Initializing AI Portfolio System...'}
          </motion.span>

          {/* MAIN HEADER */}
          <motion.h1 
            variants={itemVariants}
            className="font-orbitron text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight select-none leading-none"
          >
            <span className="text-slate-100">ABINESH A —</span>{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-cyan text-glow-cyan transition-all duration-500">
              AIML ENGINEER
            </span>
          </motion.h1>

          {/* TYPING CONSOLE HUD */}
          <motion.div 
            variants={itemVariants}
            className="bg-brand-dark/50 border border-slate-800/80 rounded p-4 flex items-center gap-3 w-full max-w-lg shadow-hud-inset font-tech select-none transition-colors duration-500"
          >
            <div className="flex flex-col gap-1 text-slate-500 font-bold text-[10px]">
              <span>SYS_INIT</span>
              <span className="text-brand-cyan transition-colors duration-500">INPUT &gt;</span>
            </div>
            <div className="flex-1 text-slate-200 text-sm sm:text-base font-bold tracking-wide">
              <span>{typingText}</span>
              <span className="inline-block w-1.5 h-4 ml-1 bg-brand-cyan animate-pulse transition-colors duration-500" />
            </div>
            <FiDatabase className="text-brand-cyan/60 animate-bounce transition-colors duration-500" />
          </motion.div>

          {/* FUTURISTIC INTRO */}
          <motion.p 
            variants={itemVariants}
            className="text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed font-light font-inter"
          >
            Passionate AIML student focused on intelligent systems, machine learning, cybersecurity AI, and futuristic full stack development. Interested in building smart applications, anomaly detection systems, and AI-powered security solutions while exploring modern futuristic user experiences.
          </motion.p>

          {/* BUTTON TRIGGERS */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4 mt-2"
          >
            {/* Primary Action Button */}
            <a 
              id="btn-projects"
              href="#projects"
              className="relative px-6 py-3 bg-brand-cyan text-brand-dark font-bold text-xs font-tech tracking-widest rounded hover:shadow-cyan-glow-lg transition-all duration-300 hover:scale-105 active:scale-95 group uppercase"
            >
              <span className="relative z-10 flex items-center gap-2">
                EXECUTE_PROJECTS()
              </span>
              <div className="absolute inset-0 bg-brand-cyan rounded opacity-0 group-hover:opacity-20 blur-sm transition-opacity" />
            </a>

            {/* Secondary Action Button */}
              <a
                id="btn-resume"
                href="https://drive.google.com/uc?export=download&id=1y6mnpg2LNf0NImmsBvVKMRe0jgyIEq86"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playClick()}
                onMouseEnter={() => soundEngine.playHover()}
                className="relative px-6 py-3 border border-brand-red/50 hover:border-brand-red text-brand-red font-bold text-xs font-tech tracking-widest rounded hover:shadow-red-glow transition-all duration-300 hover:scale-105 active:scale-95 group uppercase flex items-center gap-2"
              >
                <span>GET_RESUME.sys</span>
                <FiDownload className="group-hover:translate-y-[1px] transition-transform" />
              </a>
          </motion.div>
        </motion.div>

        {/* Right Side: Concentric Hologram Rings & Stats */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative select-none">
          
          {/* Main Hologram Container */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
            
            {/* Ambient Background Glow */}
            <div className="absolute w-60 h-60 bg-brand-cyan/5 rounded-full filter blur-3xl animate-pulse-glow transition-colors duration-500" />

            {/* OUTER RING (Dotted Cyan, Spins Clockwise) */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: outerSpeed, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-brand-cyan/20 rounded-full transition-all duration-500"
            />

            {/* SCANNING LINES (Rotates and fades) */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: scanLineSpeed, ease: "linear" }}
              className="absolute w-[92%] h-[92%] border-t-2 border-brand-cyan/45 rounded-full filter drop-shadow-[0_0_8px_var(--color-primary)] transition-all duration-500"
            />

            {/* MIDDLE RING (Red, Custom speed Counter-Clockwise) */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: middleSpeed, ease: "linear" }}
              className="absolute w-[80%] h-[80%] border border-dashed border-brand-red/30 rounded-full transition-all duration-500"
            />

            {/* INNER TICK RING (Blue, Spins Clockwise) */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: innerSpeed, ease: "linear" }}
              className="absolute w-[68%] h-[68%] border-2 border-dotted border-brand-blue/40 rounded-full transition-all duration-500"
            />

            {/* Radar Scan Sweeper Line overlay */}
            <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none opacity-40 animate-spin-slow">
              <div 
                className="w-1/2 h-full origin-right transition-all duration-500"
                style={{
                  background: `linear-gradient(90deg, rgba(var(--color-primary-rgb),0) 80%, rgba(var(--color-primary-rgb),0.2) 100%)`
                }}
              />
            </div>

            {/* Central Glowing Profile Avatar Placeholder */}
            <div className="absolute w-44 h-44 rounded-full border-2 border-brand-cyan/50 p-2 shadow-cyan-glow bg-brand-darker/90 overflow-hidden flex items-center justify-center flex-col gap-1 transition-all duration-500 group cursor-crosshair">
              {/* Scanline passing down */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-brand-cyan shadow-[0_0_6px_var(--color-primary)] opacity-80 animate-scanline transition-all duration-500 z-20 pointer-events-none" />
              
              {/* Default HUD Content */}
              <div className="flex flex-col items-center justify-center gap-1 transition-all duration-500 group-hover:opacity-0 group-hover:scale-95 z-10">
                <div className="w-10 h-10 border border-brand-cyan/40 flex items-center justify-center rounded-sm bg-brand-cyan/5 relative transition-all duration-500">
                  <FiSettings className="text-brand-cyan text-lg animate-spin-slow transition-all duration-500" />
                  <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-brand-cyan transition-all duration-500" />
                  <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-brand-cyan transition-all duration-500" />
                </div>
                <span className="font-orbitron font-bold text-slate-200 text-xs mt-1">{isRed ? "CHITTI_CORE_v3.0" : "ABI_SYSTEM_v2.0"}</span>
                <span className="font-tech text-[8px] text-slate-500 tracking-widest font-bold">ABINESH A // CORE</span>
                <div className={`flex gap-1 items-center text-[7px] font-tech transition-colors duration-500 ${isRed ? 'text-brand-cyan' : 'text-brand-green'}`}>
                  <span className={`w-1 h-1 rounded-full animate-ping transition-colors duration-500 ${isRed ? 'bg-brand-cyan' : 'bg-brand-green'}`} />
                  <span>{isRed ? 'OVERRIDE: ACTIVE' : 'SYNC: 100%'}</span>
                </div>
              </div>

              {/* Profile Image on Hover */}
              <img 
                src={profileImg} 
                alt="Abinesh A" 
                className="absolute inset-0 w-full h-full object-cover rounded-full opacity-0 scale-110 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 z-0"
              />

              {/* Futuristic Holographic Overlay tint */}
              <div className="absolute inset-0 bg-brand-cyan/20 mix-blend-color opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-darker/60 via-transparent to-brand-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
            </div>

            {/* Crosshair Brackets around core */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-cyan transition-colors duration-500" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-cyan transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-brand-cyan transition-colors duration-500" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-brand-cyan transition-colors duration-500" />
          </div>

          {/* Floating HUD Telemetry Stats surrounding the Hologram */}
          <div className="absolute -top-3 left-0 sm:-left-6 font-tech text-[9px] text-slate-500 flex flex-col gap-0.5 border-l border-brand-cyan/20 pl-2 transition-colors duration-500">
            <span className="text-[7px] text-brand-cyan font-bold uppercase tracking-wider transition-colors duration-500">METRICS_A // STATS</span>
            <span className="flex items-center gap-1 text-slate-400">PROJECTS_BUILT: <CountUp end={2} suffix="+" /></span>
            <span className="flex items-center gap-1 text-slate-400">TECHNOLOGIES: <CountUp end={6} suffix="+" /></span>
          </div>

          <div className="absolute bottom-0 right-0 sm:-right-6 font-tech text-[9px] text-slate-500 flex flex-col items-end gap-0.5 border-r border-brand-red/20 pr-2 transition-colors duration-500">
            <span className="text-[7px] text-brand-red font-bold uppercase tracking-wider transition-colors duration-500">METRICS_B // STATE</span>
            <span>AI_DOMAINS: EXPLORED</span>
            <span className={isRed ? 'text-brand-red animate-pulse' : 'text-slate-400'}>LEARNING_MODE: ACTIVE</span>
          </div>
        </div>

      </div>

      {/* Grid Tech Bottom Divider */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800/80 to-transparent" />
    </section>
  );
}
