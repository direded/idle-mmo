'use client';

import { useState, useEffect, createElement } from 'react';
import CharacterInventoryDisplay from '../../components/CharacterInventoryDisplay';
import ActivityLogDisplay from '../../components/ActivityLogDisplay';
import LocationDisplay from '../../components/LocationDisplay';
import { GameController } from '../../game/GameController';
import TestWindow from '@/components/windows/TestWindow';
import ItemStackWindow from '@/components/windows/ItemStackWindow';
import TaskWindow from '@/components/windows/TaskWindow';
import TaskDisplay from '@/components/TaskDisplay';
import { NetworkController } from '@/game/NetworkController';
import TimeDisplay from '@/components/TimeDisplay';
import WeatherDisplay from '@/components/WeatherDisplay';


export default function CharacterPlanner() {
	const [gameController] = useState(() => new GameController());
	const [state, setState] = useState(gameController.state);
	
	useEffect(() => {
		NetworkController.setViewModel(gameController);
		NetworkController.setReady(true);
		const unsubscribe = gameController.subscribe((newState) => {
			setState(prevState => ({
				...newState
			}))
		});
		
		// Start time prediction when component mounts
		gameController.startTimePrediction();
		
		return () => {
			unsubscribe();
			// Stop time prediction when component unmounts
			gameController.stopTimePrediction();
			// Clean up resources
			gameController.destroy();
		};
	}, []);

	useEffect(() => {
		document.addEventListener('contextmenu', event => event.preventDefault());
		
	}, []);


  const [activeView, setActiveView] = useState('location');


  const renderMainContent = () => {
    switch (activeView) {
      case 'location':
        return (
          <div className="flex flex-col h-full min-h-0">
            <LocationDisplay gameController={gameController} />
            <ActivityLogDisplay gameController={gameController} />
          </div>
        );
      case 'skills':
        return (
          <div className="p-4 text-center text-gray-400">
            <h2 className="text-lg font-bold mb-4">Active Skills</h2>
            <p>Skill gems and their configurations will be shown here.</p>
          </div>
        );
      case 'passives':
        return (
          <div className="p-4 text-center text-gray-400">
            <h2 className="text-lg font-bold mb-4">Passive Skill Tree</h2>
            <p>Passive skill tree visualization will be displayed here.</p>
          </div>
        );
      case 'equipment':
        return (
          <div className="p-4 text-center text-gray-400">
            <h2 className="text-lg font-bold mb-4">Equipment</h2>
            <p>Character equipment and item details will be shown here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 text-[10px]">
      <div className="flex h-screen">
        {/* Center Panel - Game Info, View Buttons & Character location */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
          {/* Game Info */}
          <div className="p-1 border-b border-gray-700">
						<div className="flex items-center space-x-6">
							<TimeDisplay gameController={gameController} />
					
							{/* Weather Component */}
							<WeatherDisplay gameController={gameController} />
						</div>
          </div>

          {/* View Buttons */}
          <div className="p-1 border-b border-gray-700">
            <div className="grid grid-cols-2 gap-1">
              <button
                onClick={() => setActiveView('location')}
                className={`px-1 py-0.5 rounded text-[10px] transition-colors cursor-pointer ${
                  activeView === 'location' 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Location
              </button>
              <button
                disabled
                className="px-1 py-0.5 rounded text-[10px] bg-gray-800 text-gray-500 cursor-not-allowed"
              >
                Skills
              </button>
              <button
                disabled
                className="px-1 py-0.5 rounded text-[10px] bg-gray-800 text-gray-500 cursor-not-allowed"
              >
                Passives
              </button>
              <button
                disabled
                className="px-1 py-0.5 rounded text-[10px] bg-gray-800 text-gray-800 text-gray-500 cursor-not-allowed"
              >
                Equipment
              </button>
            </div>
          </div>

          <CharacterInventoryDisplay gameController={gameController} />
          
          {/* Task Display */}
          <TaskDisplay gameController={gameController} />
        </div>

        {/* Main Canvas */}
        <div className="flex-1 bg-gray-800">
          {renderMainContent()}
        </div>
      </div>
			{/* Modals */}
			{gameController.state.windowModals.map((modal, index) => {
					var result
					if (modal.type == 'test') {
						result = createElement(TestWindow, { key: index, gameController: gameController, ...modal });
					} else if (modal.type == 'itemStack') {
						result = createElement(ItemStackWindow, { key: index, gameController: gameController, ...modal });
					} else if (modal.type == 'task') {
						result = createElement(TaskWindow, { key: index, gameController: gameController, ...modal });
					}
					return result
						
				})}
    </div>
  );
}