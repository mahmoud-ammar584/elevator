import React from 'react';
import { useUIStore } from '../store/uiStore';

export default function LanguageToggle() {
  const { lang, toggleLang } = useUIStore();

  return (
    <button
      onClick={toggleLang}
      aria-label="Toggle language"
      className="px-3 py-1 border rounded-full bg-white shadow-sm hover:translate-y-[-1px] transition-transform"
    >
      {lang === 'ar' ? 'English 🇺🇸' : 'عربي 🇪🇬'}
    </button>
  );
}
