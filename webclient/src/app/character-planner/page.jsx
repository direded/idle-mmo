'use client';

import { useState, useEffect, createElement } from 'react';
import PlayerItems from '../../components/PlayerItems';
import GameInfo from '../../components/GameInfo';
import ActivityLog from '../../components/ActivityLog';
import LocationInfo from '../../components/LocationInfo';
import { GameViewModel } from '../../game/GameViewModel';
import TestWindow from '@/components/TestWindow';
import ItemStackWindow from '@/components/ItemStackWindow';
import { NetworkController } from '@/game/NetworkController';

export default function CharacterPlanner() {
	const [gameViewModel] = useState(() => new GameViewModel());
	const [state, setState] = useState(gameViewModel.state);
	
	useEffect(() => {
		NetworkController.setViewModel(gameViewModel);
		NetworkController.setReady(true);
		const unsubscribe = gameViewModel.subscribe((newState) => {
			setState(prevState => ({
				...newState
			}))
		});
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		document.addEventListener('contextmenu', event => event.preventDefault());
		
		// Initialize with some sample logs
		gameViewModel.addLogs([
			'Entered the character planner',
			'Loaded character data for Exile',
			'Initialized character planner interface',
			'Connected to game server',
			'Starting character planner application',
			'Loading character assets',
			'Initializing game components',
			'Establishing connection',
			'Application startup complete',
			'Loading configuration files',
			'Starting character planner'
		]);
	}, [gameViewModel]);


  const [activeView, setActiveView] = useState('stats');


  const renderMainContent = () => {
    switch (activeView) {
      case 'stats':
        return (
          <div className="flex flex-col h-full">
            <LocationInfo gameViewModel={gameViewModel} />
            <ActivityLog gameViewModel={gameViewModel} />
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
        {/* Center Panel - Game Info, View Buttons & Character Stats */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
          {/* Game Info */}
          <div className="p-1 border-b border-gray-700">
            <GameInfo gameViewModel={gameViewModel} />
          </div>

          {/* View Buttons */}
          <div className="p-1 border-b border-gray-700">
            <div className="grid grid-cols-2 gap-1">
              <button
                onClick={() => setActiveView('stats')}
                className={`px-1 py-0.5 rounded text-[10px] transition-colors cursor-pointer ${
                  activeView === 'stats' 
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
                className="px-1 py-0.5 rounded text-[10px] bg-gray-800 text-gray-500 cursor-not-allowed"
              >
                Equipment
              </button>
            </div>
          </div>

          <PlayerItems gameViewModel={gameViewModel} />
        </div>

        {/* Main Canvas */}
        <div className="flex-1 bg-gray-800">
          {renderMainContent()}
        </div>
      </div>
			{/* Modals */}
			{gameViewModel.state.windowModals.map((modal, index) => {
					var result
					if (modal.type == 'test') {
						result = createElement(TestWindow, { key: index, gameViewModel: gameViewModel, ...modal });
					} else if (modal.type == 'itemStack') {
						result = createElement(ItemStackWindow, { key: index, gameViewModel: gameViewModel, ...modal });
					}
					return result
						
				})}
    </div>
  );
} 