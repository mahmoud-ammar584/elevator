import React from 'react';
import { useUIStore } from '../store/uiStore';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useUIStore();
  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 rounded-full border bg-white shadow-sm"
      aria-label="toggle theme"
    >
      {theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'Amoled'}
    </button>
  );
}
