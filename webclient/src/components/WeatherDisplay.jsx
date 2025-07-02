'use client';

import { useState, useEffect } from 'react';

export default function WeatherDisplay({ gameController }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (gameController) {
      // Subscribe to state changes
      const unsubscribe = gameController.subscribe((state) => {
        setWeather(gameController.getWeather());
      });

      // Initialize with current data
      setWeather(gameController.getWeather());

      return unsubscribe;
    }
  }, [gameController]);

  return (
    <div className="text-xs text-gray-300">
      {gameController?.getWeatherIcon()} {weather?.temperature}°C
    </div>
  );
}