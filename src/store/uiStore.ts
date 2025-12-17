import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  lang: 'en' | 'ar';
  theme: 'light' | 'dark';
  isSidebarOpen: boolean;
  accentColor: string;
  autoSimulateNotifications: boolean;
  followedUsers: string[]; // List of IDs

  setLang: (lang: 'en' | 'ar') => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleSidebar: () => void;
  toggleLang: () => void;
  toggleTheme: () => void;
  setAccentColor: (color: string) => void;
  setAutoSimulateNotifications: (val: boolean) => void;
  setSidebarOpen: (val: boolean) => void;
  toggleFollow: (userId: string) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      lang: 'ar',
      theme: 'dark',
      isSidebarOpen: true,
      accentColor: '#45F882', // Default Neon Lift
      autoSimulateNotifications: true,
      followedUsers: [],

      setLang: (lang) => set({ lang }),
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      toggleLang: () =>
        set((state) => ({ lang: state.lang === 'ar' ? 'en' : 'ar' })),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      setAccentColor: (color) => set({ accentColor: color }),
      setAutoSimulateNotifications: (val) => set({ autoSimulateNotifications: val }),
      setSidebarOpen: (val: boolean) => set({ isSidebarOpen: val }),

      toggleFollow: (userId) => set((state) => {
        const current = state.followedUsers || [];
        if (current.includes(userId)) {
          return { followedUsers: current.filter(id => id !== userId) };
        } else {
          return { followedUsers: [...current, userId] };
        }
      }),
    }),
    {
      name: 'elevator-ui-storage',
    }
  )
);
