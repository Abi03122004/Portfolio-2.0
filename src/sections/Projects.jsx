import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HudBorder from '../components/HudBorder';
import { useTheme } from '../context/ThemeContext';
import { FiCpu, FiAlertTriangle, FiActivity, FiArrowRight, FiCheckCircle, FiX } from 'react-icons/fi';
import { soundEngine } from '../utils/soundEngine';

const PROJECTS_LIST = [
  {
    title: "Network Anomaly Detection System",
    category: "Machine Learning / Cybersecurity",
    description: "An intelligent system designed to identify unusual network behavior and detect suspicious activities using machine learning concepts.",
    status: "ACTIVE",
    color: "cyan",
    theme: "Cybersecurity AI Lab Interface",
    objective: "To develop an intelligent, real-time intrusion and packet anomaly identification firewall utilizing state-of-the-art machine learning classification algorithms.",
    workflow: [
      "Capture live network packet flows via interface socket binds.",
      "Preprocess packet metadata, payload entropy, and rate metrics.",
      "Evaluate processed streams through pre-trained machine learning classification models.",
      "Log abnormal signatures and automatically generate firewall drop rules for flagged source hashes."
    ],
    technologies: ["Python", "Scikit-Learn", "Wireshark Core API", "Pandas", "Flask REST API"],
    futureUpgrades: [
      "Integrate recurrent neural networks (LSTM) for temporal correlation checks.",
      "Deploy eBPF kernel space filters for line-rate packet drops without context switches."
    ],
    features: [
      "Network traffic monitoring & auditing",
      "Suspicious activity classification",
      "Statistical pattern analysis of payloads",
      "Alert visualization & terminal outputs"
    ],
    terminalLogs: [
      "SYS_MONITOR: LISTENING ON PORT 80/443...",
      "TRAFFIC_STREAM: PACKET DENSITY 412kb/s",
      "MODEL_EXEC: INFERENCE TIME 0.08ms",
      "PREDICTION: NORMAL (CONFIDENCE 99.4%)",
      "WARN: SECTOR_09 DETECTED BURST PACKETS (FLAGGED)",
    ]
  },
  {
    title: "Blockchain Fraud Detection",
    category: "AI Security / Fraud Analysis",
    description: "A blockchain-focused fraud detection system designed to identify suspicious transaction patterns and improve security analysis.",
    status: "EXPERIMENTAL",
    color: "red",
    theme: "Encrypted Blockchain Terminal Visuals",
    objective: "To audit and inspect distributed ledger operations, profiling gas limits and transaction hashes to predict loop vulnerabilities and fraudulent token movement.",
    workflow: [
      "Establish connection to live RPC blockchain nodes.",
      "Ingest transaction block records and trace contract gas usages.",
      "Apply graph analysis tools to detect circular transaction loops and mixing patterns.",
      "Compute anomaly score and output threat vectors to security operations panels."
    ],
    technologies: ["NodeJS / React", "Ethers.js Core", "NetworkX Graph Suite", "MongoDB", "Tailwind CSS"],
    futureUpgrades: [
      "Support smart contract execution state audits inside memory pools (mempool diagnostics).",
      "Integrate cross-chain ledger tracing algorithms."
    ],
    features: [
      "Fraud pattern detection on ledger hashes",
      "Transaction flow graphing & profiling",
      "Security monitoring on smart contract gas",
      "Intelligent detection anomaly workflow"
    ],
    terminalLogs: [
      "LEDGER_STREAM: CONNECTED TO NODE_G32...",
      "BLOCKCHAIN_SYNC: HEAD BLOCK 892,109",
      "HASH_SCAN: 0x98FF...92A1 AUDITED",
      "WARN: SUSPICIOUS GAS LOOP DETECTED IN TRANS_0x4F",
      "RESULT: FLAG_FRAUD (ANOMALY SCORE: 0.87)",
    ]
  }
];

export default function Projects() {
  const { themeMode } = useTheme();
  const isRed = themeMode === 'red';
  const [activeProjectIdx, setActiveProjectIdx] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="scroll-mt-24 py-16 px-6 relative max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-8">
        
        {/* Section Heading */}
        <div className="flex items-center gap-4 select-none">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-brand-cyan/20 transition-colors duration-500" />
          <h2 className="font-orbitron text-2xl font-bold tracking-widest text-brand-cyan text-glow-primary uppercase transition-all duration-500">
            {isRed ? "03 // SECURE_TACTICAL_DOSSIERS" : "03 // PROJECTS_SUBROUTINES"}
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-brand-cyan/20 transition-colors duration-500" />
        </div>
 
        {/* Projects Dossier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS_LIST.map((project, idx) => {
            const isCyan = project.color === 'cyan';
            const isExpanded = activeProjectIdx === idx;
            
            return (
              <HudBorder 
                key={idx}
                title={project.category}
                status={project.status}
                color={isRed ? 'primary' : project.color}
                className="flex flex-col h-full hologram-card-hover hover:border-brand-cyan/40"
              >
                <div className="flex flex-col gap-4 py-2 h-full justify-between">
                  
                  {/* Project Info */}
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-orbitron text-base sm:text-lg font-extrabold tracking-wider text-slate-100">
                        {project.title}
                      </h3>
                      
                      <span className={`font-tech text-[9px] px-2 py-0.5 border rounded shrink-0 select-none ${
                        (isRed || isCyan) 
                          ? 'border-brand-cyan/40 text-brand-cyan bg-brand-cyan/5 shadow-cyan-glow' 
                          : 'border-brand-red/40 text-brand-red bg-brand-red/5 shadow-red-glow'
                      }`}>
                        [ {project.status} ]
                      </span>
                    </div>
 
                    <span className="font-tech text-[8px] text-slate-500 uppercase tracking-widest select-none">
                      {isRed ? "SECURE_HASH // SHIELD_LOG" : `THEME: ${project.theme}`}
                    </span>
 
                    <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                      {project.description}
                    </p>
 
                    {/* Features List */}
                    <div className="flex flex-col gap-2 mt-2">
                      <h4 className="font-tech text-[10px] text-slate-400 font-bold uppercase tracking-wider select-none">
                        {isRed ? "TACTICAL_DEFENSE_VECTORS:" : "Engineered Subroutines:"}
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
                        {project.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-1.5 font-light">
                            <FiCheckCircle className={(isRed || isCyan) ? 'text-brand-cyan shrink-0' : 'text-brand-red shrink-0'} size={12} />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
 
                  {/* Diagnostic Console Panel (Interactive element) */}
                  <div className="mt-6 flex flex-col gap-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          soundEngine.playClick();
                          setActiveProjectIdx(isExpanded ? null : idx);
                        }}
                        onMouseEnter={() => soundEngine.playHover()}
                        className={`w-full py-2 border font-tech text-[10px] tracking-widest uppercase rounded flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                          (isRed || isCyan)
                            ? 'border-brand-cyan/20 hover:border-brand-cyan/55 text-brand-cyan hover:bg-brand-cyan/5'
                            : 'border-brand-red/20 hover:border-brand-red/55 text-brand-red hover:bg-brand-red/5'
                        }`}
                      >
                        <span>{isExpanded ? 'CLOSE_DIAGNOSTICS' : 'EXECUTE_DIAGNOSTICS'}</span>
                        <FiActivity className={isExpanded ? 'animate-pulse' : ''} />
                      </button>

                      <button
                        onClick={() => {
                          soundEngine.playClick();
                          setSelectedProject(project);
                        }}
                        onMouseEnter={() => soundEngine.playHover()}
                        className={`w-full py-2 border font-tech text-[10px] tracking-widest uppercase rounded flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                          (isRed || isCyan)
                            ? 'border-brand-cyan/40 hover:border-brand-cyan text-brand-cyan bg-brand-cyan/5 hover:shadow-cyan-glow'
                            : 'border-brand-red/40 hover:border-brand-red text-brand-red bg-brand-red/5 hover:shadow-red-glow'
                        }`}
                      >
                        <span>DESCRIPTION</span>
                        <FiCpu />
                      </button>
                    </div>
 
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden bg-brand-darker/70 border border-slate-900 rounded p-3 font-mono text-[9px] text-slate-400 flex flex-col gap-1 mt-1 shadow-inner select-none"
                        >
                          <div className="flex justify-between items-center text-slate-500 border-b border-slate-900 pb-1 mb-1.5">
                            <span>SESSION_ID: #{10892 + idx}</span>
                            <span className="text-brand-cyan font-bold animate-pulse">
                              {isRed ? "TACTICAL_LOGS // RED_PROTOCOL" : "SIMULATION ONLINE"}
                            </span>
                          </div>
                          {project.terminalLogs.map((log, lIdx) => (
                            <div key={lIdx} className="flex gap-1.5 items-start">
                              <span className="text-brand-cyan">&gt;</span>
                              <span className={log.includes("WARN") ? "text-brand-yellow font-medium" : ""}>{log}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
 
                </div>
              </HudBorder>
            );
          })}
        </div>
 
        {/* Classified Project Dossier Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-darker/80 backdrop-blur-md">
              {/* Modal Box */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="relative w-full max-w-2xl bg-brand-dark/95 border border-brand-cyan/30 rounded-lg p-6 sm:p-8 shadow-cyan-glow-lg overflow-y-auto max-h-[85vh] scrollbar-thin font-tech"
              >
                {/* Scanline and Hologram grid */}
                <div className="absolute inset-0 tech-grid-bg opacity-10 pointer-events-none" />
                <div className="scanline-overlay opacity-25" />

                {/* Close Button */}
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedProject(null);
                  }}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="absolute top-4 right-4 p-1.5 border border-brand-cyan/20 hover:border-brand-cyan text-brand-cyan hover:bg-brand-cyan/10 rounded transition-colors cursor-pointer"
                >
                  <FiX size={16} />
                </button>

                {/* Header */}
                <div className="flex flex-col gap-2 border-b border-brand-cyan/20 pb-4 mb-5">
                  <div className="flex items-center gap-2 text-brand-cyan text-[10px] tracking-widest uppercase select-none">
                    <FiCpu className="animate-pulse" />
                    <span>CLASSIFIED DOSSIER // DECRYPT_SUCCESS</span>
                  </div>
                  <h3 className="font-orbitron text-xl sm:text-2xl font-extrabold tracking-widest text-slate-100 uppercase">
                    {selectedProject.title}
                  </h3>
                  <span className="text-[10px] text-slate-500 tracking-widest">
                    DECRYPTED ON: {new Date().toLocaleDateString()} // AUTH_LEVEL: CHITTI_ADMIN
                  </span>
                </div>

                {/* Content sections */}
                <div className="flex flex-col gap-6 text-xs sm:text-sm text-slate-350">
                  {/* Objective */}
                  <div className="flex flex-col gap-2">
                    <h4 className="text-brand-cyan font-bold tracking-widest uppercase border-l-2 border-brand-cyan pl-2">
                      01 // PROJECT OBJECTIVE
                    </h4>
                    <p className="font-light leading-relaxed pl-3 border-l border-slate-800">
                      {selectedProject.objective}
                    </p>
                  </div>

                  {/* Workflow */}
                  <div className="flex flex-col gap-2">
                    <h4 className="text-brand-cyan font-bold tracking-widest uppercase border-l-2 border-brand-cyan pl-2">
                      02 // SYSTEM WORKFLOW
                    </h4>
                    <ol className="list-decimal list-inside pl-3 border-l border-slate-800 flex flex-col gap-1.5 font-light">
                      {selectedProject.workflow.map((step, sIdx) => (
                        <li key={sIdx} className="leading-relaxed">
                          <span className="text-slate-100">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Technologies Stacked */}
                  <div className="flex flex-col gap-2">
                    <h4 className="text-brand-cyan font-bold tracking-widest uppercase border-l-2 border-brand-cyan pl-2">
                      03 // TECHNOLOGIES STACKED
                    </h4>
                    <div className="flex flex-wrap gap-2 pl-3 border-l border-slate-800">
                      {selectedProject.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 border border-slate-800 bg-brand-darker/60 rounded text-[10px] font-mono tracking-wider text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Future Vector Upgrades */}
                  <div className="flex flex-col gap-2">
                    <h4 className="text-brand-cyan font-bold tracking-widest uppercase border-l-2 border-brand-cyan pl-2">
                      04 // FUTURE VECTOR UPGRADES
                    </h4>
                    <ul className="list-disc list-inside pl-3 border-l border-slate-800 flex flex-col gap-1.5 font-light">
                      {selectedProject.futureUpgrades.map((upgrade, uIdx) => (
                        <li key={uIdx} className="leading-relaxed">
                          <span>{upgrade}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer / Classified Notice */}
                <div className="mt-8 border-t border-brand-cyan/20 pt-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] text-slate-500 select-none">
                  <span className="flex items-center gap-1">
                    <FiAlertTriangle className="text-brand-yellow" />
                    CLASSIFIED INFORMATION // SECURITY PROTOCOL SHIELD ON
                  </span>
                  <span className="text-brand-cyan font-bold">ABI_SYSTEM_v2.9</span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
 
      </div>
    </section>
  );
}
