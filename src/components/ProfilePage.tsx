import React from 'react';
import { MapPin, Calendar, ExternalLink, Edit } from 'lucide-react';
import PostCard from './PostCard';

type Props = {
  currentUser: any;
  posts: any[];
  onDelete: (id: string) => void;
  onLike: (id: string) => void;
  onBookmark: (id: string) => void;
  openComments: (id: string) => void;
};

export default function ProfilePage({ currentUser, posts, onDelete, onLike, onBookmark, openComments }: Props) {
  return (
    <div>
      <div className="bg-white border-b border-gray-200">
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 relative">
          <div className="absolute inset-0 bg-black opacity-10"></div>
        </div>

        <div className="px-6 pb-4">
          {/* Profile Picture */}
          <div className="flex items-end justify-between -mt-16 mb-4">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full border-4 border-white flex items-center justify-center text-5xl shadow-lg">
              {currentUser?.avatar}
            </div>
            <button className="px-4 py-2 border border-gray-300 text-gray-900 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Edit className="w-4 h-4" />
              تعديل الملف
            </button>
          </div>

          {/* User Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{currentUser?.name}</h2>
            <p className="text-gray-500">{currentUser?.handle}</p>
            <p className="text-gray-900 mt-3 leading-relaxed">{currentUser?.bio}</p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
              {currentUser?.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{currentUser.location}</span>
                </div>
              )}
              {currentUser?.website && (
                <div className="flex items-center gap-1">
                  <ExternalLink className="w-4 h-4" />
                  <a
                    href={currentUser.website}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    الموقع الإلكتروني
                  </a>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>انضم في {currentUser?.joinDate}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-4">
              <button className="hover:underline">
                <span className="font-bold text-gray-900">{currentUser?.following}</span>
                <span className="text-gray-600 mr-1">متابَع</span>
              </button>
              <button className="hover:underline">
                <span className="font-bold text-gray-900">{currentUser?.followers}</span>
                <span className="text-gray-600 mr-1">متابِع</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-t border-gray-100">
          <button className="flex-1 py-4 text-center font-medium text-gray-900 border-b-2 border-gray-900">
            المنشورات ({currentUser?.postsCount})
          </button>
          <button className="flex-1 py-4 text-center font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            الوسائط
          </button>
          <button className="flex-1 py-4 text-center font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            الإعجابات
          </button>
        </div>
      </div>

      {/* Posts */}
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onDelete={onDelete}
          onLike={onLike}
          onBookmark={onBookmark}
          openComments={openComments}
        />
      ))}

      {posts.length === 0 && (
        <div className="bg-white p-12 text-center">
          <p className="text-gray-500">لا توجد منشورات بعد</p>
        </div>
      )}
    </div>
  );
}
