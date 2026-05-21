import React, { useState, useEffect } from 'react';
import TechGrid from '../components/TechGrid';
import ParticlesBg from '../components/ParticlesBg';
import { useTheme } from '../context/ThemeContext';
import CustomCursor from '../components/CustomCursor';

export default function MainLayout({ children }) {
  const { themeMode } = useTheme();
  const [hudActive, setHudActive] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    setGlitchActive(true);
    const timer = setTimeout(() => setGlitchActive(false), 450);
    return () => clearTimeout(timer);
  }, [themeMode]);

  const isRed = themeMode === 'red';

  return (
    <div className="relative min-h-screen w-full bg-brand-darker text-slate-100 overflow-hidden font-inter">
      {/* Custom Holographic / Reticle Cursor */}
      <CustomCursor />

      {/* Cinematic Glitch Flash on theme change */}
      {glitchActive && <div className="cyber-glitch-flash" />}
      {/* Scanline FX */}
      <div className="scanline-overlay" />
      <div className="scanline-light" />

      {/* Hologram Static Noise */}
      <div className="absolute inset-0 holo-noise" />

      {/* Ambient Moving Grid and Particle Network */}
      <TechGrid />
      <ParticlesBg />

      {/* Ambient Sci-fi HUD Elements around the screen edges */}
      {hudActive && (
        <div className="hidden lg:block select-none pointer-events-none transition-all duration-500">
          {/* Top-left Telemetry */}
          <div className="fixed top-4 left-6 z-40 font-tech text-[9px] text-brand-cyan/40 flex flex-col gap-0.5">
            <span>SYS_LOC // {isRed ? 'ENTHIRAN_OS_v2.0_SECURE_RED' : 'ENTHIRAN_OS_v2.0_ASSIST_BLUE'}</span>
            <span>MEMRISTOR_SYNC: {isRed ? '100% [MAX_OUTPUT]' : '99.87% [STABLE]'}</span>
            <span>SECTOR: {isRed ? '0x8F-B43 // MILITARY_LOCK' : '0x8F-B43 // CORE'}</span>
          </div>

          {/* Top-right Telemetry */}
          <div className="fixed top-4 right-6 z-40 font-tech text-[9px] text-brand-cyan/40 flex flex-col items-end gap-0.5">
            <span>NET_PING: {isRed ? '8ms (DIRECT)' : '14ms (OPTIMAL)'}</span>
            <span>SECURE_SHELL: {isRed ? 'ENCRYPTED_RED_ALERT' : 'ACTIVE_SECURE'}</span>
            <span>THERMAL: {isRed ? '41°C [UNDER_LOAD]' : '34°C [OPTIMAL]'}</span>
          </div>

          {/* Bottom-left Status Bar */}
          <div className="fixed bottom-4 left-6 z-40 font-tech text-[9px] text-brand-cyan/40 flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full animate-ping ${isRed ? 'bg-brand-red' : 'bg-brand-green'}`} />
              CORES: 8/8 ONLINE
            </span>
            <span>|</span>
            <span>THREAT_LEVEL: {isRed ? 'ALERT_MONITOR_ACTIVE' : 'ZERO'}</span>
          </div>

          {/* Bottom-right Diagnostic Sweep */}
          <div className="fixed bottom-4 right-6 z-40 font-tech text-[9px] text-brand-cyan/40 flex flex-col items-end gap-0.5">
            <span>CHITTI_CORE_FREQ: {isRed ? '3.2 PetaFlops' : '2.4 PetaFlops'}</span>
            <span>BATTERY: {isRed ? '92% [DRAINING_FAST]' : '98% [VOLTAGE_STABLE]'}</span>
          </div>
        </div>
      )}

      {/* Main content wrapper */}
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {children}
      </div>

      {/* Ambient Overlay Glitch Flash Grid */}
      <div className="absolute inset-0 bg-brand-cyan/[0.005] pointer-events-none" />
    </div>
  );
}
