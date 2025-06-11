'use client';

import { useState } from 'react';
import GameTile from '@/components/GameTile';
import ModalWindow from '@/components/ModalWindow';
import { NetworkController } from '@/game/NetworkController'

export default function GameInterface() {
  const [activeTab, setActiveTab] = useState('general');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [message, setMessage] = useState('');
  const [logs, setLogs] = useState([
    { type: 'system', content: 'Welcome to the game!' },
  ]);

	NetworkController.initHandlers({
		setLogs,
		addLog: () => {
			setLogs(logs.push())
		}
	})

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setShowLocationModal(true);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newLog = { type: 'user', content: message };
      setLogs(prevLogs => [...prevLogs, newLog]);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const nearbyLocations = [
    { id: 1, name: 'Forest', description: 'A dense forest with tall trees' },
    { id: 2, name: 'Mountain', description: 'A tall mountain with a cave' },
    { id: 3, name: 'River', description: 'A flowing river with fish' },
  ];

  return (
		<div className="flex justify-center items-center bg-mainbg w-full h-screen">
			<div className="flex gap-1 text-xs h-full p-4">
				{/* First Column */}
				<div className="flex shrink flex-col gap-1">
					{/* Time and Weather Tile */}
					<GameTile title="Monday" className="text-center">
						<div className="text-gray-200 p-b-2 text-center">
							<p>14.05.203 13:48</p>
							<p>Sunny</p>
						</div>
					</GameTile>

					{/* Modal Windows List Tile */}
					<GameTile title="Other" className="text-center">
						<ul className="">
							<li>
								<button 
									className="text-stone-300 hover:text-stone-50 hover:cursor-pointer transition-colors"
									onClick={() => setShowSettingsModal(true)}
								>
									Report problem
								</button>
							</li>
							<li>
								<button 
									className="text-stone-300 hover:text-stone-50 hover:cursor-pointer transition-colors"
									onClick={() => setShowSettingsModal(true)}
								>
									Settings
								</button>
							</li>
						</ul>
					</GameTile>
				</div>

				{/* Second Column */}
				<div className="flex flex-col gap-1 flex-grow h-full min-h-0">
					{/* Top Row */}
					<div className="flex gap-1">
						{/* Character Information Tile */}
						<GameTile title="Character" className="">
							<div className="flex gap-1">
								<button
									className={`block px-2 py-1 transition-colors ${
										activeTab === 'general' 
											? 'bg-button text-white' 
											: 'bg-buttonhover text-gray-300 hover:cursor-pointer'
									}`}
									onClick={() => setActiveTab('general')}
								>
									General
								</button>
								<button
									className={`block px-2 py-1 transition-colors ${
										activeTab === 'equipment' 
											? 'bg-button text-white' 
											: 'bg-buttonhover text-gray-300 hover:cursor-pointer'
									}`}
									onClick={() => setActiveTab('equipment')}
								>
									Equipment
								</button>
								<button
									className={`block px-2 py-1 transition-colors ${
										activeTab === 'inventory' 
											? 'bg-button text-white' 
											: 'bg-buttonhover text-gray-300 hover:cursor-pointer'
									}`}
									onClick={() => setActiveTab('inventory')}
								>
									Inventory
								</button>
							</div>
							<div className="mt-1 text-gray-200">
								{activeTab === 'general' && (
									<div className="">
										<p>Name: Player1</p>
										<p>Health: 100/100</p>
										<p>Hunger: 80/100</p>
										<p>Energy: 90/100</p>
									</div>
								)}
								{activeTab === 'equipment' && (
									<div className="">
										<p>Head: None</p>
										<p>Chest: Leather Armor</p>
										<p>Weapon: Wooden Sword</p>
									</div>
								)}
								{activeTab === 'inventory' && (
									<div className="">
										<p>Gold: 100</p>
										<p>Potion: 3</p>
										<p>Food: 5</p>
									</div>
								)}
							</div>
						</GameTile>

						{/* Locations Tile */}
						<GameTile title="Locations" className=" shrink">
							<div className="text-gray-200">
								<div className="mb-4">
									<p className="font-semibold text-white">Current Location:</p>
									<p>Village Square</p>
								</div>
								<div>
									<p className="font-semibold text-white mb-2">Nearby Locations:</p>
									<ul className="">
										{nearbyLocations.map((location) => (
											<li key={location.id}>
												<button
													className="text-blue-400 hover:text-blue-300 transition-colors"
													onClick={() => handleLocationClick(location)}
												>
													{location.name}
												</button>
											</li>
										))}
									</ul>
								</div>
							</div>
						</GameTile>

						{/* Activity Tile */}
						<GameTile title="Activity" className=" shrink">
							<div className="flex items-center justify-center h-full min-w-40">
								Idle
							</div>
						</GameTile>
					</div>

					{/* Bottom Row */}
					<div className="flex-1 min-h-0">
						{/* Logs and Messages Tile */}
						<GameTile title="Logs & Messages" className="flex flex-col flex-1 h-full min-h-0">
							<div className="flex flex-col flex-1 h-full bg-container border-1 border-b-basecolorlight border-r-basecolorlight border-basecolordark min-h-0">
								<div className="flex-1 p-1 min-h-0 overflow-y-scroll">
									<ul className="text-gray-200">
										{logs.map((log, index) => (
											<li key={index} className="text-xs select-text">
												{log.type === 'user' ? 'You: ' : ''}{log.content}
											</li>
										))}
									</ul>
								</div>
								<div className="flex gap-1 h-6">
									<input
										type="text"
										value={message}
										onChange={(e) => setMessage(e.target.value)}
										onKeyPress={handleKeyPress}
										className="flex-grow px-1 py-1 focus:border-buttonhover focus:outline-none"
										placeholder="Type your message..."
									/>
									<button
										onClick={handleSendMessage}
										className="px-4 text-stone-400 hover:cursor-pointer hover:text-stone-50 transition-colors text-xs"
									>
										Send
									</button>
								</div>
							</div>
						</GameTile>
					</div>
				</div>

				{/* Location Modal */}
				{showLocationModal && selectedLocation && (
					<ModalWindow
						title={selectedLocation.name}
						onClose={() => setShowLocationModal(false)}
					>
						<div className="p-4 text-gray-200">
							<p>{selectedLocation.description}</p>
						</div>
					</ModalWindow>
				)}

				{/* Settings Modal */}
				{showSettingsModal && (
					<ModalWindow
						title="Settings"
						onClose={() => setShowSettingsModal(false)}
					>
						<div className="p-4 text-gray-200">
							<div className="space-y-2">
								<div>
									<label className="block mb-2">Sound Volume</label>
									<input type="range" min="0" max="100" className="w-full" />
								</div>
								<div>
									<label className="block mb-2">Music Volume</label>
									<input type="range" min="0" max="100" className="w-full" />
								</div>
								<div>
									<label className="flex items-center">
										<input type="checkbox" className="mr-2" />
										Show FPS
									</label>
								</div>
							</div>
						</div>
					</ModalWindow>
				)}
			</div>
		</div>
  );
} 