import React, { useState } from 'react';
import { Search, TrendingUp, Users, Hash, Info, X } from 'lucide-react';
import { useUIStore } from '../store/uiStore';

type Props = {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  trending: any[];
  users: any[];
  onFollow: (id: string) => void;
  onHashtagClick?: (tag: string) => void;
  onFooterClick?: (modal: any) => void;
  activeHashtag?: string | null;
};

export default function RightPanel({ searchQuery, setSearchQuery, trending, users, onFollow, onHashtagClick, onFooterClick, activeHashtag }: Props) {
  const { lang } = useUIStore();
  const isRTL = lang === 'ar';

  return (
    <div className={`
      w-80 bg-[var(--elevator-bg)] p-4 hidden 2xl:block fixed top-0 h-screen overflow-y-auto border-dashed border-[var(--elevator-border)]
      ${isRTL ? 'left-0 border-r' : 'right-0 border-l'}
      transition-all duration-300 z-30 custom-scrollbar
    `}
      style={{
        borderRightWidth: isRTL ? '1px' : '0',
        borderLeftWidth: isRTL ? '0' : '1px'
      }}
    >
      {/* Search Bar with Glass effect */}
      <div className="relative mb-8 group">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (activeHashtag && e.target.value === '') {
              onHashtagClick?.(''); // Clear hashtag if search cleared
            }
          }}
          placeholder={lang === 'ar' ? 'البحث في المنصات...' : 'Search floors...'}
          className={`
            w-full bg-[var(--elevator-card)]/50 backdrop-blur-md border border-[var(--elevator-border)] 
            focus:border-[var(--elevator-neon)] focus:ring-1 focus:ring-[var(--elevator-neon)] 
            rounded-full py-3 text-sm transition-all shadow-sm
            ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'}
          `}
        />
        {activeHashtag ? (
          <div className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-2.5' : 'right-2.5'}`}>
            <button
              className="bg-[var(--elevator-neon)]/10 text-[var(--elevator-neon)] text-xs px-2 py-1 rounded-full border border-[var(--elevator-neon)]/30 flex items-center gap-1 cursor-pointer hover:bg-[var(--elevator-alert)] hover:text-white hover:border-[var(--elevator-alert)] transition-all"
              onClick={() => {
                onHashtagClick && onHashtagClick('');
                setSearchQuery('');
              }}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : searchQuery && (
          <div className={`absolute top-2.5 ${isRTL ? 'left-2.5' : 'right-2.5'}`}>
            <button
              className="text-[var(--elevator-text-dim)] hover:text-[var(--elevator-text)] transition-colors"
              onClick={() => setSearchQuery('')}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Trending Section - The Shaft */}
      <div className="glass-panel rounded-2xl p-5 mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--elevator-border)]">
          <h2 className="font-bold text-[var(--elevator-text)] text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[var(--elevator-neon)]" />
            {lang === 'ar' ? 'الصاعد الآن' : 'Going Up'}
          </h2>
        </div>

        <div className="space-y-2">
          {trending.map((trend) => (
            <div
              key={trend.id}
              className={`group cursor-pointer hover:bg-[var(--elevator-card-hover)] p-3 rounded-xl transition-all border border-transparent hover:border-[var(--elevator-border)] ${activeHashtag === trend.tag ? 'bg-[var(--elevator-card)] border-[var(--elevator-neon)] shadow-[inset_0_0_10px_rgba(102,252,241,0.1)]' : ''}`}
              onClick={() => {
                onHashtagClick && onHashtagClick(trend.tag);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="flex justify-between items-start">
                <span className={`text-sm font-bold group-hover:text-[var(--elevator-neon)] transition-colors ${activeHashtag === trend.tag ? 'text-[var(--elevator-neon)] shadow-[0_0_10px_var(--elevator-neon-glow)]' : 'text-[var(--elevator-text)]'}`}>
                  {trend.tag}
                </span>
                <span className="text-xs font-mono text-[var(--elevator-accent)] bg-[var(--elevator-accent)]/10 px-1.5 py-0.5 rounded border border-[var(--elevator-accent)]/20">
                  {trend.growth}
                </span>
              </div>
              <div className="text-xs text-[var(--elevator-text-dim)] mt-1 font-mono">
                {trend.posts} {lang === 'ar' ? 'منشور' : 'posts'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Who to follow - Suggested Users */}
      <div className="glass-panel rounded-2xl p-5 mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
        <h2 className="font-bold text-[var(--elevator-text)] mb-4 text-lg flex items-center gap-2">
          <Users className="w-5 h-5 text-[var(--elevator-text-muted)]" />
          {lang === 'ar' ? 'اقتراحات المتابعة' : 'Who to follow'}
        </h2>
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between group p-2 hover:bg-[var(--elevator-card-hover)] rounded-xl transition-colors -mx-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative">
                  <div className="w-10 h-10 bg-[var(--elevator-bg)] rounded-full flex items-center justify-center text-xl border border-[var(--elevator-border)] group-hover:border-[var(--elevator-neon)] transition-colors shadow-lg overflow-hidden">
                    {user.avatar}
                  </div>
                  {/* Mini Floor Badge */}
                  <div className="absolute -bottom-1 -right-1 bg-[var(--elevator-bg)] border border-[var(--elevator-accent)] text-[var(--elevator-accent)] text-[8px] px-1 rounded-sm font-mono leading-none shadow-[0_0_5px_var(--elevator-accent-glow)]">
                    F{user.floor_level || Math.floor(Math.random() * 20) + 1}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm text-[var(--elevator-text)] truncate group-hover:text-[var(--elevator-neon)] transition-colors">
                    {user.name}
                  </div>
                  <div className="text-xs text-[var(--elevator-text-dim)] truncate">
                    {user.followers} {lang === 'ar' ? 'متابع' : 'followers'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  // We use the passed onFollow wrapper, but let's verify visual state
                  onFollow(user.id);
                }}
                className={`
                  text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-300
                  ${user.isFollowing
                    ? 'bg-transparent text-[var(--elevator-text-muted)] border border-[var(--elevator-border)] hover:border-[var(--elevator-alert)] hover:text-[var(--elevator-alert)]'
                    : 'bg-[var(--elevator-text)] text-[var(--elevator-bg)] hover:bg-[var(--elevator-neon)] hover:scale-105 shadow-[0_0_10px_rgba(255,255,255,0.2)]'
                  }
                `}
              >
                {user.isFollowing
                  ? (lang === 'ar' ? 'متابَع' : 'Following')
                  : (lang === 'ar' ? 'متابعة' : 'Follow')
                }
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[var(--elevator-text-dim)] px-2 font-mono opacity-60">
        <button onClick={() => onFooterClick && onFooterClick('about')} className="hover:text-[var(--elevator-neon)] hover:underline transition-colors">{lang === 'ar' ? 'حول' : 'About'}</button>
        <button onClick={() => onFooterClick && onFooterClick('help')} className="hover:text-[var(--elevator-neon)] hover:underline transition-colors">{lang === 'ar' ? 'المساعدة' : 'Help'}</button>
        <button onClick={() => onFooterClick && onFooterClick('terms')} className="hover:text-[var(--elevator-neon)] hover:underline transition-colors">{lang === 'ar' ? 'الشروط' : 'Terms'}</button>
        <button onClick={() => onFooterClick && onFooterClick('privacy')} className="hover:text-[var(--elevator-neon)] hover:underline transition-colors">{lang === 'ar' ? 'الخصوصية' : 'Privacy'}</button>
        <button onClick={() => onFooterClick && onFooterClick('api')} className="hover:text-[var(--elevator-neon)] hover:underline transition-colors">{lang === 'ar' ? 'API' : 'API'}</button>
        <span className="mt-2 w-full text-[10px] opacity-50 block text-center border-t border-[var(--elevator-border)] pt-2">© 2025 Elevator Inc.</span>
      </div>
    </div>
  );
}