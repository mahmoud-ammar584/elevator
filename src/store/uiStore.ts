import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  // Core UI state
  lang: 'en' | 'ar';
  theme: 'light' | 'dark';
  accentColor: string;
  isSidebarOpen: boolean;
  followedUsers: string[];
  autoSimulateNotifications: boolean;

  // Actions
  toggleLang: () => void;
  toggleTheme: () => void;
  setAccentColor: (color: string) => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  toggleFollow: (userId: string) => void;
  setAutoSimulateNotifications: (auto: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      lang: 'ar',
      theme: 'dark',
      accentColor: '#45F882',
      isSidebarOpen: true,
      followedUsers: [],
      autoSimulateNotifications: true,

      toggleLang: () => set((state) => ({ lang: state.lang === 'en' ? 'ar' : 'en' })),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      setAccentColor: (color) => set({ accentColor: color }),
      setSidebarOpen: (open) => set({ isSidebarOpen: open }),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

      toggleFollow: (userId) => set((state) => ({
        followedUsers: state.followedUsers.includes(userId)
          ? state.followedUsers.filter(id => id !== userId)
          : [...state.followedUsers, userId]
      })),

      setAutoSimulateNotifications: (auto) => set({ autoSimulateNotifications: auto }),
    }),
    {
      name: 'elevator-ui-storage',
      partialize: (state) => ({
        lang: state.lang,
        theme: state.theme,
        accentColor: state.accentColor,
        followedUsers: state.followedUsers,
      }),
    }
  )
);
