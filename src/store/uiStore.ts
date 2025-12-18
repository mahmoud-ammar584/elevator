import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ElevatorStatus = 'idle' | 'moving' | 'opening' | 'open' | 'closing';

interface UIState {
  // Existing state
  lang: 'en' | 'ar';
  theme: 'light' | 'dark';
  accentColor: string;
  isSidebarOpen: boolean;
  followedUsers: string[];
  autoSimulateNotifications: boolean;

  // Elevator Simulation State
  currentFloor: number;
  targetFloor: number;
  elevatorStatus: ElevatorStatus;

  // Actions
  toggleLang: () => void;
  toggleTheme: () => void;
  setAccentColor: (color: string) => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  toggleFollow: (userId: string) => void;
  setAutoSimulateNotifications: (auto: boolean) => void;

  // Elevator Actions
  goToFloor: (floor: number) => void;
  setElevatorStatus: (status: ElevatorStatus) => void;
  arrivedAtFloor: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      lang: 'ar',
      theme: 'dark',
      accentColor: '#45F882',
      isSidebarOpen: true,
      followedUsers: [],
      autoSimulateNotifications: true,

      currentFloor: 99, // Start at the top floor (Lobby of the elite)
      targetFloor: 99,
      elevatorStatus: 'idle',

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

      goToFloor: (floor) => {
        const { currentFloor, elevatorStatus } = get();
        if (floor === currentFloor || elevatorStatus !== 'idle') return;

        set({
          targetFloor: floor,
          elevatorStatus: 'moving'
        });
      },

      setElevatorStatus: (status) => set({ elevatorStatus: status }),

      arrivedAtFloor: () => set((state) => ({
        currentFloor: state.targetFloor,
        elevatorStatus: 'opening'
      })),
    }),
    {
      name: 'elevator-ui-storage',
      partialize: (state) => ({
        lang: state.lang,
        theme: state.theme,
        accentColor: state.accentColor,
        followedUsers: state.followedUsers,
        currentFloor: state.currentFloor,
      }),
    }
  )
);
