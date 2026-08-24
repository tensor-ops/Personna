import React, { createContext, useContext, useState, useEffect } from 'react';

export const THEMES = [
  {
    id: 'crimson',
    name: 'Cinematic Red',
    vibe: 'Netflix Studio & Scarlet Glow',
    color: '#E50914',
    light: '#FF334B',
    dark: '#8B0000',
    rgb: '229, 9, 20',
    gradient: 'linear-gradient(135deg, #FF334B 0%, #E50914 50%, #8B0000 100%)'
  },
  {
    id: 'cyan',
    name: 'Electric Cyan',
    vibe: 'Cyberspace & Electric Blue',
    color: '#00F0FF',
    light: '#38BDF8',
    dark: '#0051FF',
    rgb: '0, 240, 255',
    gradient: 'linear-gradient(135deg, #38BDF8 0%, #00F0FF 50%, #0051FF 100%)'
  },
  {
    id: 'emerald',
    name: 'Quantum Emerald',
    vibe: 'Terminal Neon & Matrix Green',
    color: '#10B981',
    light: '#34D399',
    dark: '#047857',
    rgb: '16, 185, 129',
    gradient: 'linear-gradient(135deg, #34D399 0%, #10B981 50%, #047857 100%)'
  },
  {
    id: 'purple',
    name: 'Nebula Violet',
    vibe: 'Cosmic Ultraviolet & Synthwave',
    color: '#A855F7',
    light: '#C084FC',
    dark: '#6B21A8',
    rgb: '168, 85, 247',
    gradient: 'linear-gradient(135deg, #C084FC 0%, #A855F7 50%, #6B21A8 100%)'
  },
  {
    id: 'amber',
    name: 'Solar Gold',
    vibe: 'Radiant Ember & Interstellar Dawn',
    color: '#F59E0B',
    light: '#FBBF24',
    dark: '#B45309',
    rgb: '245, 158, 11',
    gradient: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #B45309 100%)'
  },
  {
    id: 'rose',
    name: 'Cyber Rose',
    vibe: 'Laser Magenta & Neon Quartz',
    color: '#F43F5E',
    light: '#FB7185',
    dark: '#9F1239',
    rgb: '244, 63, 94',
    gradient: 'linear-gradient(135deg, #FB7185 0%, #F43F5E 50%, #9F1239 100%)'
  }
];

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('portfolio_theme') || 'crimson';
  });

  const activeTheme = THEMES.find((t) => t.id === currentTheme) || THEMES[0];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('portfolio_theme', currentTheme);
  }, [currentTheme]);

  const changeTheme = (themeId) => {
    if (THEMES.some((t) => t.id === themeId)) {
      setCurrentTheme(themeId);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, activeTheme, changeTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
