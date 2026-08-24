import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = ({ position = 'top' }) => {
  const { currentTheme, activeTheme, changeTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isBottom = position === 'bottom';

  return (
    <div ref={dropdownRef} className="relative z-50 inline-block text-left">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414]/90 backdrop-blur-xl border border-white/20 text-white hover:border-white/40 transition-all duration-300 shadow-xl group hover:scale-105 active:scale-95 cursor-pointer"
        title="Choose Theme Vibe"
      >
        {/* Animated Color Dot */}
        <span
          className="w-3.5 h-3.5 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-115"
          style={{
            backgroundColor: activeTheme.color,
            boxShadow: `0 0 12px ${activeTheme.color}`
          }}
        />

        <span className="text-[11px] font-mono uppercase tracking-wider text-white/90">
          {activeTheme.name}
        </span>

        <svg
          className={`w-3.5 h-3.5 text-white/60 transition-transform duration-300 ${
            isOpen ? (isBottom ? 'rotate-180 text-white' : '-rotate-180 text-white') : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isBottom ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute right-0 ${
            isBottom ? 'bottom-full mb-3 origin-bottom-right' : 'top-full mt-3 origin-top-right'
          } w-64 p-2.5 rounded-2xl bg-[#121212]/95 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.95)] animate-in fade-in zoom-in-95 duration-200 z-[99999]`}
        >
          <div className="px-3 py-2 border-b border-white/10 mb-1.5 flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 font-bold">
              Color Atmosphere
            </span>
            <span className="text-[9px] font-mono text-white/40">
              {themes.length} Presets
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            {themes.map((theme) => {
              const isSelected = theme.id === currentTheme;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => {
                    changeTheme(theme.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-200 group cursor-pointer ${
                    isSelected
                      ? 'bg-white/10 border border-white/20 shadow-inner'
                      : 'hover:bg-white/5 hover:border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-4 h-4 rounded-full transition-transform group-hover:scale-125 shrink-0"
                      style={{
                        backgroundColor: theme.color,
                        boxShadow: isSelected ? `0 0 12px ${theme.color}` : 'none'
                      }}
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-white tracking-wide">
                        {theme.name}
                      </span>
                      <span className="text-[10px] font-mono text-white/50 line-clamp-1">
                        {theme.vibe}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <span
                      className="w-2 h-2 rounded-full shrink-0 animate-pulse"
                      style={{ backgroundColor: theme.color }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
