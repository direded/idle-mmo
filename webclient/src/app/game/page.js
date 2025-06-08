'use client';

import { useState } from 'react';
import Image from 'next/image';
import Tile from '../components/Tile';

// Mock data for demonstration
const initialCharacter = {
	name: 'Adventurer',
	level: 1,
	experience: 0,
	health: 100,
	gold: 50,
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
	{ id: 4, name: 'Leather Armor', weight: 3, count: 1 },
	{ id: 5, name: 'Leather Armor', weight: 3, count: 1 },
	{ id: 6, name: 'Leather Armor', weight: 3, count: 1 },
	{ id: 7, name: 'Leather Armor', weight: 3, count: 1 },
	{ id: 8, name: 'Leather Armor', weight: 3, count: 1 },
	{ id: 9, name: 'Leather Armor', weight: 3, count: 1 },
	{ id: 10, name: 'Leather Armor', weight: 3, count: 1 },
	{ id: 11, name: 'Leather Armor', weight: 3, count: 1 },
	{ id: 12, name: 'Leather Armor', weight: 3, count: 1 },
	{ id: 13, name: 'Leather Armor', weight: 3, count: 1 },
	{ id: 14, name: 'Leather Armor', weight: 3, count: 1 },
	{ id: 15, name: 'Leather Armor', weight: 3, count: 1 },
	{ id: 16, name: 'Leather Armor', weight: 3, count: 1 },
	{ id: 17, name: 'Leather Armor', weight: 3, count: 1 },
	{ id: 18, name: 'Leather Armor', weight: 3, count: 1 },
	{ id: 19, name: 'Leather Armor', weight: 3, count: 1 },
	{ id: 20, name: 'Leather Armor', weight: 3, count: 1 },
	{ id: 21, name: 'Leather Armor', weight: 3, count: 1 },
	{ id: 22, name: 'Leather Armor', weight: 3, count: 1 },
	{ id: 23, name: 'Leather Armor', weight: 3, count: 1 },
];

const availableActions = [
	{ id: 1, name: 'Go to Moscow', description: 'Travel to Moscow to find better equipment' },
	{ id: 2, name: 'Upgrade Equipment', description: 'Improve your current gear' },
	{ id: 3, name: 'Hunt Monsters', description: 'Fight monsters to gain experience and loot' },
];

export default function GamePage() {
	const [character, setCharacter] = useState(initialCharacter);
	const [inventory, setInventory] = useState(initialInventory);
	const [selectedAction, setSelectedAction] = useState(null);
	const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

	const handleAction = (action) => {
		setSelectedAction(action);
		// Here you would implement the actual action logic
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
		<div className="min-h-screen bg-gray-900">
			<div className="max-w-6xl mx-auto">
				<div className="grid grid-cols-2">
					{/* Character Info Section */}
					<Tile
						title="Character Info"
						className="border-t-2 border-b-2 border-r-2 border-l-2"
					>
						<div className="grid grid-cols-2">
							<div>
								<p className="text-gray-300">Name: <span className="font-medium text-white">{character.name}</span></p>
								<p className="text-gray-300">Level: <span className="font-medium text-white">{character.level}</span></p>
								<p className="text-gray-300">Experience: <span className="font-medium text-white">{character.experience}</span></p>
							</div>
							<div>
								<p className="text-gray-300">Health: <span className="font-medium text-white">{character.health}</span></p>
								<p className="text-gray-300">Gold: <span className="font-medium text-white">{character.gold}</span></p>
							</div>
						</div>
					</Tile>

					{/* Inventory Section */}
					<Tile 
						title="Inventory"
						className="min-h-96 max-h-96 border-t-2 border-b-2 border-r-2"
					>
						<div className="relative h-full">
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
											className="w-22 px-3 py-1 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600 transition-colors"
											onClick={() => handleSort('weight')}
										>
											Weight {getSortIcon('weight')}
										</th>
										<th 
											className="w-22 px-3 py-1 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600 transition-colors"
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
											<td className="w-22 px-3 py-1 whitespace-nowrap text-gray-300 group-hover:text-white transition-colors">{item.weight} kg</td>
											<td className="w-22 px-3 py-1 whitespace-nowrap text-gray-300 group-hover:text-white transition-colors">{item.count}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</Tile>
				</div>

				{/* Actions Section */}
				<Tile 
					title="Actions"
					className="border-b-2 border-r-2 border-l-2"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						{availableActions.map((action) => (
							<button
								key={action.id}
								onClick={() => handleAction(action)}
								className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 text-left transition-colors border-2 border-indigo-500"
							>
								<h3 className="font-semibold mb-2">{action.name}</h3>
								<p className="text-sm text-indigo-200">{action.description}</p>
							</button>
						))}
					</div>
				</Tile>
			</div>
		</div>
	);
} 