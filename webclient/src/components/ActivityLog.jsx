'use client';

import { useState, useEffect, useRef } from 'react';

export default function ActivityLog({ gameViewModel, height = "h-32" }) {
  const [logs, setLogs] = useState([]);
  const [isResizing, setIsResizing] = useState(false);
  const [currentHeight, setCurrentHeight] = useState(256); // Default 128px (h-32)
  const resizeRef = useRef(null);

  useEffect(() => {
    if (gameViewModel) {
      // Subscribe to log changes
      const unsubscribe = gameViewModel.subscribe((state) => {
        setLogs(gameViewModel.getLogsAsStrings());
      });

      // Initialize logs
      setLogs(gameViewModel.getLogsAsStrings());

      return unsubscribe;
    }
  }, [gameViewModel]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizing && resizeRef.current) {
        const container = resizeRef.current.parentElement;
        const containerRect = container.getBoundingClientRect();
        const containerBottom = containerRect.bottom;
        const newHeight = containerBottom - e.clientY;
        
        // Set minimum and maximum heights
        const minHeight = 64; // h-16
        const maxHeight = 400; // h-100
        
        if (newHeight >= minHeight && newHeight <= maxHeight) {
          setCurrentHeight(newHeight);
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const handleResizeStart = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  // Default logs if no GameViewModel provided
  const defaultLogs = [
    // '13:48 Entered the character planner',
    // '13:47 Loaded character data for Exile',
    // '13:46 Initialized character planner interface',
    // '13:45 Connected to game server',
    // '13:44 Starting character planner application',
    // '13:43 Loading character assets',
    // '13:42 Initializing game components',
    // '13:41 Establishing connection',
    // '13:40 Application startup complete',
    // '13:39 Loading configuration files',
    // '13:38 Starting character planner'
  ];

  const displayLogs = logs.length > 0 ? logs : defaultLogs;
  const contentHeight = currentHeight - 40; // Subtract header height

  return (
    <div 
      ref={resizeRef}
      className="flex-shrink-0 bg-gray-800 flex flex-col"
      style={{ height: `${currentHeight}px` }}
    >
      {/* Resize handle - positioned at top */}
      <div
        className="h-0.5 bg-gray-600 cursor-ns-resize hover:bg-gray-500 transition-colors flex items-center justify-center"
        onMouseDown={handleResizeStart}
        style={{ cursor: 'ns-resize' }}
      >
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
        </div>
      </div>
      <div className="flex-shrink-0 p-1">
        <h2 className="text-sm font-bold text-white">Activity Log</h2>
      </div>
      <div 
        className="overflow-y-auto p-1 select-text flex-1"
      >
        <div className="text-xs text-gray-300">
          {displayLogs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
} 