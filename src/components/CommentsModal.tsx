import React from 'react';
import { X } from 'lucide-react';

export default function CommentsModal({ postId, commentText, setCommentText, onAddComment, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">التعليقات</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white flex-shrink-0">😊</div>
            <div className="flex-1">
              <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="اكتب تعليقاً..." className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none" rows={3} />
              <div className="flex justify-end mt-2"><button onClick={() => onAddComment(postId)} disabled={!commentText.trim()} className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">تعليق</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}