import React from 'react';
import { Search, TrendingUp, Users, Hash } from 'lucide-react';

type Props = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  trending: any[];
  users: any[];
  onFollow: (userId: string) => void;
};

export default function RightPanel({ searchQuery, setSearchQuery, trending, users, onFollow }: Props) {
  return (
    <div className="w-80 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 overflow-y-auto z-40 shadow-lg">
      <div className="p-6 space-y-6">
        {/* Search */}
        <div>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث في Elevator..."
              className="w-full pr-11 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Trending */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">الترندات</h3>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-2">
            {trending.map((trend: any, index: number) => (
              <button
                key={index}
                onClick={() => setSearchQuery(trend.tag)}
                className="w-full text-right p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">{trend.tag}</span>
                  </div>
                  <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                    {trend.growth}
                  </span>
                </div>
                <div className="text-sm text-gray-500">{trend.posts} منشور</div>
              </button>
            ))}
          </div>
        </div>

        {/* Follow Suggestions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">اقتراحات المتابعة</h3>
            <Users className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {users.map((user: any) => (
              <div key={user.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-lg">
                  {user.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 text-sm truncate">{user.name}</div>
                  <div className="text-xs text-gray-500 truncate">{user.handle}</div>
                  <div className="text-xs text-gray-400">{user.followers.toLocaleString('ar')} متابع</div>
                </div>
                <button
                  onClick={() => onFollow(user.id)}
                  className={`px-4 py-1.5 text-sm rounded-lg transition-all hover:scale-105 active:scale-95 ${
                    user.isFollowing
                      ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {user.isFollowing ? 'متابَع' : 'متابعة'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
            <button className="hover:underline">حول</button>
            <span>•</span>
            <button className="hover:underline">المساعدة</button>
            <span>•</span>
            <button className="hover:underline">الشروط</button>
            <span>•</span>
            <button className="hover:underline">الخصوصية</button>
            <span>•</span>
            <button className="hover:underline">API</button>
          </div>
          <p className="text-xs text-gray-400 mt-3">© 2024 Elevator. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </div>
  );
}