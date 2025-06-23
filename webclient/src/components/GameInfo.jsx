'use client';

import { useState, useEffect } from 'react';

export default function GameInfo() {
  const [gameTime, setGameTime] = useState({
    hour: 12,
    minute: 0,
    day: 1,
    season: 'Spring'
  });

  const [weather, setWeather] = useState({
    condition: 'Clear',
    temperature: 22,
    humidity: 65
  });

  // Simulate time passing
  useEffect(() => {
    const interval = setInterval(() => {
      setGameTime(prev => {
        let newMinute = prev.minute + 1;
        let newHour = prev.hour;
        let newDay = prev.day;
        let newSeason = prev.season;

        if (newMinute >= 60) {
          newMinute = 0;
          newHour++;
        }

        if (newHour >= 24) {
          newHour = 0;
          newDay++;
        }

        if (newDay > 90) {
          newDay = 1;
          const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
          const currentSeasonIndex = seasons.indexOf(newSeason);
          newSeason = seasons[(currentSeasonIndex + 1) % 4];
        }

        return { hour: newHour, minute: newMinute, day: newDay, season: newSeason };
      });
    }, 1000); // 1 second = 1 minute in game

    return () => clearInterval(interval);
  }, []);

  const formatTime = (hour, minute) => {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
  };

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clear': return '☀️';
      case 'cloudy': return '☁️';
      case 'rain': return '🌧️';
      case 'storm': return '⛈️';
      case 'snow': return '❄️';
      case 'fog': return '🌫️';
      default: return '🌤️';
    }
  };

  return (
    <div className="flex items-center justify-between px-2 py-1">
      {/* Time */}
      <div className="flex items-center space-x-1">
        <span className="text-[10px] text-gray-400">Time:</span>
        <span className="text-[10px] text-white font-semibold">
          {formatTime(gameTime.hour, gameTime.minute)}
        </span>
      </div>

      {/* Day */}
      <div className="flex items-center space-x-1">
        <span className="text-[10px] text-gray-400">Day:</span>
        <span className="text-[10px] text-white font-semibold">
          {gameTime.day}
        </span>
      </div>

      {/* Weather */}
      <div className="flex items-center space-x-1">
        <span className="text-[12px]">
          {getWeatherIcon(weather.condition)}
        </span>
        <span className="text-[10px] text-white font-semibold">
          {weather.condition}
        </span>
      </div>
    </div>
  );
} 