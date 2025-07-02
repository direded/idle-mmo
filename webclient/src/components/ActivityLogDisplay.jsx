'use client';

import { useState, useEffect, memo } from 'react';

const ActivityLogDisplay = memo(function ActivityLogDisplay({ gameController }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (gameController) {
      // Subscribe to state changes
      const unsubscribe = gameController.subscribe((state) => {
        setLogs(gameController.getLogsAsStrings());
      });

      // Initialize with current data
      setLogs(gameController.getLogsAsStrings());

      return unsubscribe;
    }
  }, [gameController]);

  // Default logs if no GameController provided
  const defaultLogs = [
    '[12:30] Welcome to the game!',
    '[12:31] You have entered the Forest Clearing',
    '[12:32] You found some wood while gathering',
    '[12:33] A wild animal appeared nearby',
    '[12:34] You successfully crafted a basic tool'
  ];

  const displayLogs = logs.length > 0 ? logs : defaultLogs;

  return (
    <div className="flex-1 bg-gray-800 p-2 overflow-hidden">
      <div className="flex-shrink-0 mb-2">
        <h2 className="text-sm font-bold text-white">Activity Log</h2>
      </div>
      <div className="flex-1 overflow-y-auto text-xs text-gray-300 space-y-1">
        {displayLogs.map((log, index) => (
          <div key={index} className="text-[10px] leading-tight">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
});

export default ActivityLogDisplay;