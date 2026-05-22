import React from 'react';
import { motion } from 'framer-motion';
import HudBorder from '../components/HudBorder';
import { useTheme } from '../context/ThemeContext';
import { FiCode, FiLayers, FiActivity, FiCpu, FiDatabase } from 'react-icons/fi';

const SKILL_CATEGORIES = [
  {
    blueTitle: "Programming Modules",
    redTitle: "CYBER_LINGUA_ENGINES",
    icon: <FiCode className="transition-colors duration-500" />,
    skills: [
      { name: "Python", level: 82 },
      { name: "JavaScript", level: 50, status: "Learning" },
      { name: "C", level: 55 }
    ]
  },
  {
    blueTitle: "Frontend Interfaces",
    redTitle: "TACTICAL_UI_SYSTEMS",
    icon: <FiLayers className="transition-colors duration-500" />,
    skills: [
      { name: "HTML5", level: 85 },
      { name: "CSS", level: 78 },
      { name: "React", level: 65 }
    ]
  },
  {
    blueTitle: "AI & Machine Learning",
    redTitle: "COMBAT_NEURAL_CORES",
    icon: <FiCpu className="transition-colors duration-500" />,
    skills: [
      { name: "Machine Learning Basics", level: 70 },
      { name: "Anomaly Detection", level: 68 },
      { name: "Fraud Detection Systems", level: 62 }
    ]
  },
  {
    blueTitle: "Database Repositories",
    redTitle: "SECURE_LEDGER_DATA",
    icon: <FiDatabase className="transition-colors duration-500" />,
    skills: [
      { name: "SQL / Queries", level: 75 },
      { name: "MongoDB", level: 40, status: "Learning" }
    ]
  },
  {
    blueTitle: "Developer Utilities",
    redTitle: "WAR_KIT_UTILITIES",
    icon: <FiActivity className="transition-colors duration-500" />,
    skills: [
      { name: "Git / Versioning", level: 78 },
      { name: "VS Code Core", level: 82 }
    ]
  }
].map(category => ({
  ...category,
  avgLevel: Math.round(category.skills.reduce((acc, s) => acc + s.level, 0) / category.skills.length)
}));

export default function Skills() {
  const { themeMode } = useTheme();
  const isRed = themeMode === 'red';

  return (
    <section id="skills" className="scroll-mt-24 py-16 px-6 relative max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-8">
        
        {/* Section Heading */}
        <div className="flex items-center gap-4 select-none">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-brand-cyan/20 transition-colors duration-500" />
          <h2 className="font-orbitron text-2xl font-bold tracking-widest text-brand-cyan text-glow-primary uppercase transition-all duration-500">
            {isRed ? "02 // TACTICAL_COMBAT_CORES" : "02 // SKILLS_COGNITIVE_ARRAY"}
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-brand-cyan/20 transition-colors duration-500" />
        </div>
 
        {/* Global Skill Matrix Container with Scanner Overlay */}
        <div className="relative border border-slate-900/60 rounded-md bg-brand-darker/25 p-6 overflow-hidden shadow-inner group">
          {/* Hologram Grid background */}
          <div className="absolute inset-0 tech-grid-bg opacity-20 pointer-events-none transition-all duration-500" />
          
          {/* Dynamic Scanner Beam */}
          <div className="ai-scanner-beam" />
 
          {/* Grid Layout (3-col on lg, 2-col on md, 1-col on sm) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {SKILL_CATEGORIES.map((category, catIdx) => {
              const activeTitle = isRed ? category.redTitle : category.blueTitle;
              const avgLevel = category.avgLevel;
              
              return (
                <HudBorder 
                  key={catIdx} 
                  title={isRed ? `SUB_UNIT // 0${catIdx + 1}` : `MODULE_INDEX // 0${catIdx + 1}`} 
                  status={isRed ? "ARMED" : "READY"}
                  className="hologram-card-hover hover:border-brand-cyan/40 transition-all duration-350 flex flex-col justify-between"
                >
                  <div className="flex flex-col gap-5 py-2 h-full justify-between">
                    
                    <div>
                      {/* Category Header */}
                      <div className="flex items-center gap-3 border-b border-slate-800/40 pb-2 mb-4">
                        <motion.div 
                          whileHover={{ scale: 1.15, rotate: isRed ? [0, -5, 5, 0] : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-lg bg-brand-cyan/5 p-2 border border-brand-cyan/25 rounded text-brand-cyan transition-colors duration-500 shadow-hud-inset"
                        >
                          {category.icon}
                        </motion.div>
                        <h3 className="font-orbitron text-[11px] sm:text-xs font-bold tracking-widest text-slate-100 uppercase transition-all duration-500">
                          {activeTitle}
                        </h3>
                      </div>
 
                      {/* Skill List with Holographic Percentages */}
                      <div className="flex flex-col gap-4">
                        {category.skills.map((skill, skillIdx) => (
                          <div key={skillIdx} className="flex flex-col gap-1.5 font-tech">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-slate-200 uppercase tracking-widest">{skill.name}</span>
                              <span className="text-brand-cyan font-bold transition-colors duration-500">
                                {skill.status ? skill.status.toUpperCase() : `${skill.level}%`}
                              </span>
                            </div>
                            
                            {/* Holographic percentage bar */}
                            <div className="relative w-full h-2.5 bg-brand-darker border border-slate-800 rounded-sm overflow-hidden p-[1px] transition-colors duration-500">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.4, ease: isRed ? "circOut" : "easeInOut" }}
                                className={`h-full bg-gradient-to-r from-brand-blue to-brand-cyan rounded-sm shadow-[0_0_8px_rgba(var(--color-primary-rgb),0.55)] relative transition-all duration-500 ${
                                  isRed ? 'animate-pulse-glow' : ''
                                }`}
                              >
                                {/* Segment lines inside loader bar */}
                                <div 
                                  className="absolute inset-0 bg-transparent opacity-25" 
                                  style={{
                                    backgroundImage: 'linear-gradient(90deg, transparent 85%, rgba(3,5,8,1) 85%)',
                                    backgroundSize: '8px 100%'
                                  }}
                                />
                              </motion.div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
 
                    {/* Subsystem Telemetry Details */}
                    <div className="flex justify-between items-center text-[8px] font-tech text-slate-500 mt-4 border-t border-slate-800/30 pt-2 select-none">
                      <span>ALLOC_MEM: {avgLevel * 16}MB // SYST_LOAD: {Math.round(avgLevel * 0.9)}%</span>
                      <span className={isRed ? "text-brand-cyan font-bold animate-pulse" : "text-slate-400"}>
                        {isRed ? "COMBAT_SUB_SYS_OK" : "ASSIST_CORE_STABLE"}
                      </span>
                    </div>
 
                  </div>
                </HudBorder>
              );
            })}
          </div>
        </div>
 
      </div>
    </section>
  );
}
