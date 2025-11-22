import React, { useEffect, useRef } from 'react';

export default function ChatPanel({ chats, activeChat, setActiveChat, newMessage, setNewMessage, sendMessage }: any) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [activeChat]);
  return (
    <div className="bg-white border-l border-gray-200 fixed right-80 top-0 h-screen w-[360px] overflow-y-auto">
      <div className="p-4 border-b">المحادثات</div>
      <div className="p-4">
        {chats.map((c: any) => (
          <div key={c.id} onClick={() => setActiveChat(c)} className={`p-3 rounded-xl hover:bg-gray-50 cursor-pointer ${activeChat?.id === c.id ? 'bg-gray-100' : ''}`}>
            <div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center">{c.user.avatar}</div><div><div className="font-medium">{c.user.name}</div><div className="text-xs text-gray-500">{c.lastMessage}</div></div></div><div className="text-xs text-gray-400">{new Date(c.timestamp).toLocaleTimeString()}</div></div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {activeChat && (<div className="p-4 border-t fixed bottom-0 right-80 left-[calc(100%-360px)] bg-white flex gap-2"><input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="اكتب رسالة..." className="flex-1 p-3 border rounded-xl" /><button onClick={sendMessage} className="px-4 py-2 bg-gray-900 text-white rounded-xl">إرسال</button></div>)}
    </div>
  );
}