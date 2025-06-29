'use client';

import { useState, useEffect } from 'react';

export default function WeatherComponent({ gameViewModel }) {
  const [weather, setWeather] = useState({
    condition: 'Sunny',
    temperature: 22,
    humidity: 65,
    windSpeed: 5
  });

  useEffect(() => {
    if (gameViewModel) {
      // Subscribe to state changes for weather only
      const unsubscribe = gameViewModel.subscribe((state) => {
        setWeather(state.weather);
      });

      // Initialize with current weather data
      setWeather(gameViewModel.getWeather());

      return unsubscribe;
    }
  }, [gameViewModel]);

  return (
    <div className="flex items-center space-x-1">
      <span className="text-[12px]">
        {gameViewModel?.getWeatherIcon()}
      </span>
      <span className="text-[10px] text-white font-semibold">
        {weather.condition}
      </span>
    </div>
  );
} 