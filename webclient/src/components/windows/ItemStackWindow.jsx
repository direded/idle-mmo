'use client';

import ModalWindow from './ModalWindow';

export default class ItemStackWindow extends ModalWindow {
	constructor(props) {
		super(props);
	}

	render() {
		const { item } = this.props;
		// const title = item ? `Item: ${item.name}` : 'Item Details';
		const title = '';
		this.title = title;
		return super.render();
	}

	renderContent() {
		const { item } = this.props;
		
		if (!item) {
			return <div className="text-gray-300">No item selected</div>;
		}

		const rarityColors = {
			normal: 'text-gray-300',
			magic: 'text-blue-400',
			rare: 'text-yellow-400',
			unique: 'text-orange-400'
		};

		const rarityBgColors = {
			normal: 'bg-gray-600',
			magic: 'bg-blue-600',
			rare: 'bg-yellow-600',
			unique: 'bg-orange-600'
		};

		return (
			<div className="text-gray-300 p-3 pt-0">
				{/* Item Header */}
				<div className="flex items-center mb-4">
					<div className={`w-12 h-12 ${rarityBgColors[item.rarity]} rounded-lg flex items-center justify-center mr-3`}>
						<img
							src={item.icon}
							alt={item.name}
							className="w-8 h-8"
						/>
					</div>
					<div>
						<h2 className={`text-lg font-bold ${rarityColors[item.rarity]}`}>
							{item.name}
						</h2>
						<div className="text-sm text-gray-400 capitalize">
							{item.rarity} Item
						</div>
					</div>
				</div>

				{/* Item Properties */}
				<div className="space-y-3">
					{/* Basic Info */}
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="text-xs text-gray-400 block">Count</label>
							<div className="text-sm font-semibold">{item.count}</div>
						</div>
						<div>
							<label className="text-xs text-gray-400 block">Weight</label>
							<div className="text-sm font-semibold">{item.weight} kg</div>
						</div>
					</div>

					{/* Total Weight */}
					<div className="border-t border-gray-600 pt-3">
						<label className="text-xs text-gray-400 block">Total Weight</label>
						<div className="text-sm font-semibold">{(item.weight * item.count).toFixed(1)} kg</div>
					</div>

					{/* Item Type Detection */}
					{item.name.toLowerCase().includes('potion') && (
						<div className="border-t border-gray-600 pt-3">
							<div className="text-xs text-gray-400 mb-1">Type</div>
							<div className="text-sm text-green-400">Consumable</div>
						</div>
					)}

					{(item.name.toLowerCase().includes('sword') || 
					  item.name.toLowerCase().includes('armor') || 
					  item.name.toLowerCase().includes('dagger') || 
					  item.name.toLowerCase().includes('mail')) && (
						<div className="border-t border-gray-600 pt-3">
							<div className="text-xs text-gray-400 mb-1">Type</div>
							<div className="text-sm text-blue-400">Equipment</div>
						</div>
					)}

					{/* Actions */}
					<div className="border-t border-gray-600 pt-3">
						<div className="text-xs text-gray-400 mb-2">Actions</div>
						<div className="flex flex-wrap gap-2">
							{item.name.toLowerCase().includes('potion') && (
								<button 
									className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors"
									onClick={() => this.handleUseItem()}
								>
									Use
								</button>
							)}
							{(item.name.toLowerCase().includes('sword') || 
							  item.name.toLowerCase().includes('armor') || 
							  item.name.toLowerCase().includes('dagger') || 
							  item.name.toLowerCase().includes('mail')) && (
								<button 
									className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
									onClick={() => this.handleEquipItem()}
								>
									Equip
								</button>
							)}
							<button 
								className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors"
								onClick={() => this.handleExamineItem()}
							>
								Examine
							</button>
							<button 
								className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
								onClick={() => this.handleDropItem()}
							>
								Drop
							</button>
							{item.count > 1 && (
								<button 
									className="px-3 py-1 bg-red-700 hover:bg-red-800 text-white text-xs rounded transition-colors"
									onClick={() => this.handleDropAllItems()}
								>
									Drop All
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}

	handleUseItem() {
		const { item, gameController } = this.props;
		if (gameController && item) {
			gameController.updateItemCount(item.id, item.count - 1);
			gameController.addLog(`Used ${item.name}`, 'action');
		}
		this.onClose();
	}

	handleEquipItem() {
		const { item, gameController } = this.props;
		if (gameController && item) {
			gameController.addLog(`Equipped ${item.name}`, 'equipment');
		}
		this.onClose();
	}

	handleExamineItem() {
		const { item, gameController } = this.props;
		if (gameController && item) {
			gameController.addLog(`Examined ${item.name}`, 'examine');
		}
		this.onClose();
	}

	handleDropItem() {
		const { item, gameController } = this.props;
		if (gameController && item) {
			gameController.updateItemCount(item.id, item.count - 1);
			gameController.addLog(`Dropped ${item.name}`, 'action');
		}
		this.onClose();
	}

	handleDropAllItems() {
		const { item, gameController } = this.props;
		if (gameController && item) {
			gameController.removeInventoryItem(item.id);
			gameController.addLog(`Dropped all ${item.name}`, 'action');
		}
		this.onClose();
	}
} 