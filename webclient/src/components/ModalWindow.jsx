'use client';

import { useState, useEffect } from 'react';

export default function ModalWindow({ 
    title = 'Modal Window',
    children,
    onClose,
    className = ''
}) {
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e) => {
            const newX = e.clientX - dragOffset.x;
            const newY = e.clientY - dragOffset.y;
            setPosition({ x: newX, y: newY });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset]);

    const handleMouseDown = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setIsDragging(true);
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    return (
        <div 
            className="fixed z-50"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`
            }}
        >
            <div className="bg-gray-800 rounded overflow-hidden w-[500px] shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                {/* Title Bar */}
                <div
                    className="h-7 bg-gray-700 flex items-center pl-4 cursor-move select-none"
                    onMouseDown={handleMouseDown}
                >
                    <div className="text-white text-sm font-medium">{title}</div>
                    <div className="flex-grow" />
                    <button 
                        className="text-gray-400 hover:text-white transition-colors text-2xl font-light px-2 hover:bg-gray-600 h-full flex items-center"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
} 