import React from 'react';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../sections/Navbar';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Experience from '../sections/Experience';
import Contact from '../sections/Contact';

export default function Dashboard() {
  const { themeMode } = useTheme();
  const isRed = themeMode === 'red';

  return (
    <div className="flex-1 flex flex-col">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Main Content Modules */}
      <main className="w-full flex flex-col gap-6 sm:gap-10 pb-20 relative z-10">
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Footer System HUD Info */}
      <footer className="border-t border-slate-900 bg-brand-darker/80 py-8 px-6 text-center select-none font-tech text-[10px] text-slate-600 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span>{isRed ? "CHITTI_CORE_OS // TACTICAL COMMAND CENTER v3.0.0" : "ABINESH SYSTEM // PORTFOLIO OPERATING SYSTEM v2.0.0"}</span>
            <span>DESIGNED BY ABINESH A // ALL REPLICANT SYNAPSES REGISTERED</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full animate-ping ${isRed ? 'bg-brand-cyan' : 'bg-brand-green'}`} />
              STATUS: {isRed ? 'RED_ALERT // OVERRIDE' : 'READY'}
            </span>
            <span>|</span>
            <span>{isRed ? 'POWER_DRAIN: HIGH (7.4V)' : 'SYSTEM VOLTAGE: NORMAL (5.2V)'}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
