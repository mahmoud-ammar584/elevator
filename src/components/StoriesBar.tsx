import React from 'react';
import { motion } from 'framer-motion';

const stories = [
  { id: 's1', name: 'محمود', avatar: '' },
  { id: 's2', name: 'سارة', avatar: '' },
  { id: 's3', name: 'خالد', avatar: '' },
];

export default function StoriesBar() {
  return (
    <div className="py-4 border-b border-[var(--elevator-border)] mb-4">
      <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-2 px-1">
        {stories.map((s) => (
          <motion.button
            key={s.id}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 flex flex-col items-center group"
          >
            <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-[var(--elevator-accent)] to-[var(--elevator-neon)] mb-2 group-hover:shadow-[0_0_15px_var(--elevator-neon-glow)] transition-shadow duration-300">
              <div className="w-full h-full rounded-full bg-[var(--elevator-card)] border-2 border-[var(--elevator-bg)] flex items-center justify-center text-[var(--elevator-text)] overflow-hidden">
                <span className="text-lg font-bold">{s.name[0]}</span>
              </div>
            </div>
            <div className="text-xs font-medium text-[var(--elevator-text-dim)] group-hover:text-[var(--elevator-text)] transition-colors">{s.name}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
