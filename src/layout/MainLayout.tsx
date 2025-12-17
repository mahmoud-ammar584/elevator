import React, { type ReactNode } from 'react';
import { useUIStore } from '../store/uiStore';

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  const { lang, toggleSidebar } = useUIStore();

  const isRTL = lang === 'ar';

  return (
    <div className={`flex h-full ${isRTL ? 'flex-row-reverse' : ''}`}>
      <div className="flex flex-col flex-1">
        <header className="p-4 bg-white shadow flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            {isRTL ? 'القائمة' : 'Menu'}
          </button>

          <h1 className="font-bold text-lg">
            {isRTL ? 'لوحة التحكم' : 'Dashboard'}
          </h1>
        </header>

        <main className="p-6 overflow-auto flex-1 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
