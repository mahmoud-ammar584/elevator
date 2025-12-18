import React, { useState } from 'react';
import { Home, Compass, MessageCircle, User, Settings, Bell, ChevronRight, LogOut, Upload, Menu } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import { useAuthStore } from '../store/authStore';

type Props = {
  openChat: () => void;
  activePage?: string;
  setPage?: (page: any) => void;
};

export default function Sidebar({ openChat, activePage, setPage }: Props) {
  const { lang, theme, isSidebarOpen, setSidebarOpen } = useUIStore();
  const { user, logout } = useAuthStore();
  // We use prop or local state, but preferably prop control from App
  const [localPage, setLocalPage] = useState('home');
  const currentPage = activePage || localPage;

  const isRTL = lang === 'ar';

  const menuItems = [
    { id: 'home', icon: Home, label: isRTL ? 'الرئيسية' : 'The Lobby' },
    { id: 'explore', icon: Compass, label: isRTL ? 'استكشاف' : 'Explore' },
    { id: 'upload', icon: Upload, label: isRTL ? 'رفع فيديو' : 'Upload', highlight: true },
    { id: 'notifications', icon: Bell, label: isRTL ? 'الإشعارات' : 'Alerts', badge: 3 },
    { id: 'profile', icon: User, label: isRTL ? 'الملف الشخصي' : 'Profile' },
    { id: 'settings', icon: Settings, label: isRTL ? 'الإعدادات' : 'Settings' },
  ];

  const handlePageChange = (id: string) => {
    if (setPage) {
      setPage(id);
    } else {
      setLocalPage(id);
    }
    // Auto-close on mobile
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button (Only if not handled by App) */}
      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className={`lg:hidden fixed top-4 z-50 p-3 rounded-xl bg-[var(--elevator-card)] text-[var(--elevator-text)] shadow-lg border border-[var(--elevator-border)] transition-all ${isRTL ? 'right-4' : 'left-4'} opacity-0 pointer-events-none`}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 h-screen w-72 bg-[var(--elevator-bg)] border-dashed border-[var(--elevator-border)] z-40 transition-transform duration-500 ease-in-out flex flex-col
        ${isRTL ? 'right-0 border-l' : 'left-0 border-r'}
        ${isSidebarOpen
          ? 'translate-x-0 shadow-[0_0_50px_rgba(0,0,0,0.5)]'
          : (isRTL ? 'translate-x-full' : '-translate-x-full')
        }
      `}
        style={{
          borderLeftWidth: isRTL ? '1px' : '0',
          borderRightWidth: isRTL ? '0' : '1px'
        }}
      >

        {/* Header / Logo */}
        <div className="p-8 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-[var(--elevator-accent)] to-[var(--elevator-neon)] rounded-xl flex items-center justify-center shadow-[0_0_20px_var(--elevator-accent-glow)]">
              <span className="text-2xl font-bold text-[var(--elevator-bg)] animate-pulse-glow">E</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tighter text-[var(--elevator-text)]">
                Elevator
              </h1>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--elevator-neon)] block -mt-1 font-mono opacity-80">
                Rise Above
              </span>
            </div>
          </div>
          {/* Desktop Collapse Button */}
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="hidden lg:flex p-2 rounded-lg hover:bg-[var(--elevator-card)] text-[var(--elevator-text-muted)] hover:text-[var(--elevator-neon)] transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="px-6 mb-6">
          <div className="glass-panel p-4 rounded-2xl flex items-center gap-3 border border-[var(--elevator-border)] hover:border-[var(--elevator-neon)] transition-colors group cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-[var(--elevator-card)] flex items-center justify-center text-xl shadow-inner border border-[var(--elevator-border)]">
              {user?.avatar || '👤'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-[var(--elevator-text)] text-sm group-hover:text-[var(--elevator-neon)] transition-colors truncate">
                {user?.name || (isRTL ? 'ضيف' : 'Guest')}
              </div>
              <div className="text-xs text-[var(--elevator-text-dim)] font-mono flex items-center gap-1">
                <span className="text-[var(--elevator-accent)]">F{user?.floor_level || 1}</span>
                <span>•</span>
                <span>{user?.handle || '@guest'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handlePageChange(item.id)}
                className={`
                    w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden
                    ${isActive
                    ? 'bg-[var(--elevator-card)] text-[var(--elevator-neon)] shadow-[0_0_15px_rgba(69,248,130,0.1)] border border-[var(--elevator-neon)]/30'
                    : 'text-[var(--elevator-text-dim)] hover:bg-[var(--elevator-card-hover)] hover:text-[var(--elevator-text)] hover:translate-x-1'
                  }
                `}
              >
                <div className={`relative z-10 ${isActive ? 'animate-pulse-slow' : ''}`}>
                  <item.icon className="w-5 h-5" strokeWidth={item.highlight ? 2.5 : 2} />
                </div>

                <span className={`relative z-10 font-bold tracking-wide flex-1 text-start ${isActive ? 'font-mono' : ''} ${!isSidebarOpen && 'lg:hidden'}`}>
                  {item.label}
                </span>

                {item.badge && (
                  <span className={`relative z-10 bg-[var(--elevator-alert)] text-[var(--elevator-bg)] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-[0_0_10px_var(--elevator-alert-glow)] ${!isSidebarOpen && 'lg:hidden'}`}>
                    {item.badge}
                  </span>
                )}

                {/* Active Indicator Line */}
                {isActive && (
                  <div className={`absolute top-0 bottom-0 w-1 bg-[var(--elevator-neon)] shadow-[0_0_10px_var(--elevator-neon)] ${isRTL ? 'right-0' : 'left-0'}`}></div>
                )}

                {/* Chevron on hover */}
                <ChevronRight className={`
                    w-4 h-4 text-[var(--elevator-border)] opacity-0 group-hover:opacity-100 transition-all transform absolute 
                    ${isRTL ? 'left-2 rotate-180 -translate-x-2' : 'right-2 -translate-x-2'} 
                    group-hover:translate-x-0
                    ${!isSidebarOpen && 'lg:hidden'}
                `} />
              </button>
            );
          })}

          <div className="my-4 border-t border-[var(--elevator-border)] mx-4 opacity-50"></div>

          <button
            onClick={openChat}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-[var(--elevator-text-muted)] hover:bg-[var(--elevator-card-hover)] hover:text-[var(--elevator-text)] hover:translate-x-1 transition-all group relative overflow-hidden"
          >
            <div className="relative z-10">
              <MessageCircle className="w-5 h-5 group-hover:text-[var(--elevator-accent)] transition-colors" />
            </div>
            <span className={`relative z-10 font-medium ${!isSidebarOpen && 'lg:hidden'}`}>{isRTL ? 'الرسائل' : 'Elevator Line'}</span>
          </button>
        </div>

        {/* Footer */}
        <div className="p-4 mt-auto border-t border-[var(--elevator-border)]">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-4 px-4 py-3 rounded-xl text-[var(--elevator-text-dim)] hover:text-[var(--elevator-alert)] hover:bg-[rgba(255,76,97,0.05)] transition-all group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className={`font-bold ${!isSidebarOpen && 'lg:hidden'}`}>{isRTL ? 'تسجيل الخروج' : 'Log Out'}</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden animate-fade-in"
        ></div>
      )}
    </>
  );
}
