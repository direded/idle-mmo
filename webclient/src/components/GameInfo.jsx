'use client';

import { useState, useEffect } from 'react';

export default function GameInfo({ gameViewModel }) {
  const [time, setTime] = useState({
    day: 'Monday',
    date: '14.05.203',
    time: '13:48',
    formatted: '14.05.203 13:48'
  });
  const [weather, setWeather] = useState({
    condition: 'Sunny',
    temperature: 22,
    humidity: 65,
    windSpeed: 5
  });

  useEffect(() => {
    if (gameViewModel) {
      // Subscribe to state changes
      const unsubscribe = gameViewModel.subscribe((state) => {
        setTime(state.time);
        setWeather(state.weather);
      });

      // Initialize with current data
      setTime(gameViewModel.getTime());
      setWeather(gameViewModel.getWeather());

      return unsubscribe;
    }
  }, [gameViewModel]);

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours % 12 || 12;
    return `${displayHour}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  return (
    <div className="flex items-center justify-between px-2 py-1">
      {/* Time */}
      <div className="flex items-center space-x-1">
        <span className="text-[10px] text-gray-400">Time:</span>
        <span className="text-[10px] text-white font-semibold">
          {formatTime(time.time)}
        </span>
      </div>

      {/* Day */}
      <div className="flex items-center space-x-1">
        <span className="text-[10px] text-gray-400">Day:</span>
        <span className="text-[10px] text-white font-semibold">
          {time.day}
        </span>
      </div>

      {/* Weather */}
      <div className="flex items-center space-x-1">
        <span className="text-[12px]">
          {gameViewModel?.getWeatherIcon()}
        </span>
        <span className="text-[10px] text-white font-semibold">
          {weather.condition}
        </span>
      </div>
    </div>
  );
} 