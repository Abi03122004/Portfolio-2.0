import React, { createContext, useContext, useState, useEffect } from 'react';
import { soundEngine } from '../utils/soundEngine';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(() => {
    const savedMode = localStorage.getItem('abinesh_ai_theme_mode');
    return savedMode === 'red' ? 'red' : 'blue';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'red') {
      root.classList.add('theme-red');
      root.classList.remove('theme-blue');
    } else {
      root.classList.add('theme-blue');
      root.classList.remove('theme-red');
    }
    localStorage.setItem('abinesh_ai_theme_mode', themeMode);
  }, [themeMode]);

  const toggleThemeMode = () => {
    setThemeMode((prev) => {
      const next = prev === 'blue' ? 'red' : 'blue';
      soundEngine.playThemeChange(next === 'red');
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleThemeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
