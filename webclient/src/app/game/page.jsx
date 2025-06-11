'use client';

import { useState } from 'react';
import ModalWindow from '@/components/ModalWindow';

export default function GameInterface() {
	const [activeTab, setActiveTab] = useState('general');
	const [showLocationModal, setShowLocationModal] = useState(false);
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [showSettingsModal, setShowSettingsModal] = useState(false);
	const [message, setMessage] = useState('');
	const [logs, setLogs] = useState([]);

	const handleLocationClick = (location) => {
		setSelectedLocation(location);
		setShowLocationModal(true);
	};

	const handleSendMessage = () => {
		if (message.trim()) {
			setLogs([...logs, { type: 'user', content: message }]);
			setMessage('');
		}
	};

	const nearbyLocations = [
		{ id: 1, name: 'Forest', description: 'A dense forest with tall trees' },
		{ id: 2, name: 'Mountain', description: 'A tall mountain with a cave' },
		{ id: 3, name: 'River', description: 'A flowing river with fish' },
	];

	return (
		<div className="flex gap-4 p-4 h-screen">
			{/* First Column */}
			<div className="flex flex-col gap-4 w-1/4">
				{/* Time and Weather Tile */}
				<Tile className="h-1/2">
					<div className="p-4">
						<h2 className="text-xl font-bold mb-2">Game Time & Weather</h2>
						<div className="space-y-2">
							<p>Time: 12:00 PM</p>
							<p>Weather: Sunny</p>
						</div>
					</div>
				</Tile>

				{/* Modal Windows List Tile */}
				<Tile className="h-1/2">
					<div className="p-4">
						<h2 className="text-xl font-bold mb-2">Windows</h2>
						<ul className="space-y-2">
							<li>
								<button 
									className="text-blue-500 hover:text-blue-700"
									onClick={() => setShowSettingsModal(true)}
								>
									Settings
								</button>
							</li>
						</ul>
					</div>
				</Tile>
			</div>

			{/* Second Column */}
			<div className="flex flex-col gap-4 w-3/4">
				{/* Top Row */}
				<div className="flex gap-4 h-1/2">
					{/* Character Information Tile */}
					<Tile className="w-1/3">
						<div className="p-4">
							<div className="flex gap-2 mb-4">
								<button
									className={`px-3 py-1 rounded ${activeTab === 'general' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
									onClick={() => setActiveTab('general')}
								>
									General
								</button>
								<button
									className={`px-3 py-1 rounded ${activeTab === 'equipment' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
									onClick={() => setActiveTab('equipment')}
								>
									Equipment
								</button>
								<button
									className={`px-3 py-1 rounded ${activeTab === 'inventory' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
									onClick={() => setActiveTab('inventory')}
								>
									Inventory
								</button>
							</div>
							<div className="mt-4">
								{activeTab === 'general' && (
									<div className="space-y-2">
										<p>Name: Player1</p>
										<p>Health: 100/100</p>
										<p>Hunger: 80/100</p>
										<p>Energy: 90/100</p>
									</div>
								)}
								{activeTab === 'equipment' && (
									<div className="space-y-2">
										<p>Head: None</p>
										<p>Chest: Leather Armor</p>
										<p>Weapon: Wooden Sword</p>
									</div>
								)}
								{activeTab === 'inventory' && (
									<div className="space-y-2">
										<p>Gold: 100</p>
										<p>Potion: 3</p>
										<p>Food: 5</p>
									</div>
								)}
							</div>
						</div>
					</Tile>

					{/* Locations Tile */}
					<Tile className="w-1/3">
						<div className="p-4">
							<h2 className="text-xl font-bold mb-4">Locations</h2>
							<div className="mb-4">
								<p className="font-semibold">Current Location:</p>
								<p>Village Square</p>
							</div>
							<div>
								<p className="font-semibold mb-2">Nearby Locations:</p>
								<ul className="space-y-2">
									{nearbyLocations.map((location) => (
										<li key={location.id}>
											<button
												className="text-blue-500 hover:text-blue-700"
												onClick={() => handleLocationClick(location)}
											>
												{location.name}
											</button>
										</li>
									))}
								</ul>
							</div>
						</div>
					</Tile>

					{/* Activity Tile */}
					<Tile className="w-1/3">
						<div className="p-4 flex items-center justify-center h-full">
							<button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
								Start Activity
							</button>
						</div>
					</Tile>
				</div>

				{/* Bottom Row */}
				<div className="h-1/2">
					{/* Logs and Messages Tile */}
					<Tile className="h-full">
						<div className="p-4 flex flex-col h-full">
							<div className="flex-grow overflow-y-auto mb-4">
								<h2 className="text-xl font-bold mb-2">Logs</h2>
								<ul className="space-y-2">
									{logs.map((log, index) => (
										<li key={index} className="text-sm">
											{log.content}
										</li>
									))}
								</ul>
							</div>
							<div className="flex gap-2">
								<input
									type="text"
									value={message}
									onChange={(e) => setMessage(e.target.value)}
									className="flex-grow px-3 py-2 border rounded"
									placeholder="Type your message..."
								/>
								<button
									onClick={handleSendMessage}
									className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
								>
									Send
								</button>
							</div>
						</div>
					</Tile>
				</div>
			</div>

			{/* Location Modal */}
			{showLocationModal && selectedLocation && (
				<ModalWindow
					title={selectedLocation.name}
					onClose={() => setShowLocationModal(false)}
				>
					<div className="p-4">
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
					<div className="p-4">
						<div className="space-y-4">
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
	);
} 