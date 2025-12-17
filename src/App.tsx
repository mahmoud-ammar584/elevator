import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useAuthStore } from './store/authStore';
import { usePostsStore } from './store/postsStore';
import { useUIStore } from './store/uiStore';
import { Menu } from 'lucide-react';

import AuthPage from './components/AuthPage';
import Sidebar from './components/Sidebar';
import RightPanel from './components/RightPanel';
import PostCard from './components/PostCard';
import NewPostModal from './components/NewPostModal';
import CommentsModal from './components/CommentsModal';
import ChatPanel from './components/ChatPanel';
import ProfilePage from './components/ProfilePage';
import StoriesBar from './components/StoriesBar';
import NotificationsSimulator from './components/NotificationsSimulator';
import SettingsPage from './components/SettingsPage';
import SkeletonPost from './components/SkeletonPost';
import FooterModal from './components/FooterModal';
import FloatingDock from './components/FloatingDock';
import CreatePostInput from './components/CreatePostInput';
import { registerSW } from './registerServiceWorker';
import { Toaster, toast } from 'react-hot-toast';

export default function App(): JSX.Element {
  // AUTH store
  const { isAuthenticated, user, fetchCurrentUser, loadMockUserIfNone, login, logout } = useAuthStore();

  // POSTS store
  const { posts, fetchFeed, isLoading, createPost, likeToggle, deletePost } = usePostsStore();

  // UI store
  const { isSidebarOpen, toggleSidebar, lang, theme, accentColor, followedUsers, toggleFollow } = useUIStore();

  // Local UI state
  const [currentPage, setCurrentPage] = useState<'home' | 'settings' | 'profile' | 'notifications' | 'explore' | 'upload'>('home');
  const [showNewPost, setShowNewPost] = useState(false);
  const [showComments, setShowComments] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // New post modal data
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostMedia, setNewPostMedia] = useState<{ type: string; name: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Chat state
  const [chats, setChats] = useState<any[]>([]);
  const [activeChat, setActiveChat] = useState<any | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false);

  // Comments input
  const [commentText, setCommentText] = useState('');

  // Active hashtag filter
  const [activeHashtag, setActiveHashtag] = useState<string | null>(null);

  // Footer modal state
  const [activeModal, setActiveModal] = useState<'about' | 'help' | 'terms' | 'privacy' | 'api' | null>(null);

  const isRTL = lang === 'ar';

  useEffect(() => {
    if (import.meta.env.PROD) registerSW();
  }, []);

  useEffect(() => {
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
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty('--elevator-neon', accentColor);
    const glowColor = accentColor === '#45F882'
      ? 'rgba(69, 248, 130, 0.4)'
      : 'rgba(255, 255, 255, 0.4)';
    document.documentElement.style.setProperty('--elevator-neon-glow', glowColor);
  }, [accentColor]);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const handleSetCurrentPage = useCallback((p: any) => {
    setCurrentPage(p);
    // If mobile, auto close sidebar if it was open (though sidebar handles this too, redundancy is safe)
    if (window.innerWidth < 1024) {
      // can call store action if needed
    }
  }, []);

  const onCreatePost = useCallback(async () => {
    if (!newPostContent.trim()) return;
    try {
      await createPost?.(newPostContent.trim());
      setNewPostContent('');
      setNewPostMedia(null);
      setShowNewPost(false);
      toast.success(lang === 'ar' ? 'تم النشر بنجاح' : 'Posted successfully');
    } catch (err) {
      toast.error('Failed to post');
    }
  }, [newPostContent, createPost, lang]);

  /* Handler for the inline CreatePostInput component */
  const handleCreatePost = async (content: string, image?: File) => {
    // Mock implementation for the inline input
    await createPost?.(content);
    toast.success(lang === 'ar' ? 'تم النشر بنجاح' : 'Posted successfully');
  };

  const onAddComment = useCallback((postId: string) => {
    usePostsStore.setState((s: any) => ({
      posts: s.posts.map((p: any) => (p.id === postId ? { ...p, comments_count: (p.comments_count || 0) + 1 } : p)),
    }));
    setCommentText('');
    toast.success(lang === 'ar' ? 'تمت إضافة تعليق' : 'Comment added');
  }, [lang]);

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

  const onDeletePost = useCallback((id: string) => {
    deletePost?.(id);
    toast.success(lang === 'ar' ? 'تم حذف المنشور' : 'Post deleted');
  }, [deletePost, lang]);

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
    const arr = (posts || [])
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
    return arr;
  }, [posts, followedUsers]);

  const onFollow = useCallback((userId: string) => {
    toggleFollow(userId);
  }, [toggleFollow]);

  const onHashtagClick = useCallback((tag: string) => {
    setActiveHashtag(tag);
    setSearchQuery(tag);
    setCurrentPage('home');
  }, []);

  const clearHashtagFilter = useCallback(() => {
    setActiveHashtag(null);
    setSearchQuery('');
  }, []);

  // Filter posts based on search/hashtag
  const filteredPosts = useMemo(() => {
    if (!activeHashtag) return posts || [];
    return (posts || []).filter((p: any) =>
      p.content?.toLowerCase().includes(activeHashtag.toLowerCase())
    );
  }, [posts, activeHashtag]);


  if (!isAuthenticated) {
    return (
      <AuthPage
        onLogin={async (email: string, password: string) => {
          try {
            await login(email, password);
          } catch (e) { }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--elevator-bg)] text-[var(--elevator-text)] relative transition-colors duration-300 selection:bg-[var(--elevator-neon)] selection:text-[var(--elevator-bg)]">
      <Toaster position="top-center" toastOptions={{
        style: {
          background: 'var(--elevator-card)',
          color: 'var(--elevator-text)',
          border: '1px solid var(--elevator-neon)',
          fontFamily: 'var(--font-heading)',
        }
      }} />

      {/* Sidebar Toggle for Mobile/Desktop */}
      {!isSidebarOpen && (
        <button
          onClick={() => toggleSidebar?.()}
          className={`
            fixed top-4 z-50 p-3 rounded-xl bg-[var(--elevator-card)] text-[var(--elevator-text)] 
            border border-[var(--elevator-border)] shadow-[0_4px_20px_rgba(0,0,0,0.3)] 
            hover:border-[var(--elevator-neon)] hover:text-[var(--elevator-neon)]
            transition-all duration-300 active:scale-95 group
            ${lang === 'ar' ? 'right-4' : 'left-4'}
          `}
          aria-label="Open Sidebar"
        >
          <Menu className="w-6 h-6 transform group-hover:rotate-180 transition-transform duration-500" />
        </button>
      )}

      {/* Floating Dock */}
      <FloatingDock
        activePage={currentPage}
        onNavigate={(p) => handleSetCurrentPage(p)}
      />

      <NotificationsSimulator />

      <Sidebar
        activePage={currentPage}
        setPage={handleSetCurrentPage}
        openChat={() => setShowChat(true)}
      />

      {/* Main Layout Area */}
      <main
        className="transition-all duration-300 min-h-screen pt-16 pb-32"
        style={{
          [isRTL ? 'paddingRight' : 'paddingLeft']: isSidebarOpen ? '320px' : '0'
        }}
      >
        <div className="max-w-2xl mx-auto px-4">

          {/* HOME FEED */}
          {currentPage === 'home' && (
            <div className="animate-fade-in space-y-6">
              <StoriesBar />
              <CreatePostInput onPost={handleCreatePost} />

              {/* Hashtag Banner */}
              {activeHashtag && (
                <div className="flex items-center justify-between bg-[var(--elevator-card)] p-4 rounded-xl border border-[var(--elevator-neon)] animate-fade-in">
                  <div>
                    <span className="text-[var(--elevator-text-dim)] text-xs uppercase tracking-wider block">Filtering by</span>
                    <span className="text-[var(--elevator-neon)] font-bold text-lg">#{activeHashtag}</span>
                  </div>
                  <button onClick={clearHashtagFilter} className="text-xs bg-[var(--elevator-bg)] px-3 py-1 rounded-lg border border-[var(--elevator-border)] hover:border-[var(--elevator-neon)] transition-colors">
                    CLEAR
                  </button>
                </div>
              )}

              {/* Post List */}
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post: any) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onLike={onLikePost}
                    onDelete={onDeletePost}
                    onBookmark={() => toast.success('Saved to bookmarks')}
                    openComments={(id: string) => setShowComments(id)}
                  />
                ))
              ) : (
                <div className="text-center py-20 opacity-50">
                  <p className="text-xl mb-2">🔭</p>
                  <p>No activity found on this floor.</p>
                </div>
              )}
            </div>
          )}

          {/* PROFILE PAGE */}
          {currentPage === 'profile' && (
            <div className="animate-slide-up">
              <ProfilePage
                currentUser={user}
                posts={posts.filter((p: any) => p.author?.id === user?.id)}
                onDelete={onDeletePost}
                onLike={onLikePost}
                onBookmark={() => { }}
                openComments={(id: string) => setShowComments(id)}
              />
            </div>
          )}

          {/* SETTINGS PAGE */}
          {currentPage === 'settings' && (
            <SettingsPage onClose={() => setCurrentPage('home')} />
          )}

          {/* NOTIFICATIONS PAGE */}
          {currentPage === 'notifications' && (
            <div className="animate-slide-up space-y-4">
              <h2 className="text-3xl font-bold mb-8">{lang === 'ar' ? 'الإشعارات' : 'Notifications'}</h2>
              {[1, 2, 3].map(i => (
                <div key={i} className="glass-panel p-5 rounded-2xl flex items-center gap-4 border border-[var(--elevator-border)] hover:border-[var(--elevator-neon)] transition-colors cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-[var(--elevator-card)] flex items-center justify-center text-xl shadow-inner">
                    🔔
                  </div>
                  <div>
                    <p className="font-bold text-[var(--elevator-text)]">New activity detected</p>
                    <p className="text-sm text-[var(--elevator-text-dim)]">Someone visited your floor.</p>
                  </div>
                  <div className="ml-auto text-xs text-[var(--elevator-text-dim)] font-mono">2m ago</div>
                </div>
              ))}
              <div className="text-center text-[var(--elevator-text-dim)] mt-8 opacity-50">
                Only recent alerts are shown here.
              </div>
            </div>
          )}

          {/* UPLOAD / EXPLORE Mocks */}
          {(currentPage === 'upload' || currentPage === 'explore') && (
            <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in text-center p-8">
              <div className="text-6xl mb-4 opacity-20">🚧</div>
              <h2 className="text-2xl font-bold mb-2">Under Construction</h2>
              <p className="text-[var(--elevator-text-dim)] mb-6">This floor is currently being renovated.</p>
              <button onClick={() => setCurrentPage('home')} className="btn-primary">Return to Lobby</button>
            </div>
          )}

        </div>
      </main>

      {/* Right Panel - Hidden on smaller screens */}
      {/* We use 2xl:block based on previous fix, ensuring it doesn't overlap */}
      <RightPanel
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        trending={trending}
        users={suggestedUsers}
        onFollow={onFollow}
        onHashtagClick={onHashtagClick}
        onFooterClick={(modal) => setActiveModal(modal as any)}
        activeHashtag={activeHashtag}
      />

      {/* Modals & Overlays */}
      <FooterModal activeModal={activeModal} onClose={() => setActiveModal(null)} />

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

      {showNewPost && (
        <NewPostModal
          currentUser={user}
          newPostContent={newPostContent}
          setNewPostContent={setNewPostContent}
          newPostMedia={newPostMedia}
          setNewPostMedia={setNewPostMedia}
          onCreate={onCreatePost}
          onClose={() => setShowNewPost(false)}
          fileInputRef={fileInputRef}
          onFileSelect={(e: React.ChangeEvent<HTMLInputElement>) => {
            const f = e.target.files?.[0];
            if (!f) return;
            setNewPostMedia({ type: f.type.startsWith('image') ? 'image' : 'video', name: f.name });
          }}
        />
      )}

      {showComments && (
        <CommentsModal
          postId={showComments}
          post={(posts || []).find((p: any) => p.id === showComments)}
          commentText={commentText}
          setCommentText={setCommentText}
          onAddComment={onAddComment}
          onClose={() => setShowComments(null)}
          currentUser={user}
        />
      )}
    </div>
  );
}
