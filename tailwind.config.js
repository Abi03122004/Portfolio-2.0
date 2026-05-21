/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#070b13',
          darker: '#030508',
          card: 'var(--color-card-bg)',
          cardLight: 'var(--color-card-light-bg)',
          cyan: 'var(--color-primary)',
          red: 'var(--color-accent)',
          blue: 'var(--color-secondary)',
          yellow: '#ffe600',
          green: '#00ff66',
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        tech: ['"Share Tech Mono"', 'monospace'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'cyan-glow': 'var(--glow-shadow)',
        'cyan-glow-lg': 'var(--glow-shadow-lg)',
        'red-glow': '0 0 15px rgba(255, 0, 60, 0.45)',
        'red-glow-lg': '0 0 25px rgba(255, 0, 60, 0.65)',
        'blue-glow': '0 0 15px rgba(0, 102, 255, 0.4)',
        'hud-inset': 'var(--glow-shadow-inset)',
      },
      animation: {
        'scanline': 'scanline 8s linear infinite',
        'grid-drift': 'grid-drift 30s linear infinite',
        'spin-slow': 'spin 25s linear infinite',
        'spin-reverse-slow': 'spin-reverse 30s linear infinite',
        'pulse-glow': 'pulse-glow var(--pulse-speed) ease-in-out infinite',
        'radar-sweep': 'radar-sweep 4s linear infinite',
        'glitch': 'glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'grid-drift': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(40px)' },
        },
        'spin-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 2px rgba(var(--color-primary-rgb),0.3))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 10px rgba(var(--color-primary-rgb),0.8))' },
        },
        'radar-sweep': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        }
      }
    },
  },
  plugins: [],
}
