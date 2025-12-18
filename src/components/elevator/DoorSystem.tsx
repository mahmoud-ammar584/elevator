import React, { useEffect } from 'react';
import { useUIStore } from '../../store/uiStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function DoorSystem() {
    const { elevatorStatus, arrivedAtFloor, setElevatorStatus, targetFloor } = useUIStore();

    const playBeep = (freq: number, duration: number) => {
        try {
            const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch (e) { /* Audio might be blocked or unsupported */ }
    };

    // Logic to simulate door sequence
    useEffect(() => {
        if (elevatorStatus === 'moving') {
            // Transition to arrived after a timeout (simulating travel)
            const travelTime = 3000;
            const timer = setTimeout(() => {
                playBeep(880, 0.4); // Arrival ding
                arrivedAtFloor();
            }, travelTime);
            return () => clearTimeout(timer);
        }

        if (elevatorStatus === 'opening') {
            playBeep(440, 0.1); // Door open click
            const timer = setTimeout(() => {
                setElevatorStatus('open');
            }, 1200); // Door opening time
            return () => clearTimeout(timer);
        }

        if (elevatorStatus === 'open') {
            const timer = setTimeout(() => {
                setElevatorStatus('idle'); // Back to idle ready for next move
            }, 3000); // How long to stay open
            return () => clearTimeout(timer);
        }
    }, [elevatorStatus, arrivedAtFloor, setElevatorStatus]);

    return (
        <AnimatePresence>
            {(elevatorStatus === 'opening' || elevatorStatus === 'open' || elevatorStatus === 'moving') && (
                <div className="fixed inset-0 z-[100] pointer-events-none flex overflow-hidden">
                    {/* Left Door */}
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: elevatorStatus === 'moving' ? 0 : '-100%' }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.8, ease: [0.45, 0, 0.55, 1] }}
                        className="w-1/2 h-full bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#121212] border-r border-[var(--elevator-neon)]/30 relative"
                    >
                        {/* Industrial Detail */}
                        <div className="absolute right-4 top-0 bottom-0 w-px bg-white/5"></div>
                        <div className="absolute top-1/2 right-8 -translate-y-1/2 rotate-90 text-[10px] text-white/5 font-mono tracking-[1em] whitespace-nowrap">
                            ELEVATOR-FRONTEND-V2
                        </div>
                    </motion.div>

                    {/* Right Door */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: elevatorStatus === 'moving' ? 0 : '100%' }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.8, ease: [0.45, 0, 0.55, 1] }}
                        className="w-1/2 h-full bg-gradient-to-l from-[#1a1a1a] via-[#2a2a2a] to-[#121212] border-l border-[var(--elevator-neon)]/30 relative"
                    >
                        <div className="absolute left-4 top-0 bottom-0 w-px bg-white/5"></div>
                        {/* Center Groove Shadow */}
                        <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/40"></div>
                    </motion.div>

                    {/* Center Line/Glow while closed */}
                    {elevatorStatus === 'moving' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[var(--elevator-neon)] shadow-[0_0_15px_var(--elevator-neon)] -translate-x-1/2"
                        />
                    )}

                    {/* Warning Light on travel */}
                    {elevatorStatus === 'moving' && (
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 flex gap-4">
                            <div className="w-4 h-4 rounded-full bg-yellow-500 animate-ping shadow-[0_0_10px_yellow]"></div>
                            <div className="w-4 h-4 rounded-full bg-yellow-500 animate-ping delay-75 shadow-[0_0_10px_yellow]"></div>
                        </div>
                    )}
                </div>
            )}
        </AnimatePresence>
    );
}
