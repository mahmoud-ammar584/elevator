import React, { useState, useEffect } from 'react';
import { Settings, Globe, Moon, Sun, User, Home, Bell } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import { useAuthStore } from '../store/authStore';

type Props = {
    activePage: string;
    onNavigate: (page: string) => void;
};

export default function FloatingDock({ activePage, onNavigate }: Props) {
    const { theme, toggleTheme, lang, toggleLang } = useUIStore();
    const { user } = useAuthStore();
    const [isVisible, setIsVisible] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const isRTL = lang === 'ar';

    // Auto-show/hide logic
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down - hide
                setIsVisible(false);
            } else {
                // Scrolling up - show
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (e.clientY > window.innerHeight - 150) {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [lastScrollY, isHovered]);

    const dockItems = [
        { id: 'home', icon: Home, label: isRTL ? 'الرئيسية' : 'Home', action: () => onNavigate('home') },
        { id: 'notifications', icon: Bell, label: isRTL ? 'تنبيهات' : 'Alerts', action: () => onNavigate('notifications') },
        { id: 'theme', icon: theme === 'dark' ? Moon : Sun, label: isRTL ? 'المظهر' : 'Theme', action: toggleTheme },
        { id: 'lang', icon: Globe, label: isRTL ? 'اللغة' : 'Language', action: toggleLang },
        { id: 'settings', icon: Settings, label: isRTL ? 'إعدادات' : 'Settings', action: () => onNavigate('settings') },
        { id: 'profile', icon: User, label: isRTL ? 'ملفي' : 'Me', action: () => onNavigate('profile') },
    ];

    return (
        <div
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-spring ${isVisible || isHovered ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                // If mouse leaves, let the mousemove handler decide visibility, but we can hint it to hide if far up
            }}
        >
            <div className="glass-panel px-4 py-3 rounded-2xl flex items-center gap-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-[var(--elevator-border)] bg-[var(--elevator-bg)]/80 backdrop-blur-xl scale-100 hover:scale-[1.02] transition-transform">
                {dockItems.map((item) => {
                    const isActive = activePage === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={item.action}
                            className="group relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 hover:bg-[var(--elevator-card-hover)] min-w-[50px]"
                        >
                            {/* Active Indicator Dot */}
                            {isActive && (
                                <span className="absolute -top-1 w-1 h-1 bg-[var(--elevator-neon)] rounded-full shadow-[0_0_5px_var(--elevator-neon)]"></span>
                            )}

                            {/* Icon with scaling effect */}
                            <div className={`
                    transition-all duration-300 transform group-hover:-translate-y-2 group-hover:scale-125
                    ${isActive ? 'text-[var(--elevator-neon)]' : 'text-[var(--elevator-text-muted)] group-hover:text-[var(--elevator-text)]'}
                `}>
                                <item.icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                            </div>

                            {/* Tooltip Label (Desktop only) */}
                            <span className="absolute -top-10 bg-[var(--elevator-card)] text-[var(--elevator-text)] text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-[var(--elevator-border)] shadow-lg transform scale-90 group-hover:scale-100">
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
