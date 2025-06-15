import { NetworkController } from './NetworkController';

export class GameViewModel {
	constructor() {
		this.state = {
			activeTab: 'general',
			showLocationModal: false,
			selectedLocation: null,
			showSettingsModal: false,
			message: '',
			logs: [],
			character: {
				name: '',
				health: 0,
				maxHealth: 0,
				hunger: 0,
				maxHunger: 0,
				energy: 0,
				maxEnergy: 0
			},
			equipment: {
				head: '',
				chest: '',
				weapon: ''
			},
			inventory: {
				gold: 0,
				potion: 0,
				food: 0
			},
			currentLocation: '',
			nearbyLocations: [],
			settings: {
				soundVolume: 0,
				musicVolume: 0,
				showFPS: false
			},
			process: {
				type: "null"
			}
		};

		this.networkController = NetworkController;
		this.subscribers = new Set();
	}

	// Subscribe to state changes
	subscribe(callback) {
		this.subscribers.add(callback);
		return () => this.subscribers.delete(callback);
	}

	// Notify all subscribers of state changes
	notifySubscribers() {
		this.subscribers.forEach(callback => callback(this.state));
	}

	// State update methods
	setActiveTab(tab) {
		this.state.activeTab = tab;
		this.notifySubscribers();
	}

	setShowLocationModal(show) {
		this.state.showLocationModal = show;
		this.notifySubscribers();
	}

	setSelectedLocation(location) {
		this.state.selectedLocation = location;
		this.notifySubscribers();
	}

	setShowSettingsModal(show) {
		this.state.showSettingsModal = show;
		this.notifySubscribers();
	}

	setMessage(message) {
		this.state.message = message;
		this.notifySubscribers();
	}

	sendMessage() {
		if (this.state.message.trim()) {
			const newLog = { type: 'user', content: this.state.message };
			this.state.logs = [...this.state.logs, newLog];
			this.state.message = '';
			this.notifySubscribers();
		}
	}

	updateSettings(settings) {
		this.state.settings = { ...this.state.settings, ...settings };
		this.notifySubscribers();
	}

	// Game logic methods
	updateCharacterStats(stats) {
		this.state.character = { ...this.state.character, ...stats };
		this.notifySubscribers();
	}

	updateEquipment(equipment) {
		this.state.equipment = { ...this.state.equipment, ...equipment };
		this.notifySubscribers();
	}

	updateInventory(inventory) {
		this.state.inventory = { ...this.state.inventory, ...inventory };
		this.notifySubscribers();
	}

	changeLocation(location) {
		this.state.currentLocation = location;
		this.notifySubscribers();
	}
} 