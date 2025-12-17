import { create } from 'zustand';

export interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    is_verified?: boolean;
    floor_level?: number;
  };
  content: string;
  timestamp: string;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  bookmarks_count: number;
  is_liked: boolean;
  is_bookmarked: boolean;
  media?: any[];
  score?: number;
}

interface PostsState {
  posts: Post[];
  isLoading: boolean;
  fetchFeed: (refresh?: boolean) => Promise<void>;
  createPost: (content: string) => Promise<void>;
  likeToggle: (postId: string) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  addMockPost: () => void;
  simulateEngagement: () => void;
  clearAll: () => void;
}

const nowISO = () => new Date().toISOString();

export const usePostsStore = create<PostsState>((set, get) => ({
  posts: [],
  isLoading: false,

  fetchFeed: async (refresh = false) => {
    set({ isLoading: true });
    await new Promise((res) => setTimeout(res, 600));

    const mock: Post[] = [
      {
        id: 'p1',
        author: {
          id: '1',
          name: 'محمود',
          handle: '@mahmoud',
          avatar: '👨‍💻',
          is_verified: true,
          floor_level: 50
        },
        content: 'صباح الخير! 🌅 دي بوست تجريبي عن #elevator منصتنا الجديدة للتواصل الاجتماعي. شاركوني رأيكم! 💬',
        timestamp: nowISO(),
        likes_count: 127,
        comments_count: 23,
        shares_count: 15,
        bookmarks_count: 8,
        is_liked: false,
        is_bookmarked: false,
        score: 0,
      },
      {
        id: 'p2',
        author: {
          id: '2',
          name: 'سارة علي',
          handle: '@sara_dev',
          avatar: '👩‍💻',
          is_verified: true,
          floor_level: 34
        },
        content: 'تعلمت النهاردة حاجة جديدة في #react و #typescript 🚀 الـ hooks بتسهل الشغل جداً!',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        likes_count: 245,
        comments_count: 45,
        shares_count: 28,
        bookmarks_count: 32,
        is_liked: false,
        is_bookmarked: false,
        score: 0,
      },
      {
        id: 'p3',
        author: {
          id: '3',
          name: 'أحمد محمد',
          handle: '@ahmed_tech',
          avatar: '🧑‍🔬',
          floor_level: 12
        },
        content: '#تقنية جديدة: الذكاء الاصطناعي بيغير كل حاجة! 🤖 شاركوني تجاربكم مع AI',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        likes_count: 89,
        comments_count: 12,
        shares_count: 7,
        bookmarks_count: 5,
        is_liked: false,
        is_bookmarked: false,
        score: 0,
      },
      {
        id: 'p4',
        author: {
          id: '4',
          name: 'نور الدين',
          handle: '@nour_dev',
          avatar: '👨‍🎓',
          floor_level: 5
        },
        content: 'نصيحة للمبرمجين الجدد: #برمجة مش بس كود، دي طريقة تفكير! 💡 اتعلموا حل المشاكل الأول.',
        timestamp: new Date(Date.now() - 14400000).toISOString(),
        likes_count: 312,
        comments_count: 67,
        shares_count: 89,
        bookmarks_count: 45,
        is_liked: false,
        is_bookmarked: false,
        score: 0,
      },
      {
        id: 'p5',
        author: {
          id: '5',
          name: 'مريم سعيد',
          handle: '@mariam_ux',
          avatar: '👩‍🎨',
          floor_level: 88
        },
        content: 'تصميم الـ UI/UX عالم جميل! 🎨 #elevator منصة رائعة بتصميم مودرن. #react #typescript',
        timestamp: new Date(Date.now() - 28800000).toISOString(),
        likes_count: 178,
        comments_count: 34,
        shares_count: 21,
        bookmarks_count: 18,
        is_liked: false,
        is_bookmarked: false,
        score: 0,
      },
    ];

    const scored = mock.map((p) => ({
      ...p,
      score: p.likes_count * 1.5 + p.comments_count * 2 + p.shares_count * 2.5,
    }));

    const sorted = scored.sort((a, b) => (b.score || 0) - (a.score || 0));

    set({
      posts: refresh ? sorted : [...get().posts, ...sorted],
      isLoading: false,
    });
  },

  createPost: async (content) => {
    const id = 'p' + Date.now().toString(36);

    const newPost: Post = {
      id,
      author: {
        id: 'me',
        name: 'You',
        handle: '@you',
        floor_level: 99
      },
      content,
      timestamp: nowISO(),
      likes_count: 0,
      comments_count: 0,
      shares_count: 0,
      bookmarks_count: 0,
      is_liked: false,
      is_bookmarked: false,
      score: 0,
    };

    set((s) => ({
      posts: [newPost, ...s.posts],
    }));
  },

  likeToggle: async (postId) => {
    set((s) => ({
      posts: s.posts.map((p) => {
        if (p.id !== postId) return p;
        const liked = !p.is_liked;
        return {
          ...p,
          is_liked: liked,
          likes_count: liked ? p.likes_count + 1 : p.likes_count - 1,
          score: (liked ? p.likes_count + 1 : p.likes_count - 1) * 1.5 + p.comments_count * 2 + p.shares_count * 2.5,
        };
      }),
    }));
  },

  deletePost: async (postId) => {
    set((s) => ({
      posts: s.posts.filter((p) => p.id !== postId),
    }));
  },

  addMockPost: () => {
    const mockUsers = [
      { id: '101', name: 'زينب', handle: '@zeinab_art', avatar: '🎨', floor_level: 12 },
      { id: '102', name: 'كريم', handle: '@kareem_fit', avatar: '💪', floor_level: 25 },
      { id: '103', name: 'عمر', handle: '@omr_travel', avatar: '✈️', floor_level: 42 },
      { id: '104', name: 'ليلى', handle: '@laila_cook', avatar: '🍳', floor_level: 7 },
    ];
    const topics = [
      'يا جماعة الجو النهاردة تحفة! ⛅',
      'لسه مخلص تمرين، إحساس رائع 💪 #fitness',
      'مين جرب المطعم الجديد في المعادي؟ 🍔',
      'العمل الحر محتاج تنظيم وقت جامد 🕒 #freelance',
      'صورة من رحلتي الأخيرة للدهب 🌊 #travel',
    ];

    const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    const randomContent = topics[Math.floor(Math.random() * topics.length)];
    const id = 'mock_p_' + Date.now();

    const newPost: Post = {
      id,
      author: randomUser,
      content: randomContent,
      timestamp: new Date().toISOString(),
      likes_count: 0,
      comments_count: 0,
      shares_count: 0,
      bookmarks_count: 0,
      is_liked: false,
      is_bookmarked: false,
      score: 100, // High score to appear at top
    };

    set((s) => ({
      posts: [newPost, ...s.posts]
    }));
  },

  simulateEngagement: () => {
    const posts = [...get().posts];
    if (!posts.length) return;

    const idx = Math.floor(Math.random() * posts.length);
    posts[idx].likes_count += Math.floor(Math.random() * 5);
    posts[idx].comments_count += Math.floor(Math.random() * 2);

    const reScored = posts.map((p) => ({
      ...p,
      score: p.likes_count * 1.5 + p.comments_count * 2 + p.shares_count * 2.5,
    }));

    reScored.sort((a, b) => (b.score || 0) - (a.score || 0));

    set({ posts: reScored });
  },

  clearAll: () => set({ posts: [] }),
}));
