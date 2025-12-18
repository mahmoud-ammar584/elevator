import React, { useEffect, useState } from 'react';
import { useUIStore } from '../../store/uiStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloorDisplay() {
    const { currentFloor, targetFloor, elevatorStatus, lang } = useUIStore();
    const [displayFloor, setDisplayFloor] = useState(currentFloor);

    // Smoothly increment/decrement the display floor while moving
    useEffect(() => {
        if (elevatorStatus === 'moving') {
            const interval = setInterval(() => {
                setDisplayFloor(prev => {
                    if (prev < targetFloor) return prev + 1;
                    if (prev > targetFloor) return prev - 1;
                    return prev;
                });
            }, 100); // Speed of floor change display

            return () => clearInterval(interval);
        } else {
            setDisplayFloor(currentFloor);
        }
    }, [elevatorStatus, targetFloor, currentFloor]);

    const isRTL = lang === 'ar';
    const direction = targetFloor > currentFloor ? 'up' : targetFloor < currentFloor ? 'down' : 'idle';

    return (
        <div className="bg-black/80 backdrop-blur-xl border-2 border-[var(--elevator-border)] p-4 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center justify-between min-w-[200px] border-double">
            {/* Direction Indicator */}
            <div className="flex flex-col items-center gap-1">
                <div className={`text-xl transition-all duration-300 ${direction === 'up' ? 'text-[var(--elevator-neon)] animate-pulse' : 'text-white/10'}`}>
                    ▲
                </div>
                <div className={`text-xl transition-all duration-300 ${direction === 'down' ? 'text-[var(--elevator-alert)] animate-pulse' : 'text-white/10'}`}>
                    ▼
                </div>
            </div>

            {/* Numerical Display */}
            <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[var(--elevator-text-dim)] mb-1">
                    {isRTL ? 'الطابق الحالي' : 'CURRENT FLOOR'}
                </span>
                <div className="font-mono text-5xl font-black text-[var(--elevator-neon)] drop-shadow-[0_0_10px_var(--elevator-neon-glow)] tracking-tighter">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={displayFloor}
                            initial={{ opacity: 0, y: direction === 'up' ? 20 : -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: direction === 'up' ? -20 : 20 }}
                            transition={{ duration: 0.1 }}
                        >
                            {displayFloor.toString().padStart(2, '0')}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </div>

            {/* Status Light */}
            <div className="absolute top-2 right-2 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full shadow-[0_0_5px_currentColor] transition-colors duration-500
          ${elevatorStatus === 'moving' ? 'text-yellow-400 bg-yellow-400' :
                        elevatorStatus === 'idle' ? 'text-[var(--elevator-neon)] bg-[var(--elevator-neon)]' :
                            'text-blue-400 bg-blue-400 animate-ping'}
        `}></div>
            </div>
        </div>
    );
}
