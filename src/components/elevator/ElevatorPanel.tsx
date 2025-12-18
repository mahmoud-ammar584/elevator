import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { motion } from 'framer-motion';

export default function ElevatorPanel() {
    const { goToFloor, targetFloor, currentFloor, elevatorStatus, lang } = useUIStore();

    // Generate a list of common "Key Floors" for quick access, plus a scroller for all
    const quickFloors = [99, 50, 25, 10, 5, 1, 0];
    const isRTL = lang === 'ar';

    return (
        <div className="glass-panel p-6 rounded-3xl border border-[var(--elevator-border)] shadow-2xl max-w-[280px]">
            <div className="text-center mb-6">
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--elevator-text-dim)]">
                    {isRTL ? 'لوحة التحكم' : 'Control Panel v2'}
                </h3>
            </div>

            {/* Numeric Grid (Simplified for UI, e.g., 0-9) */}
            <div className="grid grid-cols-3 gap-3 mb-8">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((btn) => {
                    const isTarget = typeof btn === 'number' && targetFloor === btn;
                    const isCurrent = typeof btn === 'number' && currentFloor === btn;

                    return (
                        <button
                            key={btn}
                            onClick={() => typeof btn === 'number' && goToFloor(btn)}
                            disabled={elevatorStatus !== 'idle'}
                            className={`
                aspect-square rounded-full border-2 flex items-center justify-center text-xl font-bold transition-all duration-300
                ${isTarget
                                    ? 'bg-[var(--elevator-neon)] text-[var(--elevator-bg)] border-[var(--elevator-neon)] shadow-[0_0_15px_var(--elevator-neon)]'
                                    : isCurrent
                                        ? 'border-[var(--elevator-neon)] text-[var(--elevator-neon)] bg-[var(--elevator-neon)]/5'
                                        : 'border-[var(--elevator-border)] text-[var(--elevator-text-dim)] hover:border-[var(--elevator-neon)] hover:text-white'
                                }
                ${elevatorStatus !== 'idle' ? 'opacity-50 cursor-not-allowed' : 'active:scale-90 shadow-lg'}
              `}
                        >
                            {btn}
                        </button>
                    );
                })}
            </div>

            {/* Common "Rise" Buttons */}
            <div className="space-y-3">
                {quickFloors.map(floor => (
                    <button
                        key={floor}
                        onClick={() => goToFloor(floor)}
                        disabled={elevatorStatus !== 'idle'}
                        className={`
               w-full py-3 rounded-xl border flex items-center justify-between px-4 transition-all
               ${targetFloor === floor
                                ? 'border-[var(--elevator-neon)] bg-[var(--elevator-neon)]/10 text-[var(--elevator-neon)]'
                                : 'border-[var(--elevator-border)] text-[var(--elevator-text-dim)] hover:border-[var(--elevator-neon)]/50'
                            }
             `}
                    >
                        <span className="font-mono text-xs">LEVEL {floor.toString().padStart(2, '0')}</span>
                        <span className="text-[10px] opacity-50">{floor === 99 ? (isRTL ? 'القمة' : 'PENTHOUSE') : (isRTL ? 'طابق' : 'FLOOR')}</span>
                    </button>
                ))}
            </div>

            {/* Door Controls */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-[var(--elevator-border)]/50">
                <button className="flex-1 py-2 border border-[var(--elevator-border)] rounded-lg text-xs hover:bg-white/5 transition-colors">
                    ◄ || ►
                </button>
                <button className="flex-1 py-2 border border-[var(--elevator-border)] rounded-lg text-xs hover:bg-white/5 transition-colors">
                    ► || ◄
                </button>
            </div>

            {/* Branding */}
            <div className="mt-8 text-center opacity-20 hover:opacity-100 transition-opacity">
                <div className="text-[8px] font-mono tracking-widest text-[var(--elevator-text-muted)]">
                    OTIS-CYBERNETICS
                </div>
            </div>
        </div>
    );
}
