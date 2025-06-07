'use client';

import { useState } from 'react';

// Mock data for demonstration
const initialCharacter = {
	name: 'Adventurer',
	level: 1,
	experience: 0,
	health: 100,
	gold: 50,
};

const initialInventory = [
	{ id: 1, name: 'Wooden Sword', weight: 2, count: 1 },
	{ id: 2, name: 'Health Potion', weight: 0.5, count: 3 },
	{ id: 3, name: 'Leather Armor', weight: 3, count: 1 },
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

	const handleAction = (action) => {
		setSelectedAction(action);
		// Here you would implement the actual action logic
	};

	return (
		<div className="min-h-screen bg-gray-900 p-8">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-4xl font-bold mb-8 text-center text-white">Idle Game</h1>
				
				{/* Character Info Section */}
				<div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-700">
					<h2 className="text-2xl font-semibold mb-4 text-white">Character Info</h2>
					<div className="grid grid-cols-2 gap-4">
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
				</div>

				{/* Inventory Section */}
				<div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-700">
					<h2 className="text-2xl font-semibold mb-4 text-white">Inventory</h2>
					<div className="overflow-x-auto">
						<table className="min-w-full">
							<thead>
								<tr className="bg-gray-700">
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Item</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Weight</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Count</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-700">
								{inventory.map((item) => (
									<tr key={item.id} className="hover:bg-gray-700 transition-colors">
										<td className="px-6 py-4 whitespace-nowrap text-gray-300">{item.name}</td>
										<td className="px-6 py-4 whitespace-nowrap text-gray-300">{item.weight} kg</td>
										<td className="px-6 py-4 whitespace-nowrap text-gray-300">{item.count}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* Actions Section */}
				<div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
					<h2 className="text-2xl font-semibold mb-4 text-white">Available Actions</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{availableActions.map((action) => (
							<button
								key={action.id}
								onClick={() => handleAction(action)}
								className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg p-4 text-left transition-colors border border-indigo-500"
							>
								<h3 className="font-semibold mb-2">{action.name}</h3>
								<p className="text-sm text-indigo-200">{action.description}</p>
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
} 