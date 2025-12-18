import React from 'react';
import FloorDisplay from './FloorDisplay';
import DoorSystem from './DoorSystem';
import { useUIStore } from '../../store/uiStore';

export default function ElevatorSimulation() {
    const { elevatorStatus } = useUIStore();

    return (
        <div className="flex flex-col gap-6 items-center lg:items-end">
            {/* Visual Simulation UI (Display) */}
            <div className="sticky top-24 space-y-6">
                <FloorDisplay />
            </div>

            {/* The Global Overlay Doors */}
            <DoorSystem />

            {/* Accessibility shortcut indicator */}
            <div className="hidden lg:block text-[10px] font-mono text-[var(--elevator-text-dim)] text-right opacity-50 max-w-[200px] mt-4">
                TIP: USE NUMBER KEYS 0-9 TO QUICKLY SELECT FLOORS.
            </div>
        </div>
    );
}
