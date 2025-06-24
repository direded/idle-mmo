'use client';

import { useState, useEffect } from 'react';

export default function ActivityLog({ gameViewModel, height = "h-32" }) {
  const [logs, setLogs] = useState([]);

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

  return (
    <div className={`flex-shrink-0 ${height} border-t border-gray-700 bg-gray-800`}>
      <div className="flex-shrink-0 p-1">
        <h2 className="text-xs font-bold text-orange-400 mb-1">Activity Log</h2>
      </div>
      <div className={`${height === "h-32" ? "h-24" : "h-20"} overflow-y-auto p-1 scrollbar-a select-text`}>
        <div className="text-xs text-gray-300">
          {displayLogs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
} 