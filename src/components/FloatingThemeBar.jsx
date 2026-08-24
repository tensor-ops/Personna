import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const FloatingThemeBar = () => {
  const { currentTheme, changeTheme, themes } = useTheme();
  const [hoveredTheme, setHoveredTheme] = useState(null);

  return (
    <div className="fixed bottom-6 right-6 z-[99990] flex flex-col items-end gap-2 pointer-events-auto select-none">
      
      {/* Dynamic Hover Tooltip Preview */}
      {hoveredTheme && (
        <div className="px-3.5 py-1.5 rounded-xl bg-[#121212]/95 backdrop-blur-2xl border border-white/20 shadow-2xl animate-in fade-in zoom-in-95 duration-150 text-right">
          <p className="text-xs font-bold text-white tracking-wide">
            {hoveredTheme.name}
          </p>
          <p className="text-[10px] font-mono text-white/50">
            {hoveredTheme.vibe}
          </p>
        </div>
      )}

      {/* Main Glass Pill */}
      <div className="flex items-center gap-2 p-2 rounded-full bg-[#121212]/90 backdrop-blur-2xl border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.85)] transition-all duration-300 hover:border-white/40">
        
        {/* Label Badge */}
        <div className="flex items-center gap-1.5 pl-2.5 pr-1 py-1">
          <span
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: 'var(--accent-color)' }}
          />
          <span className="hidden sm:inline text-[10px] font-mono font-bold uppercase tracking-widest text-white/70">
            THEME
          </span>
        </div>

        {/* Color Palette Buttons */}
        <div className="flex items-center gap-1.5 pr-1">
          {themes.map((theme) => {
            const isActive = theme.id === currentTheme;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => changeTheme(theme.id)}
                onMouseEnter={() => setHoveredTheme(theme)}
                onMouseLeave={() => setHoveredTheme(null)}
                aria-label={`Select ${theme.name} theme`}
                className={`relative rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center ${
                  isActive
                    ? 'w-7 h-7 scale-110 shadow-lg'
                    : 'w-5 h-5 opacity-65 hover:opacity-100 hover:scale-120'
                }`}
                style={{
                  backgroundColor: theme.color,
                  boxShadow: isActive
                    ? `0 0 16px ${theme.color}, 0 0 25px ${theme.color}40`
                    : 'none'
                }}
              >
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-white shadow-sm" />
                )}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default FloatingThemeBar;
