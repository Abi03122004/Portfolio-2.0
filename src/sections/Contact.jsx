import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HudBorder from '../components/HudBorder';
import { useTheme } from '../context/ThemeContext';
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiSend, FiTerminal, FiX, FiDownload } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import { soundEngine } from '../utils/soundEngine';

const RED_LOGS_SEQUENCE = [
  "SEC_COM: INITIATING SECURE ENCRYPTED COMBAT TRANSPONDER...",
  "CIPHER_HASH: ENCRYPTING DATA WITH SHA-512...",
  "ALERT: DESTINATION RADAR NODE FOUND -> abinesharjunan850@gmail.com",
  "SIGNAL_DISPATCH: TRANSMITTING BEACON BURSTS...",
  "SYS_STAT: PING 6ms // PACKET_LOSS: 0% // CRYPTO_LOCKED",
  "DISPATCH_SUCCESS: TACTICAL MESSAGE TRANSMITTED."
];

const BLUE_LOGS_SEQUENCE = [
  "SYS_COM: ESTABLISHING SECURE TRANSPONDER LINK...",
  "ENCRYPTING PAYLOAD WITH SHA-256...",
  "HANDSHAKE: DESTINATION NODE [abinesharjunan850@gmail.com] FOUND",
  "BEACON SIGNAL: DISPATCHING DATA PACKETS...",
  "NET_STAT: PING 12ms // PACKET_LOSS: 0%",
  "TRANSMISSION COMPILED: MESSAGE DISPATCHED SUCCESSFULLY."
];

export default function Contact() {
  const { themeMode } = useTheme();
  const isRed = themeMode === 'red';

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [transmitting, setTransmitting] = useState(false);
  const [transmitLogs, setTransmitLogs] = useState([]);
  const [isSent, setIsSent] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [showMailModal, setShowMailModal] = useState(false);

  const logsSequence = isRed ? RED_LOGS_SEQUENCE : BLUE_LOGS_SEQUENCE;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleTransmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundEngine.playClick();

    if (!validateEmail(formData.email)) {
      setEmailError('INVALID_EMAIL_FORMAT');
      return;
    }
    setEmailError('');
    
    setTransmitting(true);
    setTransmitLogs([]);
    setIsSent(false);

    // Retrieve EmailJS configuration keys
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

    // Stream the transmission logs sequentially
    let currentLogIdx = 0;
    const interval = setInterval(() => {
      if (currentLogIdx < logsSequence.length - 1) {
        setTransmitLogs((prev) => [...prev, logsSequence[currentLogIdx]]);
        currentLogIdx++;
      } else {
        clearInterval(interval);

        if (serviceId && templateId && publicKey) {
          emailjs.send(
            serviceId,
            templateId,
            {
              from_name: formData.name,
              from_email: formData.email,
              message: formData.message,
              to_name: 'Abinesh A',
            },
            publicKey
          )
          .then(() => {
            setTransmitLogs((prev) => [...prev, logsSequence[logsSequence.length - 1]]);
            setTransmitting(false);
            setIsSent(true);
            setFormData({ name: '', email: '', message: '' });
          })
          .catch((err) => {
            console.error("EmailJS dispatch error:", err);
            setTransmitLogs((prev) => [
              ...prev,
              "ERROR: TRANSMISSION DISPATCH FAILURE.",
              `REASON: ${err.text || 'CONNECTION_TIMEOUT'}`
            ]);
            setTransmitting(false);
          });
        } else {
          // Mock sending fallback if credentials are unset
          setTimeout(() => {
            setTransmitLogs((prev) => [
              ...prev,
              "SYS_COM: [MOCK_LINK_ACTIVE] INJECTING SIMULATED TRANSPONDER...",
              logsSequence[logsSequence.length - 1]
            ]);
            setTransmitting(false);
            setIsSent(true);
            setFormData({ name: '', email: '', message: '' });
          }, 800);
        }
      }
    }, 450);
  };

  return (
    <section id="contact" className="scroll-mt-24 py-16 px-6 relative max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-8">
        
        {/* Section Heading */}
        <div className="flex items-center gap-4 select-none">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-brand-cyan/20 transition-colors duration-500" />
          <h2 className="font-orbitron text-2xl font-bold tracking-widest text-brand-cyan text-glow-primary uppercase transition-all duration-500">
            {isRed ? "05 // SECURE_TRANSMITTER_SIGNAL" : "05 // CONTACT_SIGNAL_LINK"}
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-brand-cyan/20 transition-colors duration-500" />
        </div>

        {/* Content Split: Left (Direct Signals), Right (Transmission Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Signal Targets (Info Card) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <HudBorder title="DIRECT_CONNECTION_PORTS" status="ONLINE" color="primary" className="h-full flex flex-col justify-between transition-colors duration-500">
              <div className="flex flex-col gap-6 py-2">
                <p className="text-slate-400 text-xs leading-relaxed font-light font-inter">
                  Direct telemetry signals can be dispatched to the host. Select an active communication port below to initiate transmission.
                </p>

                {/* Connection Channels */}
                <div className="flex flex-col gap-4 font-tech">
                  {/* Email */}
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      soundEngine.playClick();
                      setShowMailModal(true);
                    }}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="w-full text-left flex items-center gap-4 p-3 border border-slate-800 bg-brand-darker/60 rounded hover:border-brand-cyan/40 transition-colors duration-300 group cursor-pointer"
                  >
                    <div className="p-2 border border-brand-cyan/20 text-brand-cyan rounded bg-brand-cyan/5 group-hover:bg-brand-cyan group-hover:text-brand-dark transition-all duration-500">
                      <FiMail size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] text-slate-500 tracking-widest uppercase">Email Transceiver</span>
                      <span className="text-xs text-slate-200 font-bold group-hover:text-brand-cyan transition-colors">
                        abinesharjunan850@gmail.com
                      </span>
                    </div>
                  </button>

                  {/* Mobile Phone */}
                  <a 
                    href="tel:7339518590"
                    onClick={() => soundEngine.playClick()}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="flex items-center gap-4 p-3 border border-slate-800 bg-brand-darker/60 rounded hover:border-brand-cyan/40 transition-colors duration-300 group"
                  >
                    <div className="p-2 border border-brand-cyan/20 text-brand-cyan rounded bg-brand-cyan/5 group-hover:bg-brand-cyan group-hover:text-brand-dark transition-all duration-500">
                      <FiPhone size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] text-slate-500 tracking-widest uppercase">Phone / Voice Line</span>
                      <span className="text-xs text-slate-200 font-bold group-hover:text-brand-cyan transition-colors">
                        +91 73395 18590
                      </span>
                    </div>
                  </a>
                </div>

                {/* Social Network Nodes */}
                <div className="flex flex-col gap-2 mt-4 font-tech">
                  <h4 className="font-tech text-[10px] text-slate-500 font-bold uppercase tracking-wider select-none">
                    External Network Integrations:
                  </h4>
                  <div className="flex gap-4">
                    {/* Github */}
                    <a 
                      href="https://github.com/Abi03122004" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => soundEngine.playClick()}
                      onMouseEnter={() => soundEngine.playHover()}
                      className="flex items-center gap-2 px-3 py-2 border border-slate-800 hover:border-brand-cyan/40 bg-brand-darker/40 rounded transition-all duration-500 text-xs text-slate-300 hover:text-brand-cyan"
                    >
                      <FiGithub />
                      <span>GITHUB</span>
                    </a>

                    {/* LinkedIn */}
                    <a 
                      href="https://www.linkedin.com/in/abinesh-a-b896a0293/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => soundEngine.playClick()}
                      onMouseEnter={() => soundEngine.playHover()}
                      className="flex items-center gap-2 px-3 py-2 border border-slate-800 hover:border-brand-cyan/40 bg-brand-darker/40 rounded transition-all duration-500 text-xs text-slate-300 hover:text-brand-cyan"
                    >
                      <FiLinkedin />
                      <span>LINKEDIN</span>
                    </a>
                    {/* Resume Download */}
                    <a
                      href="https://drive.google.com/uc?export=download&id=1y6mnpg2LNf0NImmsBvVKMRe0jgyIEq86"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundEngine.playClick()}
                      onMouseEnter={() => soundEngine.playHover()}
                      className="flex items-center gap-2 px-3 py-2 border border-slate-800 hover:border-brand-cyan/40 bg-brand-darker/40 rounded transition-all duration-500 text-xs text-slate-300 hover:text-brand-cyan"
                    >
                      <FiDownload />
                      <span>RESUME</span>
                    </a>
                  </div>
                </div>
              </div>
            </HudBorder>
          </div>

          {/* Transmitter Console (Form Card) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <HudBorder title="INITIALIZE CONNECTION" status={isRed ? "MILITARY_STANDBY" : "STANDBY"} color="primary" className="h-full">
              <form onSubmit={handleTransmit} className="flex flex-col gap-4 py-2 font-tech">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-slate-500 uppercase tracking-widest">Sender ID / Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={transmitting}
                      onFocus={() => soundEngine.playHover()}
                      placeholder="ENTER_SENDER_NAME" 
                      className="w-full bg-brand-darker border border-slate-800 focus:border-brand-cyan/60 rounded px-3 py-2 text-xs font-mono text-slate-200 outline-none transition-colors disabled:opacity-50"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-slate-500 uppercase tracking-widest">Routing Destination / Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={(e) => {
                        handleInputChange(e);
                        if (emailError) setEmailError('');
                      }}
                      required
                      disabled={transmitting}
                      onFocus={() => soundEngine.playHover()}
                      placeholder="SENDER_EMAIL@DOMAIN.SYS" 
                      className={`w-full bg-brand-darker border rounded px-3 py-2 text-xs font-mono text-slate-200 outline-none transition-colors disabled:opacity-50 ${
                        emailError ? 'border-brand-red focus:border-brand-red shadow-[0_0_10px_rgba(239,68,68,0.25)]' : 'border-slate-800 focus:border-brand-cyan/60'
                      }`}
                    />
                    {emailError && (
                      <span className="text-brand-red font-mono text-[9px] mt-0.5 select-none">{emailError}</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-slate-500 uppercase tracking-widest">Message Core Payload</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={transmitting}
                    onFocus={() => soundEngine.playHover()}
                    rows="4" 
                    placeholder="ENTER_TRANSMISSION_PAYLOAD_HERE..."
                    className="w-full bg-brand-darker border border-slate-800 focus:border-brand-cyan/60 rounded px-3 py-2 text-xs font-mono text-slate-200 outline-none transition-colors resize-none disabled:opacity-50"
                  />
                </div>

                {/* Transmit Action */}
                <button
                  type="submit"
                  disabled={transmitting}
                  onMouseEnter={() => soundEngine.playHover()}
                  className={`w-full py-3 bg-brand-cyan text-brand-dark font-bold text-xs tracking-widest rounded transition-all duration-300 hover:shadow-cyan-glow hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer uppercase disabled:opacity-50`}
                >
                  <span>{transmitting ? 'TRANSMITTING PACKET...' : 'SEND TRANSMISSION'}</span>
                  <FiSend className={transmitting ? 'animate-ping' : ''} />
                </button>

                {/* Transmission Status Logs */}
                <AnimatePresence>
                  {(transmitting || isSent) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="bg-brand-darker/60 border border-slate-800 rounded p-3 mt-2 font-mono text-[9px] text-slate-400 flex flex-col gap-1 select-none"
                    >
                      <div className="flex justify-between items-center text-slate-500 border-b border-slate-800 pb-1 mb-1.5 font-tech">
                        <span>TRANSMITTER_LOGS</span>
                        <span className={isSent ? "text-brand-green font-bold animate-pulse" : "text-brand-cyan animate-pulse"}>
                          {isSent ? "TRANSMISSION_COMPLETE" : "LINK_ESTABLISHED"}
                        </span>
                      </div>
                      
                      {transmitLogs.map((log, idx) => (
                        <div key={idx} className="flex gap-1.5 items-start">
                          <span className={isSent && idx === transmitLogs.length - 1 ? "text-brand-green" : "text-brand-cyan transition-colors"}>&gt;</span>
                          <span className={isSent && idx === transmitLogs.length - 1 ? "text-brand-green font-bold" : ""}>{log}</span>
                        </div>
                      ))}

                      {transmitting && (
                        <div className="flex gap-1 items-center mt-1">
                          <FiTerminal className="text-brand-cyan animate-pulse" />
                          <span className="w-1.5 h-3 bg-brand-cyan animate-pulse" />
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

              </form>
            </HudBorder>
          </div>

        </div>

      </div>

      {/* Dispatch Protocol Chooser Modal */}
      <AnimatePresence>
        {showMailModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-darker/70 backdrop-blur-md font-tech">
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-md bg-brand-card border border-brand-cyan/35 rounded-lg p-6 shadow-cyan-glow relative"
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b border-brand-cyan/20 pb-3 text-brand-cyan mb-4">
                <span className="font-bold tracking-widest text-xs">SELECT_DISPATCH_PROTOCOL</span>
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setShowMailModal(false);
                  }}
                  className="p-1 hover:bg-brand-cyan/15 rounded text-slate-400 hover:text-brand-cyan transition-colors"
                >
                  <FiX size={16} />
                </button>
              </div>

              {/* Instructions */}
              <p className="text-slate-400 text-xs leading-relaxed font-light font-inter mb-5">
                How would you prefer to initiate communication with the host transceiver node? Select a protocol below:
              </p>

              {/* Protocols */}
              <div className="flex flex-col gap-3">
                {/* System App */}
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setShowMailModal(false);
                    window.location.href = "mailto:abinesharjunan850@gmail.com";
                  }}
                  className="w-full p-3 border border-slate-800 hover:border-brand-cyan/45 bg-brand-darker/50 hover:bg-brand-cyan/5 rounded text-left transition-all duration-300 group cursor-pointer"
                >
                  <span className="block text-xs font-bold text-slate-200 group-hover:text-brand-cyan transition-colors uppercase">
                    [01] Native Mail Client
                  </span>
                  <span className="block text-[10px] text-slate-500 font-inter font-light mt-0.5 leading-normal">
                    Launches default system application (e.g. Outlook, Mail, client app).
                  </span>
                </button>

                {/* Webmail */}
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setShowMailModal(false);
                    window.open("https://mail.google.com/mail/?view=cm&fs=1&to=abinesharjunan850@gmail.com", "_blank", "noopener,noreferrer");
                  }}
                  className="w-full p-3 border border-slate-800 hover:border-brand-cyan/45 bg-brand-darker/50 hover:bg-brand-cyan/5 rounded text-left transition-all duration-300 group cursor-pointer"
                >
                  <span className="block text-xs font-bold text-slate-200 group-hover:text-brand-cyan transition-colors uppercase">
                    [02] Browser Webmail (Gmail)
                  </span>
                  <span className="block text-[10px] text-slate-500 font-inter font-light mt-0.5 leading-normal">
                    Opens a compose panel directly inside Google Gmail web browser client.
                  </span>
                </button>
              </div>

              {/* Abort */}
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setShowMailModal(false);
                }}
                className="w-full mt-4 py-2 border border-brand-red/40 hover:border-brand-red text-brand-red text-[10px] tracking-widest rounded transition-all duration-300 hover:bg-brand-red/10 font-bold uppercase cursor-pointer"
              >
                Abort Protocol
              </button>

              {/* Decorative Corners */}
              <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-brand-cyan/30" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-brand-cyan/30" />
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-brand-cyan/30" />
              <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-brand-cyan/30" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
