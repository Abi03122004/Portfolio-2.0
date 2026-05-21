let audioCtx = null;
let enabled = false;

// Load initial state from local storage (default is muted/disabled)
try {
  const saved = localStorage.getItem('abinesh_ai_sound_enabled');
  enabled = saved === 'true';
} catch (e) {
  enabled = false;
}

function initAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const soundEngine = {
  getEnabled() {
    return enabled;
  },

  setEnabled(val) {
    enabled = val;
    localStorage.setItem('abinesh_ai_sound_enabled', String(val));
    if (val) {
      initAudioContext();
    }
  },

  playClick() {
    if (!enabled) return;
    try {
      const ctx = initAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1000, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      console.warn("Audio play failed:", e);
    }
  },

  playHover() {
    if (!enabled) return;
    try {
      const ctx = initAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1800, ctx.currentTime);

      gain.gain.setValueAtTime(0.005, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.02);
    } catch (e) {
      // Fails silently to prevent console clutter during fast hovers
    }
  },

  playThemeChange(isRed) {
    if (!enabled) return;
    try {
      const ctx = initAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = isRed ? 'sawtooth' : 'sine';

      const duration = 0.55;
      if (isRed) {
        // Red alert: descending frequency alert sweep
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(220, ctx.currentTime + duration);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      } else {
        // Blue assistant: ascending soft sweep
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + duration);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio play failed:", e);
    }
  },

  playBoot() {
    if (!enabled) return;
    try {
      const ctx = initAudioContext();
      const now = ctx.currentTime;

      // Immersive major arpeggio note sequence
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;

        const startTime = now + idx * 0.12;
        const duration = 0.6;

        gain.gain.setValueAtTime(0, now);
        gain.gain.setValueAtTime(0.04, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      });
    } catch (e) {
      console.warn("Audio play failed:", e);
    }
  }
};
