import React, { useEffect, useState, useRef, useCallback, useMemo, Suspense, lazy } from 'react';
import { useAuthStore } from './store/authStore';
import { usePostsStore } from './store/postsStore';
import { useUIStore } from './store/uiStore';
import { Menu, Zap } from 'lucide-react';

// Core Components
import AuthPage from './components/AuthPage';
import Sidebar from './components/Sidebar';
import RightPanel from './components/RightPanel';
import PostCard from './components/PostCard';
import StoriesBar from './components/StoriesBar';
import NotificationsSimulator from './components/NotificationsSimulator';
import SkeletonPost from './components/SkeletonPost';
import FooterModal from './components/FooterModal';
import FloatingDock from './components/FloatingDock';
import CreatePostInput from './components/CreatePostInput';
import ElevatorSimulation from './components/elevator/ElevatorSimulation';

// Heavy / Secondary Components (Lazy Loaded)
const ProfilePage = lazy(() => import('./components/ProfilePage'));
const SettingsPage = lazy(() => import('./components/SettingsPage'));
const ChatPanel = lazy(() => import('./components/ChatPanel'));

import { registerSW } from './registerServiceWorker';
import { Toaster, toast } from 'react-hot-toast';

export default function App(): JSX.Element {
  const { isAuthenticated, user, fetchCurrentUser, loadMockUserIfNone, login } = useAuthStore();
  const { posts, fetchFeed, isLoading, createPost, likeToggle, deletePost } = usePostsStore();
  const {
    isSidebarOpen, toggleSidebar, lang, theme, accentColor,
    followedUsers, toggleFollow, goToFloor, currentFloor, elevatorStatus
  } = useUIStore();

  const [currentPage, setCurrentPage] = useState<'home' | 'settings' | 'profile' | 'notifications' | 'explore' | 'upload'>('home');
  const [showComments, setShowComments] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeHashtag, setActiveHashtag] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<'about' | 'help' | 'terms' | 'privacy' | 'api' | null>(null);

  // Chat state
  const [chats, setChats] = useState<any[]>([]);
  const [activeChat, setActiveChat] = useState<any | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false);

  // Keyboard Shortcuts (a11y & Polish)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      // Number keys 0-9 to select floors
      if (e.key >= '0' && e.key <= '9') {
        goToFloor(parseInt(e.key));
        toast(`Moving to floor ${e.key}...`, { icon: '🏙️', duration: 1500 });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToFloor]);

  const isRTL = lang === 'ar';

  useEffect(() => {
    if (import.meta.env.PROD) registerSW();
    loadMockUserIfNone?.();
  }, [loadMockUserIfNone]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCurrentUser?.();
      fetchFeed?.(true);
    }
  }, [isAuthenticated, fetchCurrentUser, fetchFeed]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.setProperty('--elevator-neon', accentColor);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [theme, accentColor, lang]);

  const handleSetCurrentPage = useCallback((p: any) => {
    setCurrentPage(p);
  }, []);

  const handleCreatePost = async (content: string) => {
    await createPost?.(content);
    toast.success(lang === 'ar' ? 'تم النشر بنجاح' : 'Posted successfully');
  };

  const sendMessage = useCallback(() => {
    if (!activeChat || !newMessage.trim()) return;
    const msg = {
      id: 'm' + Date.now(),
      sender: 'currentUser',
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };
    setChats((c) => c.map((ch) => (ch.id === activeChat.id ? { ...ch, messages: [...(ch.messages || []), msg] } : ch)));
    setNewMessage('');
  }, [activeChat, newMessage]);

  const onLikePost = useCallback((id: string) => {
    likeToggle?.(id);
  }, [likeToggle]);

  const trending = useMemo(() => {
    const formatNumber = (num: number) => num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();
    const defaultTags = ['#elevator', '#tech', '#cyberpunk', '#innovation', '#future'];
    return defaultTags.map((tag, i) => ({
      id: i,
      tag,
      growth: `+${Math.floor(Math.random() * 50) + 10}%`,
      posts: formatNumber(Math.floor(Math.random() * 20000) + 1000),
    }));
  }, []);

  const suggestedUsers = useMemo(() => {
    return (posts || [])
      .map((p: any) => {
        const author = p.author || {};
        const id = author.id ?? author._id ?? `u-${p.id}`;
        return {
          id,
          name: author.name ?? author.handle ?? 'User',
          handle: author.handle ?? `@user${p.id}`,
          avatar: author.avatar ?? '👤',
          followers: Math.floor(Math.random() * 1000) + 100,
          isFollowing: followedUsers.includes(id),
          floor_level: author.floor_level || Math.floor(Math.random() * 50) + 1
        };
      })
      .filter((v: any, i: number, a: any[]) => a.findIndex((x) => x.id === v.id) === i)
      .slice(0, 6);
  }, [posts, followedUsers]);

  const filteredPosts = useMemo(() => {
    let p = posts || [];
    if (activeHashtag) {
      p = p.filter((item: any) => item.content?.toLowerCase().includes(activeHashtag.toLowerCase()));
    }

    if (currentFloor !== 99) {
      p = p.filter((item: any) => (item.author?.floor_level || 0) <= currentFloor);
    }

    return p;
  }, [posts, activeHashtag, currentFloor]);

  if (!isAuthenticated) {
    return (
      <AuthPage onLogin={async (email, password) => { try { await login(email, password); } catch (e) { } }} />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--elevator-bg)] text-[var(--elevator-text)] relative transition-colors duration-300">
      <Toaster position="top-center" />
      <NotificationsSimulator />

      {/* Sidebar Toggle */}
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className={`fixed top-4 z-50 p-3 rounded-xl bg-[var(--elevator-card)] text-[var(--elevator-text)] border border-[var(--elevator-border)] transition-all ${lang === 'ar' ? 'right-4' : 'left-4'}`}
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* SIDEBAR */}
      <Sidebar activePage={currentPage} setPage={handleSetCurrentPage} openChat={() => setShowChat(true)} />

      {/* Main Layout Area - 3 Column Design (Elevator | Main | Right) */}
      <div
        className={`
          transition-all duration-300 min-h-screen px-4 lg:px-8 py-20 flex flex-col lg:flex-row gap-8
          ${isSidebarOpen ? (isRTL ? 'lg:pr-[320px]' : 'lg:pl-[320px]') : ''}
        `}
      >
        {/* LEFT COLUMN: Elevator HUD & Simulation (Hidden on mobile) */}
        <div className="hidden lg:block w-72 flex-shrink-0" role="complementary" aria-label="Elevator Status">
          <ElevatorSimulation />
        </div>

        {/* CENTER COLUMN: Content */}
        <div className="flex-1 max-w-2xl mx-auto w-full" role="main">
          <Suspense fallback={<div className="p-20 text-center animate-pulse">Loading Floor Content...</div>}>
            {currentPage === 'home' && (
              <div className={`space-y-6 ${elevatorStatus === 'moving' ? 'blur-sm grayscale' : 'transition-all duration-700'}`}>
                <StoriesBar />
                <CreatePostInput onPost={handleCreatePost} />

                {/* Floor Status Indicator */}
                <div className="flex items-center gap-2 px-2 opacity-50 font-mono text-[10px] tracking-widest uppercase">
                  <Zap className="w-3 h-3 text-[var(--elevator-neon)]" />
                  Viewing Sector: Floor {currentFloor}
                </div>

                {activeHashtag && (
                  <div className="flex items-center justify-between bg-[var(--elevator-card)] p-4 rounded-xl border border-[var(--elevator-neon)]">
                    <span className="text-[var(--elevator-neon)] font-bold text-lg">#{activeHashtag}</span>
                    <button onClick={() => setActiveHashtag(null)} className="text-xs">CLEAR</button>
                  </div>
                )}

                {isLoading ? <SkeletonPost /> : (
                  filteredPosts.map((post: any) => (
                    <PostCard key={post.id} post={post} onLike={onLikePost} onDelete={deletePost} onBookmark={() => { }} openComments={setShowComments} />
                  ))
                )}
              </div>
            )}

            {currentPage === 'profile' && <ProfilePage currentUser={user} posts={posts.filter((p: any) => p.author?.id === user?.id)} onDelete={deletePost} onLike={onLikePost} onBookmark={() => { }} openComments={setShowComments} />}
            {currentPage === 'settings' && <SettingsPage onClose={() => setCurrentPage('home')} />}
          </Suspense>
        </div>

        {/* RIGHT COLUMN: Info (Only 2XL+) */}
        <div className="hidden 2xl:block w-80 flex-shrink-0">
          <RightPanel searchQuery={searchQuery} setSearchQuery={setSearchQuery} trending={trending} users={suggestedUsers} onFollow={toggleFollow} onHashtagClick={setActiveHashtag} onFooterClick={setActiveModal} activeHashtag={activeHashtag} />
        </div>
      </div>

      {/* Floating Dock & Shared Elements */}
      <FloatingDock activePage={currentPage} onNavigate={handleSetCurrentPage} />
      <FooterModal activeModal={activeModal} onClose={() => setActiveModal(null)} />

      {/* Lazy Modals */}
      <Suspense fallback={null}>
        {showChat && (
          <ChatPanel
            chats={chats}
            activeChat={activeChat}
            setActiveChat={setActiveChat}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessage={sendMessage}
            onClose={() => setShowChat(false)}
          />
        )}
      </Suspense>
    </div>
  );
}
