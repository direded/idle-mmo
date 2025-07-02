'use client';

import { useState, useEffect } from 'react';

export default function TimeDisplay({ gameController }) {
  const [time, setTime] = useState({ hours: 0, minutes: 0, day: 1, year: 1 });

  useEffect(() => {
    if (gameController) {
      // Subscribe to time changes
      const timeController = gameController.getTimeController();
      const unsubscribe = timeController.subscribe((newTime) => {
        setTime(newTime);
      });

      // Initialize with current time
      setTime(gameController.getTime());

      return unsubscribe;
    }
  }, [gameController]);

  const formatTime = (hours, minutes) => {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const getDayName = (dayNumber) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    // Day 1 = Monday, so we subtract 1 to get array index
    const dayIndex = (dayNumber - 1) % 7;
    return days[dayIndex];
  };

  // Check if time is initialized (not -1 values)
  const isTimeInitialized = time && time.hours !== -1 && time.minutes !== -1 && time.day !== -1 && time.year !== -1;

  return (
    <div className="flex items-center justify-between px-2 py-1">
      {/* Time */}
      <div className="flex items-center space-x-1 mr-2">
        <span className="text-[10px] text-gray-400">Time:</span>
        <span className="text-[10px] text-white font-semibold">
          {isTimeInitialized 
            ? formatTime(time.hours, time.minutes) 
            : '--:--'}
        </span>
      </div>

      {/* Day */}
      <div className="flex items-center space-x-1">
        <span className="text-[10px] text-gray-400">Day:</span>
        <span className="text-[10px] text-white font-semibold">
          {isTimeInitialized ? getDayName(time.day) : '--'}
        </span>
      </div>
    </div>
  );
} 