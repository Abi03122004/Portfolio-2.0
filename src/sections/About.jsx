import React from 'react';
import { motion } from 'framer-motion';
import HudBorder from '../components/HudBorder';
import { useTheme } from '../context/ThemeContext';
import { FiBookOpen, FiEye, FiShield, FiCpu, FiTrendingUp } from 'react-icons/fi';

const CORE_INTERESTS = [
  { icon: <FiCpu className="text-brand-cyan transition-colors duration-500" />, text: "Machine Learning Basics & Architectures" },
  { icon: <FiShield className="text-brand-red transition-colors duration-500" />, text: "Cybersecurity & Fraud Detection Systems" },
  { icon: <FiEye className="text-brand-cyan transition-colors duration-500" />, text: "Futuristic AI Interfaces & Full-Stack Systems" },
  { icon: <FiTrendingUp className="text-brand-green transition-colors duration-500" />, text: "Building Real-World Intelligent Applications" }
];

export default function About() {
  const { themeMode } = useTheme();
  const isRed = themeMode === 'red';

  return (
    <section id="about" className="scroll-mt-24 py-16 px-6 relative max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-8">
        
        {/* Section Heading */}
        <div className="flex items-center gap-4 select-none">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-brand-cyan/20 transition-colors duration-500" />
          <h2 className="font-orbitron text-2xl font-bold tracking-widest text-brand-cyan text-glow-primary uppercase transition-all duration-500">
            {isRed ? "01 // TACTICAL_SEC_PROFILE" : "01 // ABOUT_SYS_PROFILE"}
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-brand-cyan/20 transition-colors duration-500" />
        </div>
 
        {/* Content Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Bio Panel */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <HudBorder title={isRed ? "SECURITY_COMMAND_LOG" : "BIOGRAPHY_LOG"} status={isRed ? "CRITICAL_ALERT" : "ONLINE"} color="primary" className="h-full">
              <div className="flex flex-col gap-4 py-2 font-inter text-slate-300 text-sm leading-relaxed">
                <p>
                  Hi, I’m <strong className="text-brand-cyan transition-colors duration-500">Abinesh A</strong> — an AIML engineering student passionate about intelligent systems, machine learning, cybersecurity and AI. I enjoy building smart applications focused on anomaly detection, fraud analysis, and modern AI-powered user experiences while continuously exploring new technologies and innovative system designs.
                </p>
                
                <h4 className="font-orbitron font-bold text-xs tracking-wider text-slate-200 uppercase mt-4 mb-2">
                  {isRed ? "TACTICAL SUBSYSTEM VECTORS" : "Core Vectors of Interest"}
                </h4>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CORE_INTERESTS.map((interest, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-400 bg-brand-darker/40 p-2.5 border border-slate-900 rounded hover:border-brand-cyan/40 hover:scale-[1.02] transition-all duration-300">
                      <span className="mt-0.5">{interest.icon}</span>
                      <span>{interest.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </HudBorder>
          </div>
 
          {/* Education & Info Panel */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <HudBorder title={isRed ? "TACTICAL_CORE_DB" : "EDUCATION_CREDENTIALS"} status={isRed ? "DECRYPTED_OK" : "VERIFIED"} color="primary" className="h-full">
              <div className="flex flex-col gap-6 py-2">
                <div className="flex gap-4 items-start">
                  <div className="p-3 border border-brand-cyan/30 bg-brand-cyan/5 rounded text-brand-cyan transition-all duration-500 shadow-cyan-glow">
                    {isRed ? <FiShield size={20} className="animate-pulse" /> : <FiBookOpen size={20} />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-tech text-slate-500 uppercase tracking-widest">{isRed ? "REGISTRY VECTOR" : "Degree Program"}</span>
                    <h4 className="font-orbitron font-bold text-sm text-slate-200 mt-0.5">
                      BTech Artificial Intelligence and Machine Learning
                    </h4>
                    <p className="text-xs text-slate-400 mt-2 font-medium">
                      Sri Shakthi Institute of Engineering and Technology
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-[9px] font-tech text-brand-cyan bg-brand-cyan/5 border border-brand-cyan/20 px-2 py-0.5 w-fit rounded transition-all duration-500 shadow-hud-inset">
                      <span>STATUS: {isRed ? "ACTIVE_DECRYPT // IN_PROGRESS" : "IN_PROGRESS"}</span>
                    </div>
                  </div>
                </div>
 
                <div className="border-t border-slate-800/60 pt-4 flex flex-col gap-3 font-tech text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>HOST_IDENTITY:</span>
                    <span className="text-slate-200">ABINESH_A</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AFFILIATION:</span>
                    <span className="text-slate-200">SIET_COLLEGE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>COGNITIVE_MODE:</span>
                    <span className={isRed ? "text-brand-red animate-pulse font-bold" : "text-brand-green"}>
                      {isRed ? "HIGH_ALERT_THREAT_SYS" : "CONTINUOUS_LEARNING"}
                    </span>
                  </div>
                </div>
              </div>
            </HudBorder>
          </div>
 
        </div>
 
      </div>
    </section>
  );
}
