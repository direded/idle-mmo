'use client';

import { useState, useEffect } from 'react';

export default function LocationInfo({ gameViewModel }) {
  const [currentLocation, setCurrentLocation] = useState({
    name: 'Forest Clearing',
    description: 'A peaceful clearing surrounded by tall trees. The air is fresh and you can hear birds chirping in the distance. This area is known for its abundant resources and wildlife.',
    activities: ['Gathering Wood', 'Hunting', 'Gathering Herbs', 'Fishing']
  });
  const [nearbyLocations, setNearbyLocations] = useState([]);

  useEffect(() => {
    if (gameViewModel) {
      // Subscribe to state changes
      const unsubscribe = gameViewModel.subscribe((state) => {
        setCurrentLocation(state.currentLocation);
        setNearbyLocations(state.nearbyLocations);
      });

      // Initialize with current data
      setCurrentLocation(gameViewModel.getCurrentLocation());
      setNearbyLocations(gameViewModel.getNearbyLocations());

      return unsubscribe;
    }
  }, [gameViewModel]);

  const handleActivityClick = (activity) => {
    console.log(`${activity} clicked`);
    if (gameViewModel) {
      gameViewModel.addLog(`Started activity: ${activity}`, 'activity');
    }
  };

  const handleLocationClick = (location) => {
    console.log(`${location.name} clicked`);
    if (gameViewModel) {
      gameViewModel.addLog(`Traveling to: ${location.name}`, 'travel');
    }
  };

  return (
    <div className="flex-1 text-gray-400">
      
      {/* Current Location Information */}
      <div className="p-2 border-gray-700 border-b flex-shrink-0 bg-gray-800">
        <div className="flex-shrink-0">
          <h2 className="text-base font-bold text-white mb-1">Current Location: {currentLocation.name}</h2>
        </div>
        <div className="">
          <p className="text-xs text-gray-300 mb-3 pl-1">
            {currentLocation.description}
          </p>
          <div>
            <h4 className="text-sm font-bold text-white mb-1">Activities:</h4>
            <div className="space-y-0">
              {currentLocation.activities.map((activity, index) => (
                <div 
                  key={index}
                  className="text-sm text-gray-300 cursor-pointer hover:bg-gray-600 hover:text-white transition-colors py-0.5 px-1" 
                  onClick={() => handleActivityClick(activity)}
                >
                  {activity}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Nearby Locations */}
      <div className="p-2 flex-shrink-0 bg-gray-800">
        <div className="flex-shrink-0">
          <h2 className="text-base font-bold text-white">Nearby Locations</h2>
        </div>
        <div className="">
          <div className="">
            {nearbyLocations.map((location, index) => (
              <div 
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-700 transition-colors" 
                onClick={() => handleLocationClick(location)}
              >
                <h4 className="text-sm font-bold text-white">{location.name}</h4>
                <p className="text-xs text-gray-300">{location.description}</p>
                <div className="text-xs text-gray-400 mt-1">Distance: {location.distance}</div>
                <div className="text-xs text-gray-400">Direction: {location.direction}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 