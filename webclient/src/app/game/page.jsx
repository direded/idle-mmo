'use client';

import { useState, useEffect } from 'react';
import GameTile from '@/components/GameTile';
import ModalWindow from '@/components/ModalWindow';
import { GameViewModel } from '@/game/GameViewModel';
import { NetworkController } from '@/game/NetworkController'

export default function GameInterface() {
	const [viewModel] = useState(() => new GameViewModel());
	const [state, setState] = useState(viewModel.state);

	NetworkController.setViewModel(viewModel)

	useEffect(() => {
		const unsubscribe = viewModel.subscribe((newState) => {
			setState(prevState => ({
				...newState
			}))
		});
		return () => unsubscribe();
	}, []);

	const handleLocationClick = (location) => {
		viewModel.setSelectedLocation(location);
		viewModel.setShowLocationModal(true);
	};

	const handleSendMessage = () => {
		viewModel.sendMessage();
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSendMessage();
		}
	};

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
									onClick={() => {viewModel.setShowSettingsModal(true); console.log('s'); console.log(state.showSettingsModal)}}
								>
									Report problem
								</button>
							</li>
							<li>
								<button 
									className="text-stone-300 hover:text-stone-50 hover:cursor-pointer transition-colors"
									onClick={() => viewModel.setShowSettingsModal(true)}
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
										state.activeTab === 'general' 
											? 'bg-button text-white' 
											: 'bg-buttonhover text-gray-300 hover:cursor-pointer'
									}`}
									onClick={() => viewModel.setActiveTab('general')}
								>
									General
								</button>
								<button
									className={`block px-2 py-1 transition-colors ${
										state.activeTab === 'equipment' 
											? 'bg-button text-white' 
											: 'bg-buttonhover text-gray-300 hover:cursor-pointer'
									}`}
									onClick={() => viewModel.setActiveTab('equipment')}
								>
									Equipment
								</button>
								<button
									className={`block px-2 py-1 transition-colors ${
										state.activeTab === 'inventory' 
											? 'bg-button text-white' 
											: 'bg-buttonhover text-gray-300 hover:cursor-pointer'
									}`}
									onClick={() => viewModel.setActiveTab('inventory')}
								>
									Inventory
								</button>
							</div>
							<div className="mt-1 text-gray-200">
								{state.activeTab === 'general' && (
									<div className="">
										<p>Name: {state.character.name}</p>
										<p>Health: {state.character.health}/{state.character.maxHealth}</p>
										<p>Hunger: {state.character.hunger}/{state.character.maxHunger}</p>
										<p>Energy: {state.character.energy}/{state.character.maxEnergy}</p>
									</div>
								)}
								{state.activeTab === 'equipment' && (
									<div className="">
										<p>Head: {state.equipment.head}</p>
										<p>Chest: {state.equipment.chest}</p>
										<p>Weapon: {state.equipment.weapon}</p>
									</div>
								)}
								{state.activeTab === 'inventory' && (
									<div className="">
										<p>Gold: {state.inventory.gold}</p>
										<p>Potion: {state.inventory.potion}</p>
										<p>Food: {state.inventory.food}</p>
									</div>
								)}
							</div>
						</GameTile>

						{/* Locations Tile */}
						<GameTile title="Locations" className="shrink">
							<div className="text-gray-200">
								<div className="mb-4">
									<p className="font-semibold text-white">Current Location:</p>
									<p>{state.currentLocation}</p>
								</div>
								<div>
									<p className="font-semibold text-white mb-2">Nearby Locations:</p>
									<ul className="">
										{state.nearbyLocations.map((location) => (
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
						<GameTile title="Activity" className="shrink">
							<div className="flex items-center justify-center h-full min-w-40">
								{state.process.type}
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
										{state.logs.map((log, index) => (
											<li key={index} className="text-xs select-text">
												{log.type === 'user' ? 'You: ' : ''}{log.content}
											</li>
										))}
									</ul>
								</div>
								<div className="flex gap-1 h-6">
									<input
										type="text"
										value={state.message}
										onChange={(e) => viewModel.setMessage(e.target.value)}
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
				{state.showLocationModal && state.selectedLocation && (
					<ModalWindow
						title={state.selectedLocation.name}
						onClose={() => viewModel.setShowLocationModal(false)}
					>
						<div className="p-4 text-gray-200">
							<p>{state.selectedLocation.description}</p>
						</div>
					</ModalWindow>
				)}

				{/* Settings Modal */}
				{state.showSettingsModal && (
					<ModalWindow
						title="Settings"
						onClose={() => viewModel.setShowSettingsModal(false)}
					>
						<div className="p-4 text-gray-200">
							<div className="space-y-2">
								<div>
									<label className="block mb-2">Sound Volume</label>
									<input 
										type="range" 
										min="0" 
										max="100" 
										value={state.settings.soundVolume}
										onChange={(e) => viewModel.updateSettings({ soundVolume: parseInt(e.target.value) })}
										className="w-full" 
									/>
								</div>
								<div>
									<label className="block mb-2">Music Volume</label>
									<input 
										type="range" 
										min="0" 
										max="100" 
										value={state.settings.musicVolume}
										onChange={(e) => viewModel.updateSettings({ musicVolume: parseInt(e.target.value) })}
										className="w-full" 
									/>
								</div>
								<div>
									<label className="flex items-center">
										<input 
											type="checkbox" 
											checked={state.settings.showFPS}
											onChange={(e) => viewModel.updateSettings({ showFPS: e.target.checked })}
											className="mr-2" 
										/>
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