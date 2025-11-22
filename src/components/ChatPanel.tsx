import React, { useEffect, useRef } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { formatTime } from '../utils/formatters';

type Props = {
  chats: any[];
  activeChat: any | null;
  setActiveChat: (chat: any) => void;
  newMessage: string;
  setNewMessage: (msg: string) => void;
  sendMessage: () => void;
  onClose: () => void;
};

export default function ChatPanel({
  chats,
  activeChat,
  setActiveChat,
  newMessage,
  setNewMessage,
  sendMessage,
  onClose
}: Props) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl h-[80vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900">الرسائل</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 p-2 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Chats List */}
          <div className="w-80 border-l border-gray-200 overflow-y-auto bg-gray-50">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-600 mb-3">المحادثات</h3>
              <div className="space-y-2">
                {chats.map((chat: any) => (
                  <button
                    key={chat.id}
                    onClick={() => setActiveChat(chat)}
                    className={`w-full p-3 rounded-xl hover:bg-white transition-colors text-right ${
                      activeChat?.id === chat.id ? 'bg-white shadow-sm' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 text-white flex items-center justify-center text-xl flex-shrink-0">
                        {chat.user.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900 text-sm truncate">{chat.user.name}</span>
                          <span className="text-xs text-gray-500">{formatTime(chat.timestamp)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                          {chat.unread > 0 && (
                            <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full ml-2">
                              {chat.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 flex flex-col">
            {activeChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 text-white flex items-center justify-center text-lg">
                      {activeChat.user.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{activeChat.user.name}</div>
                      <div className="text-xs text-gray-500">{activeChat.user.handle}</div>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {activeChat.messages?.map((msg: any) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'currentUser' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-2xl ${
                          msg.sender === 'currentUser'
                            ? 'bg-gray-900 text-white'
                            : 'bg-white text-gray-900 border border-gray-200'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.sender === 'currentUser' ? 'text-gray-300' : 'text-gray-500'
                          }`}
                        >
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="اكتب رسالة..."
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      <span>إرسال</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">اختر محادثة لبدء المراسلة</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}