import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-fakepe-surface hover:bg-fakepe-border transition-colors border border-fakepe-border hover:border-fakepe-primary/30"
      aria-label="Toggle theme"
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-fakepe-text-secondary hover:text-fakepe-primary transition" />
      ) : (
        <Moon className="w-5 h-5 text-fakepe-text-secondary hover:text-fakepe-primary transition" />
      )}
    </button>
  );
}
