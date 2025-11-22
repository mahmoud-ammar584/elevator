import React from 'react';
import { Home, Search, Bell, MessageCircle, User, Settings, Bookmark, ArrowUp, LogOut } from 'lucide-react';

type Props = { currentPage: string; setCurrentPage: (p: string) => void; notificationsCount: number; chatsCount: number; currentUser: any; onLogout: () => void; openNewPost: () => void; openSettings: () => void };

export default function Sidebar({ currentPage, setCurrentPage, notificationsCount, chatsCount, currentUser, onLogout, openNewPost, openSettings }: Props) {
  return (
    <div className="w-64 h-screen bg-white border-l border-gray-200 fixed right-0 top-0 flex flex-col z-30">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center"><ArrowUp className="w-6 h-6 text-white" /></div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Elevator</h1>
            <p className="text-xs text-gray-500">ارتقِ بتواصلك</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <button onClick={() => setCurrentPage('home')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${currentPage === 'home' ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}><Home className="w-5 h-5" /><span>الرئيسية</span></button>
        <button onClick={() => setCurrentPage('explore')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${currentPage === 'explore' ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}><Search className="w-5 h-5" /><span>استكشف</span></button>
        <button onClick={() => { setCurrentPage('notifications'); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors relative ${currentPage === 'notifications' ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}><Bell className="w-5 h-5" /><span>الإشعارات</span>{notificationsCount > 0 && (<span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>)}</button>
        <button onClick={() => setCurrentPage('messages')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors relative ${currentPage === 'messages' ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}><MessageCircle className="w-5 h-5" /><span>الرسائل</span>{chatsCount > 0 && (<span className="absolute top-2 left-2 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">{chatsCount}</span>)}</button>
        <button onClick={() => setCurrentPage('profile')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${currentPage === 'profile' ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}><User className="w-5 h-5" /><span>الملف الشخصي</span></button>
        <button onClick={() => setCurrentPage('bookmarks')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${currentPage === 'bookmarks' ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}><Bookmark className="w-5 h-5" /><span>المحفوظات</span></button>
        <button onClick={openSettings} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"><Settings className="w-5 h-5" /><span>الإعدادات</span></button>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button onClick={openNewPost} className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors">منشور جديد</button>
      </div>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white font-bold text-lg">{currentUser?.avatar || '😊'}</div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">{currentUser?.name}</div>
            <div className="text-xs text-gray-500 truncate">{currentUser?.handle}</div>
          </div>
          <button onClick={onLogout} className="text-gray-400 hover:text-red-600 transition-colors" title="تسجيل الخروج"><LogOut className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
  );
}