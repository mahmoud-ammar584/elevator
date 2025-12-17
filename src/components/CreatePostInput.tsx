import React, { useState } from 'react';
import { Image, Video, Send } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore';

type Props = {
    onPost: (content: string, image?: File) => void;
};

export default function CreatePostInput({ onPost }: Props) {
    const { user } = useAuthStore();
    const { lang } = useUIStore();
    const [content, setContent] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = () => {
        if (!content.trim()) return;
        onPost(content);
        setContent('');
        setIsFocused(false);
    };

    return (
        <div
            className={`
        glass-panel mb-8 p-4 rounded-2xl border border-[var(--elevator-border)] transition-all duration-300
        ${isFocused ? 'shadow-[0_0_20px_rgba(69,248,130,0.1)] border-[var(--elevator-neon)]' : 'hover:border-[var(--elevator-neon)]/50'}
      `}
        >
            <div className="flex gap-4">
                {/* User Avatar */}
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-[var(--elevator-card)] border border-[var(--elevator-border)] flex items-center justify-center text-2xl shadow-inner">
                        {user?.avatar || '👤'}
                    </div>
                </div>

                {/* Input Area */}
                <div className="flex-1">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => !content && setIsFocused(false)}
                        placeholder={lang === 'ar' ? "ماذا يدور في ذهنك؟" : "What is happening on your floor?"}
                        className="w-full bg-transparent border-none focus:ring-0 text-[var(--elevator-text)] placeholder-[var(--elevator-text-dim)] resize-none min-h-[50px] py-3 text-lg"
                        rows={isFocused ? 3 : 1}
                    />

                    {/* Actions Bar (Visible when focused or has content) */}
                    <div className={`
            flex items-center justify-between mt-2 pt-3 border-t border-[var(--elevator-border)]/50 transition-all duration-300
            ${isFocused || content ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none hidden'}
          `}>
                        <div className="flex gap-2">
                            <button className="p-2 rounded-full text-[var(--elevator-neon)] hover:bg-[var(--elevator-neon)]/10 transition-colors tooltip" data-tip="Add Image">
                                <Image className="w-5 h-5" />
                            </button>
                            <button className="p-2 rounded-full text-[var(--elevator-cyan)] hover:bg-[var(--elevator-cyan)]/10 transition-colors tooltip" data-tip="Add Video">
                                <Video className="w-5 h-5" />
                            </button>
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={!content.trim()}
                            className={`
                px-6 py-2 rounded-xl font-bold transition-all duration-300 flex items-center gap-2
                ${content.trim()
                                    ? 'bg-[var(--elevator-neon)] text-[var(--elevator-bg)] hover:shadow-[0_0_15px_var(--elevator-neon)] hover:scale-105'
                                    : 'bg-[var(--elevator-border)] text-[var(--elevator-text-dim)] cursor-not-allowed'
                                }
              `}
                        >
                            <span>{lang === 'ar' ? 'نشر' : 'Post'}</span>
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
