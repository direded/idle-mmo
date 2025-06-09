'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Tile from '@/components/Tile';
import ModalWindow from '@/components/ModalWindow';

// Mock data for demonstration
const initialCharacter = {
	name: 'Adventurer',
	health: 100,
	energy: 100,
	hunger: 100,
	currentLocation: 'Village'
};

// Mock data for locations
const mockIcon = '/assets/items/sword.png'
const locations = {
	'Village': {
		description: 'A peaceful village where you can rest and trade',
		nearbyLocations: ['Woods', 'Mountain', 'River'],
		icon: mockIcon
	},
	'Woods': {
		description: 'Dense forest full of resources and wildlife',
		nearbyLocations: ['Village', 'Mountain', 'Cave'],
		icon: mockIcon
	},
	'Mountain': {
		description: 'High peaks with valuable minerals',
		nearbyLocations: ['Village', 'Woods', 'Cave'],
		icon: mockIcon
	},
	'River': {
		description: 'Fresh water source with fish',
		nearbyLocations: ['Village', 'Woods'],
		icon: mockIcon
	},
	'Cave': {
		description: 'Dark cave system with rare resources',
		nearbyLocations: ['Woods', 'Mountain'],
		icon: mockIcon
	}
};

// Icon mapping for different item types
const itemIcons = {
	'Wooden Sword': '/assets/items/sword.png',
	'Health Potion': '/assets/items/potion.png',
	'Leather Armor': '/assets/items/leather.png',
};

const initialInventory = [
	{ id: 1, name: 'Wooden Sword', weight: 2, count: 1 },
	{ id: 2, name: 'Health Potion', weight: 0.5, count: 3 },
	{ id: 3, name: 'Leather Armor', weight: 3, count: 1 },
];

export default function GamePage() {
	const [character, setCharacter] = useState(initialCharacter);
	const [inventory, setInventory] = useState(initialInventory);
	const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
	const [openModals, setOpenModals] = useState([]);

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

		const sortedItems = [...inventory].sort((a, b) => {
			if (a[key] < b[key]) {
				return direction === 'ascending' ? -1 : 1;
			}
			if (a[key] > b[key]) {
				return direction === 'ascending' ? 1 : -1;
			}
			return 0;
		});

		setInventory(sortedItems);
	};

	const getSortIcon = (key) => {
		if (sortConfig.key !== key) return '↕';
		return sortConfig.direction === 'ascending' ? '↑' : '↓';
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
							className="border-t-2 border-b-2 border-r-2 border-l-2"
						>
							<div className="overflow-x-auto">
								<table className="min-w-full">
									<thead>
										<tr className="bg-gray-700">
											<th 
												className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase cursor-pointer"
												onClick={() => handleSort('name')}
											>
												Item {getSortIcon('name')}
											</th>
											<th 
												className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase cursor-pointer"
												onClick={() => handleSort('weight')}
											>
												Weight {getSortIcon('weight')}
											</th>
											<th 
												className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase cursor-pointer"
												onClick={() => handleSort('count')}
											>
												Count {getSortIcon('count')}
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-700">
										{inventory.map((item) => (
											<tr key={item.id} className="hover:bg-gray-700 transition-colors">
												<td className="px-4 py-2 text-gray-300">{item.name}</td>
												<td className="px-4 py-2 text-gray-300">{item.weight} kg</td>
												<td className="px-4 py-2 text-gray-300">{item.count}</td>
											</tr>
										))}
									</tbody>
								</table>
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
							<div className="grid grid-cols-1">
								{locations[character.currentLocation]?.nearbyLocations.map((location) => (
									<div 
										key={location} 
										className="flex items-center cursor-pointer hover:bg-gray-700 p-1 rounded transition-colors"
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