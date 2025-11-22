import React, { useEffect, useRef, useState } from 'react';
import AuthPage from './components/AuthPage';
import Sidebar from './components/Sidebar';
import RightPanel from './components/RightPanel';
import PostCard from './components/PostCard';
import NewPostModal from './components/NewPostModal';
import CommentsModal from './components/CommentsModal';
import ChatPanel from './components/ChatPanel';
import { INITIAL_POSTS } from './data/initialData';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState<'home'|'explore'|'notifications'|'messages'|'profile'|'bookmarks'>('home');
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostMedia, setNewPostMedia] = useState<any | null>(null);
  const [showComments, setShowComments] = useState<string|null>(null);
  const [commentText, setCommentText] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<any[]>([]);
  const [users] = useState([ { id: 'suggest1', name: 'خالد أحمد', handle: '@khaled_code', avatar: '👨‍💻', followers: 1200, isFollowing: false }, { id: 'suggest2', name: 'مريم سعيد', handle: '@mariam_ux', avatar: '👩‍🎨', followers: 850, isFollowing: false } ]);
  const [trending] = useState([ { tag: '#برمجة', posts: '12.5k', growth: '+15%' }, { tag: '#تصميم', posts: '8.3k', growth: '+8%' }]);
  const [chats, setChats] = useState<any[]>([]);
  const [activeChat, setActiveChat] = useState<any | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => { if (activeChat) { const el = document.getElementById('messages-end'); el?.scrollIntoView({ behavior: 'smooth' }); } }, [activeChat, chats]);

  const handleLogin = (email: string, password: string) => {
    setCurrentUser({ id: 'currentUser', name: 'أنت', handle: '@you', avatar: '😊', email, bio: 'مطور واجهات أمامية', location: 'القاهرة', joinDate: 'يناير 2024', followers: 234, following: 189, postsCount: 42 });
    setIsAuthenticated(true);
    return true;
  };

  const handleLogout = () => { setIsAuthenticated(false); setCurrentUser(null); setCurrentPage('home'); };

  const generateId = () => Math.random().toString(36).slice(2, 9);

  const handleNewPost = () => {
    if (newPostContent.trim()) {
      const newPost = { id: generateId(), author: { id: currentUser.id, name: currentUser.name, handle: currentUser.handle, avatar: currentUser.avatar, verified: false }, content: newPostContent, timestamp: new Date().toISOString(), likes: 0, comments: 0, shares: 0, media: newPostMedia, likedBy: [], bookmarkedBy: [] };
      setPosts([newPost, ...posts]); setNewPostContent(''); setNewPostMedia(null); setShowNewPost(false); setCurrentUser((p: any) => ({ ...p, postsCount: p.postsCount + 1 }));
    }
  };

  const handleLike = (postId: string) => { setPosts(posts.map(p => p.id === postId ? ({ ...p, likes: p.likedBy.includes('currentUser') ? p.likes - 1 : p.likes + 1, likedBy: p.likedBy.includes('currentUser') ? p.likedBy.filter((x: string) => x !== 'currentUser') : [...p.likedBy, 'currentUser'] }) : p)); };
  const handleBookmark = (postId: string) => { setPosts(posts.map(p => p.id === postId ? ({ ...p, bookmarkedBy: p.bookmarkedBy.includes('currentUser') ? p.bookmarkedBy.filter((x: string) => x !== 'currentUser') : [...p.bookmarkedBy, 'currentUser'] }) : p)); };
  const handleCommentAdd = (postId: string) => { if (commentText.trim()) { setPosts(posts.map(p => p.id === postId ? ({ ...p, comments: p.comments + 1 }) : p)); setCommentText(''); setShowComments(null); } };
  const handleShare = (postId: string) => { setPosts(posts.map(p => p.id === postId ? ({ ...p, shares: p.shares + 1 }) : p)); alert('تم مشاركة المنشور!'); };
  const handleDeletePost = (postId: string) => { if (confirm('هل أنت متأكد من حذف هذا المنشور؟')) { setPosts(posts.filter(p => p.id !== postId)); setCurrentUser((p:any) => ({ ...p, postsCount: p.postsCount - 1 })); } };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (file) setNewPostMedia({ type: file.type.startsWith('image/') ? 'image' : 'video', file }); };

  const markNotificationsAsRead = () => setNotifications(notifications.map(n => ({ ...n, read: true })));

  const sendMessage = () => { if (newMessage.trim() && activeChat) { const idx = chats.findIndex(c => c.id === activeChat.id); if (idx !== -1) { const copy = [...chats]; const msg = { id: generateId(), sender: 'currentUser', content: newMessage, timestamp: new Date().toISOString() }; copy[idx].messages.push(msg); copy[idx].lastMessage = newMessage; copy[idx].timestamp = new Date().toISOString(); setChats(copy); setNewMessage(''); } } };

  const onFollow = (userId: string) => console.log('follow', userId);

  if (!isAuthenticated) return <AuthPage onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} notificationsCount={notifications.filter(n => !n.read).length} chatsCount={chats.reduce((s, c) => s + (c.unread || 0), 0)} currentUser={currentUser} onLogout={handleLogout} openNewPost={() => setShowNewPost(true)} openSettings={() => setShowSettings(true)} />

      <div className="mr-64 ml-80">
        <div className="max-w-2xl mx-auto">
          {currentPage === 'home' && (
            <>
              <div className="bg-white border-b border-gray-200 sticky top-0 z-10"><div className="p-6"><h2 className="text-xl font-bold text-gray-900">الصفحة الرئيسية</h2></div></div>
              {posts.map((post:any) => <PostCard key={post.id} post={post} onDelete={handleDeletePost} onLike={handleLike} onBookmark={handleBookmark} openComments={(id:string)=>setShowComments(id)} />)}
            </>
          )}

          {currentPage === 'notifications' && (<><div className="bg-white border-b border-gray-200 sticky top-0 z-10"><div className="p-6"><h2 className="text-xl font-bold text-gray-900">الإشعارات</h2></div></div>{notifications.map(n=> (<div key={n.id} className={`bg-white border-b border-gray-100 p-6 hover:bg-gray-50 transition-colors ${!n.read ? 'bg-blue-50':''}`}><div className="flex items-start gap-3"><div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-white">{n.type==='like' ? '❤' : '💬'}</div><div className="flex-1"><p className="text-gray-900"><span className="font-semibold">{n.user.name}</span> {n.action}</p><p className="text-sm text-gray-500 mt-1">{new Date(n.timestamp).toLocaleString()}</p></div>{!n.read && (<div className="w-2 h-2 bg-blue-500 rounded-full"></div>)}</div></div>))}</>)}

          {currentPage === 'bookmarks' && (<><div className="bg-white border-b border-gray-200 sticky top-0 z-10"><div className="p-6"><h2 className="text-xl font-bold text-gray-900">المحفوظات</h2></div></div>{posts.filter(p=>p.bookmarkedBy.includes('currentUser')).map((post:any)=> <PostCard key={post.id} post={post} onDelete={handleDeletePost} onLike={handleLike} onBookmark={handleBookmark} openComments={(id:string)=>setShowComments(id)} />)}</>)}
        </div>
      </div>

      <RightPanel searchQuery={searchQuery} setSearchQuery={setSearchQuery} trending={trending} users={users} onFollow={onFollow} />

      {showNewPost && <NewPostModal currentUser={currentUser} newPostContent={newPostContent} setNewPostContent={setNewPostContent} newPostMedia={newPostMedia} setNewPostMedia={setNewPostMedia} onCreate={handleNewPost} onClose={() => setShowNewPost(false)} />}

      {showComments && <CommentsModal postId={showComments} commentText={commentText} setCommentText={setCommentText} onAddComment={handleCommentAdd} onClose={() => setShowComments(null)} />}

      <ChatPanel chats={chats} activeChat={activeChat} setActiveChat={setActiveChat} newMessage={newMessage} setNewMessage={setNewMessage} sendMessage={sendMessage} />
    </div>
  );
}