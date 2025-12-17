import React from 'react';
import { User, Bell, Lock, Globe, Palette, Monitor, LogOut, ChevronRight, Moon, Sun, Shield } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { user, logout } = useAuthStore();
  const { lang, theme, toggleTheme, toggleLang, setAccentColor } = useUIStore();
  const isRTL = lang === 'ar';

  const handleSave = () => {
    toast.success(lang === 'ar' ? 'تم حفظ التغييرات' : 'Changes saved successfully');
  };

  const colors = [
    { name: 'Neon Lift', value: '#45F882' },
    { name: 'Cyan Ray', value: '#66FCF1' },
    { name: 'Hot Pink', value: '#FF00FF' },
    { name: 'Deep Purple', value: '#A855F7' },
  ];

  return (
    <div className="bg-[var(--elevator-bg)] min-h-full p-6 pb-24">
      <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[var(--elevator-card)] border border-[var(--elevator-border)] flex items-center justify-center text-[var(--elevator-neon)] shadow-[0_0_20px_var(--elevator-neon-glow)]">
            <Palette className="w-6 h-6 animate-pulse-glow" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[var(--elevator-text)] tracking-tight">
              {lang === 'ar' ? 'الإعدادات' : 'System Config'}
            </h1>
            <p className="text-[var(--elevator-text-dim)] font-mono text-sm">
              v1.4.0 • Build 2025.12
            </p>
          </div>
        </div>

        {/* Appearance Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--elevator-text)] flex items-center gap-2 border-b border-[var(--elevator-border)] pb-2">
            <Monitor className="w-5 h-5 text-[var(--elevator-accent)]" />
            {lang === 'ar' ? 'المظهر' : 'Appearance'}
          </h2>

          <div className="glass-panel p-5 rounded-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[var(--elevator-text)]">{lang === 'ar' ? 'الوضع الليلي' : 'Dark Mode'}</h3>
                <p className="text-xs text-[var(--elevator-text-dim)]">{lang === 'ar' ? 'تفعيل مظهر Obsidian Void' : 'Enable Obsidian Void theme'}</p>
              </div>
              <button
                onClick={toggleTheme}
                className={`w-14 h-8 rounded-full transition-colors flex items-center px-1 border border-[var(--elevator-border)] ${theme === 'dark' ? 'bg-[var(--elevator-neon)] justify-end' : 'bg-[var(--elevator-card-hover)] justify-start'}`}
              >
                <div className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-xs">
                  {theme === 'dark' ? <Moon className="w-3 h-3 text-black" /> : <Sun className="w-3 h-3 text-orange-500" />}
                </div>
              </button>
            </div>

            <div>
              <h3 className="font-bold text-[var(--elevator-text)] mb-3">{lang === 'ar' ? 'لون النظام (Accent)' : 'System Accent'}</h3>
              <div className="flex gap-4">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    style={{ backgroundColor: c.value }}
                    className="w-10 h-10 rounded-xl shadow-lg hover:scale-110 transition-transform focus:ring-2 ring-[var(--elevator-text)] ring-offset-2 ring-offset-transparent"
                    onClick={() => {
                      setAccentColor(c.value);
                      toast.success(`Color set to ${c.name}`);
                    }}
                    title={c.name}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Account Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--elevator-text)] flex items-center gap-2 border-b border-[var(--elevator-border)] pb-2">
            <User className="w-5 h-5 text-[var(--elevator-accent)]" />
            {lang === 'ar' ? 'الحساب' : 'Account'}
          </h2>

          <div className="glass-panel p-5 rounded-2xl space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[var(--elevator-card)] border border-[var(--elevator-border)] flex items-center justify-center text-3xl">
                {user?.avatar || '👤'}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[var(--elevator-text)] text-lg">{user?.name}</h3>
                <p className="text-[var(--elevator-text-dim)] text-sm">{user?.email}</p>
              </div>
              <button className="px-4 py-2 border border-[var(--elevator-border)] rounded-lg hover:bg-[var(--elevator-card-hover)] transition-colors text-sm">
                {lang === 'ar' ? 'تعديل' : 'Edit'}
              </button>
            </div>

            <div className="grid gap-2">
              {['username', 'bio', 'email'].map((field) => (
                <div key={field} className="group flex items-center justify-between p-3 rounded-xl hover:bg-[var(--elevator-card-hover)] cursor-pointer transition-colors border border-transparent hover:border-[var(--elevator-border)]">
                  <div className="flex items-center gap-3">
                    <div className="text-[var(--elevator-text-dim)] uppercase text-xs font-mono w-16">{field}</div>
                    <div className="text-[var(--elevator-text)] font-medium">{(user as any)?.[field] || 'Not set'}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[var(--elevator-text-dim)] group-hover:text-[var(--elevator-neon)]" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* General Settings */}
        <section className="grid md:grid-cols-2 gap-4">
          {/* Language */}
          <div className="glass-panel p-5 rounded-2xl cursor-pointer hover:border-[var(--elevator-neon)] transition-colors group" onClick={toggleLang}>
            <div className="flex items-center justify-between mb-2">
              <Globe className="w-6 h-6 text-[var(--elevator-text-muted)] group-hover:text-[var(--elevator-neon)] transition-colors" />
              <span className="text-xs font-mono text-[var(--elevator-text-dim)]">{lang.toUpperCase()}</span>
            </div>
            <h3 className="font-bold text-[var(--elevator-text)]">{lang === 'ar' ? 'اللغة' : 'Language'}</h3>
            <p className="text-sm text-[var(--elevator-text-dim)]">{lang === 'ar' ? 'العربية' : 'English'}</p>
          </div>

          {/* Notifications */}
          <div className="glass-panel p-5 rounded-2xl cursor-pointer hover:border-[var(--elevator-neon)] transition-colors group">
            <div className="flex items-center justify-between mb-2">
              <Bell className="w-6 h-6 text-[var(--elevator-text-muted)] group-hover:text-[var(--elevator-neon)] transition-colors" />
              <div className="w-2 h-2 rounded-full bg-[var(--elevator-neon)] animate-pulse"></div>
            </div>
            <h3 className="font-bold text-[var(--elevator-text)]">{lang === 'ar' ? 'التنبيهات' : 'Notifications'}</h3>
            <p className="text-sm text-[var(--elevator-text-dim)]">{lang === 'ar' ? 'مفعلة' : 'Enabled'}</p>
          </div>

          {/* Privacy */}
          <div className="glass-panel p-5 rounded-2xl cursor-pointer hover:border-[var(--elevator-neon)] transition-colors group">
            <div className="flex items-center justify-between mb-2">
              <Shield className="w-6 h-6 text-[var(--elevator-text-muted)] group-hover:text-[var(--elevator-neon)] transition-colors" />
            </div>
            <h3 className="font-bold text-[var(--elevator-text)]">{lang === 'ar' ? 'الخصوصية' : 'Privacy'}</h3>
            <p className="text-sm text-[var(--elevator-text-dim)]">{lang === 'ar' ? 'عام' : 'Public'}</p>
          </div>
        </section>

        {/* Danger Zone */}
        <div className="pt-8 border-t border-[var(--elevator-border)]">
          <button
            onClick={logout}
            className="w-full p-4 rounded-xl border border-[var(--elevator-alert)]/30 text-[var(--elevator-alert)] hover:bg-[var(--elevator-alert)]/10 flex items-center justify-center gap-2 transition-all font-bold"
          >
            <LogOut className="w-5 h-5" />
            {lang === 'ar' ? 'تسجيل الخروج' : 'Log Out'}
          </button>
        </div>

      </div>
    </div>
  );
}
