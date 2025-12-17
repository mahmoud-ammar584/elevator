import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  username: string;
  display_name: string;
  // Aliases for easier UI consumption
  name?: string;
  handle?: string;
  avatar?: string;
  bio?: string;
  followers_count?: number;
  following_count?: number;
  posts_count?: number;
  floor_level?: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<void>;
  register: (data: Partial<User>) => Promise<void>;
  logout: () => void;
  updateUser: (patch: Partial<User>) => void;
  loadMockUserIfNone: () => void;
  fetchCurrentUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password?: string) => {
        // Hybrid behavior: accept any user, but if password provided must be '123456' to simulate auth.
        await new Promise((res) => setTimeout(res, 500));
        if (password && password !== '123456') {
          throw new Error('Invalid password (mock)');
        }
        const username = email.split('@')[0];
        const u: User = {
          id: 'u-' + Date.now().toString(36),
          email,
          username,
          display_name: username,
          name: username,
          handle: '@' + username,
          avatar: '',
          bio: 'Elevator User (Mock)',
          followers_count: 0,
          following_count: 0,
          posts_count: 0,
          floor_level: 1,
        };
        set({ user: u, isAuthenticated: true });
      },

      register: async (data) => {
        await new Promise((res) => setTimeout(res, 600));
        const username = data.username || `user${Date.now()}`;
        const newUser: User = {
          id: data.id || 'u-' + Date.now().toString(36),
          email: data.email || `user${Date.now()}@example.com`,
          username,
          display_name: data.display_name || username || 'New User',
          name: data.display_name || username || 'New User',
          handle: '@' + username,
          avatar: data.avatar || '',
          bio: data.bio || '',
          followers_count: 0,
          following_count: 0,
          posts_count: 0,
          floor_level: 1,
        };
        set({ user: newUser, isAuthenticated: true });
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      updateUser: (patch) => set((s) => ({ user: s.user ? { ...s.user, ...patch } : s.user })),

      loadMockUserIfNone: () => {
        const { user } = get();
        if (!user) {
          // create a default guest user that matches post author
          const g: User = {
            id: 'currentUser',
            email: 'guest@elevator.local',
            username: 'mahmoud',
            display_name: 'Mahmoud Ammar',
            name: 'Mahmoud Ammar',
            handle: '@mahmoud',
            avatar: '👨‍💻',
            bio: 'Full Stack Developer @Elevator',
            followers_count: 1250,
            following_count: 42,
            posts_count: 88,
            floor_level: 12,
          };
          set({ user: g, isAuthenticated: true });
        }
      },

      fetchCurrentUser: async () => {
        // In a real app this would call the API. Here we simulate a short refresh.
        await new Promise((res) => setTimeout(res, 400));
        const { user } = get();
        if (user) {
          // simulate refresh by touching timestamp on user object
          set({ user: { ...user, lastRefreshed: new Date().toISOString() } as any });
        }
      },
    }),
    { name: 'auth-storage' }
  )
);
