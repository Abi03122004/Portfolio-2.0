import React from 'react';
import { motion } from 'framer-motion';
import HudBorder from '../components/HudBorder';
import { useTheme } from '../context/ThemeContext';
import { FiCheck, FiCpu, FiTrendingUp } from 'react-icons/fi';

const TIMELINE_ENTRIES = [
  {
    milestone: "Started AIML Engineering",
    blueDate: "ACADEMIC SYSTEM INIT",
    redDate: "DEPLOYMENT_VECTOR_INIT",
    desc: "Began foundational coursework in Artificial Intelligence & Machine learning, math modules, and calculus logic.",
    blueStatus: "COMPLETED",
    redStatus: "SECURED",
    color: "primary"
  },
  {
    milestone: "Learning Python & SQL",
    blueDate: "DATA CORE ACQUISITION",
    redDate: "CORE_ALGO_HARVEST",
    desc: "Acquired database engineering algorithms and scripting methods. Built database architectures and automation scripts.",
    blueStatus: "COMPLETED",
    redStatus: "SECURED",
    color: "primary"
  },
  {
    milestone: "Built ML Security Projects",
    blueDate: "APPLICATION IMPLEMENTATION",
    redDate: "TACTICAL_SHIELD_DEPLOY",
    desc: "Engineered Network Anomaly Detection pipelines and transaction auditors using statistical models.",
    blueStatus: "COMPLETED",
    redStatus: "SECURED",
    color: "primary"
  },
  {
    milestone: "Exploring Full Stack Development",
    blueDate: "NEURAL NODE NETWORKING",
    redDate: "GRID_TRANSCEIVER_TEST",
    desc: "Studying Web API frameworks, responsive layouts, client integrations, and high-performance server structures.",
    blueStatus: "ACTIVE",
    redStatus: "ARMING",
    color: "primary"
  },
  {
    milestone: "Learning Cloud & AI Systems",
    blueDate: "INFRASTRUCTURE SCALING",
    redDate: "ORBITAL_CLUSTER_NET",
    desc: "Delving into cloud deployment strategies, remote virtual clusters, and scaling complex neural network systems.",
    blueStatus: "PENDING",
    redStatus: "OFFLINE",
    color: "red"
  }
];

export default function Experience() {
  const { themeMode } = useTheme();
  const isRed = themeMode === 'red';

  return (
    <section id="experience" className="scroll-mt-24 py-16 px-6 relative max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-8">
        
        {/* Section Heading */}
        <div className="flex items-center gap-4 select-none">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-brand-cyan/20 transition-colors duration-500" />
          <h2 className="font-orbitron text-2xl font-bold tracking-widest text-brand-cyan text-glow-primary uppercase transition-all duration-500">
            {isRed ? "04 // TACTICAL_TIMELINE_LOGS" : "04 // EXPERIENCE_TIME_LOGS"}
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-brand-cyan/20 transition-colors duration-500" />
        </div>

        {/* High-Tech Vertical Timeline */}
        <div className="relative max-w-3xl mx-auto w-full mt-6">
          
          {/* Main vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-brand-cyan/40 via-brand-cyan/15 to-transparent transform -translate-x-1/2 select-none transition-colors duration-500" />

          {/* Timeline Nodes */}
          <div className="flex flex-col gap-10">
            {TIMELINE_ENTRIES.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const activeDate = isRed ? item.redDate : item.blueDate;
              const activeStatus = isRed ? item.redStatus : item.blueStatus;
              
              const isCompleted = activeStatus === 'COMPLETED' || activeStatus === 'SECURED';
              const isPending = activeStatus === 'PENDING' || activeStatus === 'OFFLINE';
              
              return (
                <div 
                  key={idx} 
                  className={`flex flex-col sm:flex-row items-start justify-between w-full relative pl-10 sm:pl-0 ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Central Node Indicator Tick */}
                  <div className="absolute left-4 sm:left-1/2 top-1 transform -translate-x-1/2 z-20 flex items-center justify-center select-none">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      className={`w-8 h-8 rounded-full border bg-brand-darker flex items-center justify-center transition-colors duration-500 ${
                        isCompleted 
                          ? 'border-brand-cyan shadow-cyan-glow text-brand-cyan' 
                          : isPending 
                            ? 'border-brand-red/40 text-brand-red/55' 
                            : 'border-brand-cyan/50 text-brand-cyan animate-pulse'
                      }`}
                    >
                      {isCompleted ? (
                        <FiCheck size={12} />
                      ) : isPending ? (
                        <span className="text-[7px] font-bold">X</span>
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-brand-cyan animate-ping transition-colors duration-500" />
                      )}
                    </motion.div>
                  </div>

                  {/* Left or Right Spacer for Desktop Alignment */}
                  <div className="hidden sm:block w-[45%]" />

                  {/* Timeline Card Frame */}
                  <div className="w-full sm:w-[45%]">
                    <HudBorder 
                      title={activeDate} 
                      status={activeStatus} 
                      color={isPending ? 'red' : 'primary'}
                      className="hover:border-brand-cyan/45 transition-colors duration-500"
                    >
                      <div className="flex flex-col gap-2 font-inter">
                        <h4 className="font-orbitron font-extrabold text-sm sm:text-base text-slate-100 tracking-wider">
                          {item.milestone}
                        </h4>
                        
                        <p className="text-slate-400 text-xs leading-relaxed font-light">
                          {item.desc}
                        </p>
                        
                        <div className="flex justify-between items-center text-[9px] font-tech text-slate-500 mt-2 border-t border-slate-800/60 pt-2 transition-colors duration-500">
                          <span>STEP_ID: 0{idx + 1}</span>
                          <span className={isCompleted ? 'text-brand-cyan transition-colors duration-500' : isPending ? 'text-brand-red transition-colors duration-500' : 'text-brand-cyan animate-pulse transition-colors duration-500'}>
                            [{activeStatus}]
                          </span>
                        </div>
                      </div>
                    </HudBorder>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
