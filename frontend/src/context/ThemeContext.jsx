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
    document.title = '🎬 Parth Agrawal | Developer Portfolio';

    // Dynamic Theme Favicon Generator (Overrides cached tab icons)
    const accentColor = activeTheme.color || '#E50914';
    const accentLight = activeTheme.light || '#FF334B';
    const accentDark = activeTheme.dark || '#8B0000';

    const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="themeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${accentLight}"/>
          <stop offset="50%" stop-color="${accentColor}"/>
          <stop offset="100%" stop-color="${accentDark}"/>
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="16" fill="#0b0b0b" stroke="${accentColor}" stroke-width="3"/>
      <path d="M22 14 H35 C42 14 46 18 46 25 C46 32 42 36 35 36 H28 V50 H22 Z M28 20 V30 H34 C38 30 40 28 40 25 C40 22 38 20 34 20 Z" fill="url(#themeGrad)"/>
      <circle cx="44" cy="46" r="3.5" fill="${accentColor}"/>
    </svg>`;

    const encodedSvg = `data:image/svg+xml;utf8,${encodeURIComponent(svgIcon)}`;
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.type = 'image/svg+xml';
    link.href = encodedSvg;
  }, [currentTheme, activeTheme]);

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
