import React from 'react';
import { X } from 'lucide-react';
import { formatTime } from '../utils/formatters';

type Props = {
  postId: string;
  post: any;
  commentText: string;
  setCommentText: (text: string) => void;
  onAddComment: (postId: string) => void;
  onClose: () => void;
  currentUser: any;
};

export default function CommentsModal({
  postId,
  post,
  commentText,
  setCommentText,
  onAddComment,
  onClose,
  currentUser
}: Props) {
  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">التعليقات</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Original Post */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                {post.author.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900">{post.author.name}</span>
                  <span className="text-gray-500 text-sm">{post.author.handle}</span>
                  <span className="text-gray-400 text-sm">•</span>
                  <span className="text-gray-500 text-sm">{formatTime(post.timestamp)}</span>
                </div>
                <p className="text-gray-900 leading-relaxed">{post.content}</p>
              </div>
            </div>
          </div>

          {/* Add Comment */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white flex-shrink-0">
                {currentUser?.avatar}
              </div>
              <div className="flex-1">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="اكتب تعليقاً..."
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => onAddComment(postId)}
                    disabled={!commentText.trim()}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    تعليق
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="p-6 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full flex items-center justify-center text-lg">
                  {['👤', '👨', '👩'][i]}
                </div>
                <div className="flex-1 bg-gray-50 p-3 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900 text-sm">مستخدم {i + 1}</span>
                    <span className="text-xs text-gray-500">منذ {i + 1} ساعة</span>
                  </div>
                  <p className="text-gray-700 text-sm">تعليق رائع! شكراً على المشاركة.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}