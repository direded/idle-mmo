'use client';

import { redirect } from 'next/navigation';
import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import Tile from '@/components/Tile';
import ModalWindow from '@/components/ModalWindow';
import { NetworkController } from '@/game/NetworkController';
import { WsContext } from '@/context/WsContext';

// Mock data for demonstration
const initialCharacter = {
	name: 'Adventurer',
	health: 100,
	energy: 100,
	hunger: 100,
	currentLocation: 'Village'
};

const initialInventory = [
	{ id: 1, name: 'Sword', weight: 2.5, count: 1 },
	{ id: 2, name: 'Shield', weight: 3.0, count: 1 },
	{ id: 3, name: 'Potion', weight: 0.1, count: 5 },
	{ id: 4, name: 'Gold Coin', weight: 0.01, count: 50 },
	{ id: 5, name: 'Leather Armor', weight: 5.0, count: 1 },
	{ id: 6, name: 'Healing Herb', weight: 0.05, count: 10 },
	{ id: 7, name: 'Magic Wand', weight: 1.5, count: 1 },
	{ id: 8, name: 'Torch', weight: 0.5, count: 2 },
	{ id: 9, name: 'Rope', weight: 0.3, count: 1 },
	{ id: 10, name: 'Map', weight: 0.1, count: 1 }
];

const locations = {
	'Village': {
		description: 'A peaceful village with friendly inhabitants.',
		icon: '/icons/village.png',
		nearbyLocations: ['Forest', 'Mountain', 'Cave']
	},
	'Forest': {
		description: 'A dense forest, home to various creatures.',
		icon: '/icons/forest.png',
		nearbyLocations: ['Village', 'River']
	},
	'Mountain': {
		description: 'A towering mountain range, dangerous but full of resources.',
		icon: '/icons/mountain.png',
		nearbyLocations: ['Village', 'Cave']
	},
	'Cave': {
		description: 'A dark and mysterious cave system.',
		icon: '/icons/cave.png',
		nearbyLocations: ['Village', 'Mountain']
	},
	'River': {
		description: 'A flowing river, abundant with fish.',
		icon: '/icons/river.png',
		nearbyLocations: ['Forest']
	},
};

const itemIcons = {
	'Sword': '/icons/sword.png',
	'Shield': '/icons/shield.png',
	'Potion': '/icons/potion.png',
	'Gold Coin': '/icons/gold_coin.png',
	'Leather Armor': '/icons/leather_armor.png',
	'Healing Herb': '/icons/healing_herb.png',
	'Magic Wand': '/icons/magic_wand.png',
	'Torch': '/icons/torch.png',
	'Rope': '/icons/rope.png',
	'Map': '/icons/map.png',
};

export default function GamePage() {
	const [character, setCharacter] = useState(initialCharacter);
	const [inventory, setInventory] = useState(initialInventory);
	const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
	const [openModals, setOpenModals] = useState([]);
	const [socket, setSocket] = useContext(WsContext);

	// Add event listeners for window dragging and resizing
	useEffect(() => {
		const handleMouseMove = (e) => {
			// This will be handled by the Window component
		};

		const handleMouseUp = () => {
			// This will be handled by the Window component
		};

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	}, []);

	const handleOpenModal = (location) => {
		setOpenModals(prev => {
			// If modal for this location is already open, close it
			if (prev.includes(location)) {
				return prev.filter(loc => loc !== location);
			}
			// Otherwise, open it
			return [...prev, location];
		});
	};

	const handleSort = (key) => {
		let direction = 'ascending';
		if (sortConfig.key === key && sortConfig.direction === 'ascending') {
			direction = 'descending';
		}
		setSortConfig({ key, direction });
		const sortedInventory = [...inventory].sort((a, b) => {
			if (a[key] < b[key]) {
				return direction === 'ascending' ? -1 : 1;
			}
			if (a[key] > b[key]) {
				return direction === 'ascending' ? 1 : -1;
			}
			return 0;
		});
		setInventory(sortedInventory);
	};

	const getSortIcon = (key) => {
		if (sortConfig.key === key) {
			return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
		}
		return null;
	};

	return (
		<div className="pt-2 min-h-screen bg-gray-900">
			<div className="max-w-6xl mx-auto">
				<div className="grid grid-cols-2 gap-2">
					{/* Left Column */}
					<div className="flex flex-col gap-2">
						{/* Character Info Section */}
						<Tile
							title="Character Info"
							className="border-t-2 border-b-2 border-r-2 border-l-2"
						>
							<div className="space-y-2">
								<div className="grid grid-cols-[100px_1fr]">
									<p className="text-gray-300">Name</p>
									<p className="text-white font-medium">{character.name}</p>
								</div>
								<div className="grid grid-cols-[100px_1fr]">
									<p className="text-gray-300">Health</p>
									<p className="text-white font-medium">{character.health}</p>
								</div>
								<div className="grid grid-cols-[100px_1fr]">
									<p className="text-gray-300">Energy</p>
									<p className="text-white font-medium">{character.energy}</p>
								</div>
								<div className="grid grid-cols-[100px_1fr]">
									<p className="text-gray-300">Hunger</p>
									<p className="text-white font-medium">{character.hunger}</p>
								</div>
							</div>
						</Tile>

						{/* Inventory Section */}
						<Tile
							title="Inventory"
							className="border-t-2 border-b-2 border-r-2 border-l-2 min-h-96 max-h-96"
						>
							<div className="relative h-full flex flex-col">
								<div className="flex-grow overflow-auto">
									<table className="min-w-full">
										<thead className="sticky top-0 bg-gray-700 shadow-md z-10">
											<tr>
												<th 
													className="px-3 py-1 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600 transition-colors"
													onClick={() => handleSort('name')}
												>
													Item {getSortIcon('name')}
												</th>
												<th 
													className="w-24 px-3 py-1 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600 transition-colors"
													onClick={() => handleSort('weight')}
												>
													Weight {getSortIcon('weight')}
												</th>
												<th 
													className="w-20 px-3 py-1 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600 transition-colors"
													onClick={() => handleSort('count')}
												>
													Count {getSortIcon('count')}
												</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-700">
											{inventory.map((item) => (
												<tr key={item.id} className="hover:bg-gray-700 transition-colors group">
													<td className="px-3 py-1 whitespace-nowrap text-gray-300">
														<div className="flex items-center gap-2">
															{itemIcons[item.name] ? (
																<div className="w-6 h-6 relative group-hover:scale-125 transition-transform">
																	<Image
																		src={itemIcons[item.name]}
																		alt={item.name}
																		fill
																		className="object-contain disable-drag"
																	/>
																</div>
															) : (
																<div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center text-xs group-hover:bg-gray-500 transition-colors">
																	?
																</div>
															)}
															<span className="group-hover:text-white transition-colors">{item.name}</span>
														</div>
													</td>
													<td className="w-24 px-3 py-1 whitespace-nowrap text-gray-300 group-hover:text-white transition-colors">{item.weight} kg</td>
													<td className="w-20 px-3 py-1 whitespace-nowrap text-gray-300 group-hover:text-white transition-colors">{item.count}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
								<div className="h-8 bg-gray-700 border-gray-600 flex items-center justify-between px-4">
									<p className="text-gray-300">gold: <span className="font-medium text-white">50</span></p>
									<p className="text-gray-300">weight: <span className="font-medium text-white">
										{inventory.reduce((total, item) => total + (item.weight * item.count), 0).toFixed(1)} kg
									</span></p>
								</div>
							</div>
						</Tile>
					</div>

					{/* Right Column */}
					<div className="flex flex-col gap-2">
						{/* Current Location Section */}
						<Tile
							title="Current Location"
							className="border-t-2 border-b-2 border-r-2"
						>
							<div 
								className="flex items-center gap-4 cursor-pointer hover:bg-gray-700 p-2 rounded transition-colors"
								onClick={() => handleOpenModal(character.currentLocation)}
							>
								<div className="w-16 h-16 relative bg-gray-700">
									{locations[character.currentLocation]?.icon && (
										<Image
											src={locations[character.currentLocation].icon}
											alt={character.currentLocation}
											fill
											className="object-contain p-2"
										/>
									)}
								</div>
								<div className="flex-grow">
									<h3 className="text-xl font-bold text-white mb-2">{character.currentLocation}</h3>
									<p className="text-gray-300">{locations[character.currentLocation]?.description}</p>
								</div>
							</div>
						</Tile>

						{/* Nearby Locations Section */}
						<Tile
							title="Nearby Locations"
							className="border-t-2 border-b-2 border-r-2"
						>
							<div className="grid grid-cols-1 gap-1">
								{locations[character.currentLocation]?.nearbyLocations.map((location) => (
									<div 
										key={location} 
										className="flex items-center cursor-pointer hover:bg-gray-700 p-2 rounded transition-colors"
										onClick={() => handleOpenModal(location)}
									>
										<div className="flex items-center gap-4 flex-grow">
											<div className="w-12 h-12 relative bg-gray-700">
												{locations[location]?.icon && (
													<Image
														src={locations[location].icon}
														alt={location}
														fill
														className="object-contain p-2"
													/>
												)}
											</div>
											<div className="text-left">
												<h3 className="font-semibold text-white">{location}</h3>
												<p className="text-sm text-gray-300">{locations[location]?.description}</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</Tile>
					</div>
				</div>
			</div>

			{/* Multiple Location Info Modals */}
			{openModals.map((location) => (
				<ModalWindow
					key={location}
					title={`Location Info - ${location}`}
					onClose={() => handleOpenModal(location)}
				>
					<div className="space-y-4">
						<div className="flex items-center gap-4">
							<div className="w-16 h-16 relative bg-gray-700">
								{locations[location]?.icon && (
									<Image
										src={locations[location].icon}
										alt={location}
										fill
										className="object-contain p-2"
									/>
								)}
							</div>
							<div>
								<h2 className="text-2xl font-bold text-white">{location}</h2>
								<p className="text-gray-300">{locations[location]?.description}</p>
							</div>
						</div>
						<div>
							<h3 className="text-lg font-semibold text-white mb-2">Nearby Locations</h3>
							<div className="grid grid-cols-2 gap-2">
								{locations[location]?.nearbyLocations.map((nearbyLocation) => (
									<div key={nearbyLocation} className="bg-gray-700 p-2 rounded">
										<p className="text-white">{nearbyLocation}</p>
										<p className="text-sm text-gray-300">{locations[nearbyLocation]?.description}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</ModalWindow>
			))}
		</div>
	);
} 