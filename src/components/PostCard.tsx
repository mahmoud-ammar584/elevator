import React, { useState } from 'react';
import { Heart, MessageSquare, Share2, Bookmark, MoreHorizontal, Trash2, Check } from 'lucide-react';
import { formatTime } from '../utils/formatters';

type Post = any;

export default function PostCard({ post, onDelete, onLike, onBookmark, openComments }: { post: Post; onDelete: (id: string) => void; onLike: (id: string) => void; onBookmark: (id: string) => void; openComments: (id: string) => void; }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-white border-b border-gray-100 p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-2xl flex-shrink-0">{post.author.avatar}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-900">{post.author.name}</span>
            {post.author.verified && (<Check className="w-4 h-4 text-blue-500 fill-blue-500" />)}
            <span className="text-gray-500 text-sm">{post.author.handle}</span>
            <span className="text-gray-400 text-sm">•</span>
            <span className="text-gray-500 text-sm">{formatTime(post.timestamp)}</span>

            {post.author.id === 'currentUser' && (
              <div className="mr-auto relative">
                <button onClick={() => setShowMenu(!showMenu)} className="text-gray-400 hover:text-gray-600 p-1"><MoreHorizontal className="w-5 h-5" /></button>
                {showMenu && (
                  <div className="absolute left-0 top-8 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-10 min-w-40">
                    <button onClick={() => onDelete(post.id)} className="w-full px-4 py-2 text-right text-red-600 hover:bg-red-50 flex items-center gap-2"><Trash2 className="w-4 h-4" /><span className="text-sm">حذف المنشور</span></button>
                  </div>
                )}
              </div>
            )}
          </div>

          <p className="text-gray-900 mb-3 leading-relaxed whitespace-pre-wrap">{post.content}</p>

          {post.media && (<div className="mb-3 rounded-2xl overflow-hidden bg-gray-100 aspect-video flex items-center justify-center"><div className="text-6xl">{post.media.type === 'image' ? '🖼️' : '🎥'}</div></div>)}

          <div className="flex items-center gap-6 text-gray-500">
            <button onClick={() => onLike(post.id)} className={`flex items-center gap-2 hover:text-red-500 transition-colors group ${post.likedBy.includes('currentUser') ? 'text-red-500' : ''}`}><Heart className={`w-5 h-5 ${post.likedBy.includes('currentUser') ? 'fill-red-500' : ''} group-hover:scale-110 transition-transform`} /><span className="text-sm font-medium">{post.likes}</span></button>
            <button onClick={() => openComments(post.id)} className="flex items-center gap-2 hover:text-blue-500 transition-colors group"><MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" /><span className="text-sm font-medium">{post.comments}</span></button>
            <button onClick={() => alert('تمت المشاركة')} className="flex items-center gap-2 hover:text-green-500 transition-colors group"><Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" /><span className="text-sm font-medium">{post.shares}</span></button>
            <button onClick={() => onBookmark(post.id)} className={`mr-auto hover:text-yellow-500 transition-colors ${post.bookmarkedBy.includes('currentUser') ? 'text-yellow-500' : ''}`}><Bookmark className={`w-5 h-5 ${post.bookmarkedBy.includes('currentUser') ? 'fill-yellow-500' : ''}`} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}