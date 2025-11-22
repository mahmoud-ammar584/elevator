import React, { useRef } from 'react';
import { X, Image, Video, Smile } from 'lucide-react';

export default function NewPostModal({ currentUser, newPostContent, setNewPostContent, newPostMedia, setNewPostMedia, onCreate, onClose }: any) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">منشور جديد</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="flex gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white text-xl flex-shrink-0">{currentUser?.avatar}</div>
            <div className="flex-1">
              <textarea value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} placeholder="ما الذي يدور في ذهنك؟" className="w-full min-h-32 text-lg text-gray-900 placeholder-gray-400 resize-none focus:outline-none" maxLength={500} />

              {newPostMedia && (<div className="relative mt-3 rounded-xl overflow-hidden bg-gray-100 aspect-video flex items-center justify-center"><div className="text-6xl">{newPostMedia.type === 'image' ? '🖼️' : '🎥'}</div><button onClick={() => setNewPostMedia(null)} className="absolute top-2 left-2 bg-black bg-opacity-50 text-white p-2 rounded-lg hover:bg-opacity-70"><X className="w-4 h-4" /></button></div>)}

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <input type="file" ref={fileRef} onChange={(e) => { const file = e.target.files?.[0]; if (file) setNewPostMedia({ type: file.type.startsWith('image/') ? 'image' : 'video', file }); }} accept="image/*,video/*" className="hidden" />
                  <button onClick={() => fileRef.current?.click()} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors" title="إضافة صورة"><Image className="w-5 h-5" /></button>
                  <button onClick={() => fileRef.current?.click()} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors" title="إضافة فيديو"><Video className="w-5 h-5" /></button>
                  <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors" title="إضافة رموز تعبيرية"><Smile className="w-5 h-5" /></button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">{newPostContent.length}/500</span>
                  <button onClick={onCreate} disabled={!newPostContent.trim()} className="px-6 py-2 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">نشر</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}