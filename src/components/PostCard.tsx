import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Bookmark, ArrowUp, Flag, Ban, X } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import { formatTime } from '../utils/formatters';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

type Post = {
  id: string;
  author: {
    id: string; // Ensure ID is present
    name: string;
    handle: string;
    avatar: string;
    isVerified?: boolean;
    floor_level?: number;
  };
  content: string;
  image?: string;
  video?: string;
  likes_count: number;
  comments_count: number;
  timestamp: string;
  is_liked: boolean;
};

type Props = {
  post: Post;
  onDelete: (id: string) => void;
  onLike: (id: string) => void;
  onBookmark: (id: string) => void;
  openComments: (id: string) => void;
};

export default function PostCard({ post, onDelete, onLike, onBookmark, openComments }: Props) {
  const { lang, followedUsers, toggleFollow } = useUIStore();
  const [showMenu, setShowMenu] = useState(false);
  const [isLifted, setIsLifted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Safely access author ID and check follow status via global store
  const authorId = post.author?.id;
  const isFollowing = followedUsers?.includes(authorId);
  const isRTL = lang === 'ar';

  const handleLift = () => {
    setIsLifted(true);
    setTimeout(() => setIsLifted(false), 1000);
    onLike(post.id);
  };

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (authorId) {
      toggleFollow(authorId);
      toast.success(isFollowing
        ? (lang === 'ar' ? `تم إلغاء متابعة ${post.author.name}` : `Unfollowed ${post.author.name}`)
        : (lang === 'ar' ? `تمت متابعة ${post.author.name}` : `Following ${post.author.name}`)
      );
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `Post by ${post.author.name}`,
      text: post.content,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success(lang === 'ar' ? 'تمت المشاركة بنجاح' : 'Shared successfully');
      } catch (err) {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(`${post.author.name}: ${post.content}`);
      toast.success(lang === 'ar' ? 'تم نسخ الرابط' : 'Link copied to clipboard');
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark(post.id);
    toast.success(isBookmarked
      ? (lang === 'ar' ? 'تمت إزالة الحفظ' : 'Removed from bookmarks')
      : (lang === 'ar' ? 'تم الحفظ في المجموعة' : 'Saved to collection')
    );
  };

  const handleReport = () => {
    setShowMenu(false);
    toast.success(lang === 'ar' ? 'تم استلام البلاغ' : 'Report received. We will review this.');
  };

  const handleBlock = () => {
    setShowMenu(false);
    toast.error(lang === 'ar' ? 'تم حظر المستخدم مؤقتاً' : 'User blocked temporarily');
  };

  return (
    <div className="glass-card mb-6 animate-slide-up relative group border border-[var(--elevator-border)] hover:border-[var(--elevator-neon)]/30 transition-all duration-300">
      <div className="flex items-start gap-4 p-5">
        <div className="relative">
          <div className="w-12 h-12 rounded-xl bg-[var(--elevator-bg)] border border-[var(--elevator-border)] flex items-center justify-center text-2xl shadow-lg relative z-10 overflow-hidden group-hover:shadow-[0_0_15px_rgba(69,248,130,0.2)] transition-shadow">
            {post.author.avatar}
          </div>
          {/* Floor Badge Indicator */}
          <div className="absolute -bottom-2 -right-2 bg-[var(--elevator-card)] border border-[var(--elevator-neon)] text-[var(--elevator-neon)] text-[9px] font-bold px-1.5 py-0.5 rounded font-mono shadow-[0_0_8px_rgba(69,248,130,0.4)] z-20">
            F{post.author.floor_level || Math.floor(Math.random() * 99)}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[var(--elevator-text)] text-base hover:text-[var(--elevator-neon)] cursor-pointer transition-colors">
                  {post.author.name}
                </span>
                {post.author.isVerified && (
                  <span className="text-[var(--elevator-cyan)] text-xs">●</span>
                )}
                <span className="text-[var(--elevator-text-dim)] text-xs font-mono">
                  {post.author.handle}
                </span>

                {/* Follow Button */}
                <button
                  onClick={handleFollow}
                  className={`
                    ml-2 text-[10px] px-2 py-0.5 rounded-full border transition-all duration-300
                    ${isFollowing
                      ? 'border-red-500/50 text-red-400 hover:bg-red-500/10'
                      : 'border-[var(--elevator-neon)] text-[var(--elevator-neon)] hover:bg-[var(--elevator-neon)] hover:text-[var(--elevator-bg)]'
                    }
                  `}
                >
                  {isFollowing ? (isRTL ? 'إلغاء' : 'Unfollow') : (isRTL ? 'متابعة' : 'Follow')}
                </button>
              </div>
              <span className="text-[10px] text-[var(--elevator-text-muted)] font-mono tracking-wider">
                {formatTime(post.timestamp)}
              </span>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="text-[var(--elevator-text-dim)] hover:text-[var(--elevator-text)] p-1 rounded-full hover:bg-[var(--elevator-overlay)] transition-colors"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>

              {showMenu && (
                <div className={`
                  absolute top-full mt-2 w-48 bg-[var(--elevator-card)] border border-[var(--elevator-border)] rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-20 overflow-hidden backdrop-blur-xl
                  ${lang === 'ar' ? 'left-0' : 'right-0'}
                  animate-fade-in
                `}>
                  <button onClick={handleReport} className="w-full text-start px-4 py-3 text-sm hover:bg-[var(--elevator-overlay)] flex items-center gap-2 text-[var(--elevator-text)] transition-colors">
                    <Flag className="w-4 h-4" /> {lang === 'ar' ? 'إبلاغ' : 'Report Post'}
                  </button>
                  <button onClick={handleBlock} className="w-full text-start px-4 py-3 text-sm hover:bg-[var(--elevator-overlay)] flex items-center gap-2 text-[var(--elevator-text)] transition-colors">
                    <Ban className="w-4 h-4" /> {lang === 'ar' ? 'حظر' : 'Block User'}
                  </button>
                  <div className="h-px bg-[var(--elevator-border)] my-1"></div>
                  <button onClick={() => onDelete(post.id)} className="w-full text-start px-4 py-3 text-sm text-[var(--elevator-alert)] hover:bg-[rgba(255,76,97,0.1)] flex items-center gap-2 transition-colors">
                    <X className="w-4 h-4" /> {lang === 'ar' ? 'حذف' : 'Delete'}
                  </button>
                </div>
              )}
            </div>
          </div>

          <p className="mt-3 text-[var(--elevator-text)] leading-relaxed whitespace-pre-wrap font-light">
            {post.content}
          </p>

          {post.image && (
            <div
              className="mt-4 rounded-2xl overflow-hidden border border-[var(--elevator-border)] shadow-lg relative group/image cursor-pointer"
              onClick={() => {
                window.open(post.image, '_blank');
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity"></div>
              <img
                src={post.image}
                alt="Post content"
                className="w-full h-auto object-cover max-h-[500px]"
                loading="lazy"
              />
            </div>
          )}

          {/* Action Bar */}
          <div className="flex items-center justify-between mt-5 pt-4 border-t border-[var(--elevator-border)]/50">
            {/* LIFT BUTTON (Replaces Like) */}
            <button
              onClick={handleLift}
              className={`
                group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 relative overflow-hidden
                ${post.is_liked
                  ? 'bg-[var(--elevator-neon)]/10 text-[var(--elevator-neon)] border border-[var(--elevator-neon)] shadow-[0_0_15px_rgba(69,248,130,0.2)]'
                  : 'text-[var(--elevator-text-dim)] hover:bg-[var(--elevator-overlay)]'
                }
              `}
            >
              <div className={`absolute inset-0 bg-[var(--elevator-neon)]/20 translate-y-full transition-transform duration-300 ${isLifted ? 'animate-lift-bg' : ''}`}></div>
              <ArrowUp className={`w-5 h-5 transition-transform duration-500 ${isLifted ? 'animate-lift-arrow' : ''}`} />
              <span className="font-bold font-mono text-sm relative">
                {post.likes_count + (post.is_liked ? 0 : 0)}
                <span className="hidden group-hover:inline ml-1 text-[10px] uppercase">{lang === 'ar' ? 'رفع' : 'LIFT'}</span>
              </span>
            </button>

            <button
              onClick={() => openComments(post.id)}
              className="flex items-center gap-2 text-[var(--elevator-text-dim)] hover:text-[var(--elevator-cyan)] transition-colors group px-2 py-1"
            >
              <div className="p-2 rounded-full group-hover:bg-[var(--elevator-cyan)]/10 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-sm font-mono">{post.comments_count}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-[var(--elevator-text-dim)] hover:text-[var(--elevator-accent)] transition-colors group px-2 py-1"
            >
              <div className="p-2 rounded-full group-hover:bg-[var(--elevator-accent)]/10 transition-colors">
                <Share2 className="w-5 h-5" />
              </div>
            </button>

            <button
              onClick={handleBookmark}
              className={`flex items-center gap-2 transition-colors group px-2 py-1 ${isBookmarked ? 'text-[var(--elevator-accent)]' : 'text-[var(--elevator-text-dim)] hover:text-[var(--elevator-accent)]'}`}
            >
              <div className="p-2 rounded-full group-hover:bg-[var(--elevator-accent)]/10 transition-colors">
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Background glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--elevator-neon)]/0 via-[var(--elevator-neon)]/0 to-[var(--elevator-neon)]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl"></div>
    </div>
  );
}