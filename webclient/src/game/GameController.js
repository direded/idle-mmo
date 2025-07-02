import { NetworkController } from './NetworkController';
import { TimeController } from './TimeController';

export class GameController {
	constructor() {
		// Initialize TimeController first
		this.timeController = new TimeController();
		
		this.state = {
			activeTab: 'general',
			windowModals: [
			],
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
			inventory: {
				items: [
					// { id: 1, name: 'Iron Sword', icon: '/assets/items/sword.png', count: 1, weight: 2.5, rarity: 'normal' },
					// { id: 2, name: 'Steel Dagger', icon: '/assets/items/sword.png', count: 1, weight: 1.2, rarity: 'magic' },
					// { id: 4, name: 'Chain Mail', icon: '/assets/items/leather.png', count: 1, weight: 4.5, rarity: 'rare' },
				]
			},
			currentLocation: null,
			// currentLocation: {
			// 	uuid: '',
			// 	name: 'Forest Clearing',
			// 	description: 'A peaceful clearing surrounded by tall trees. The air is fresh and you can hear birds chirping in the distance. This area is known for its abundant resources and wildlife.',
			// 	activities: [
			// 		{ uuid: '', name: 'Gathering Wood' },
			// 	]
			// },
			nearbyLocations: null,
			// nearbyLocations: [
			// 	{
			// 		uuid: '',
			// 		name: 'Dark Forest',
			// 		description: 'A dense forest with ancient trees. Home to dangerous creatures.',
			// 		distance: '0.5 km',
			// 		direction: 'NW'
			// 	}
			// ],
			task: {
				type: "null"
			},
			weather: {
				condition: 'Sunny',
				temperature: 22,
				humidity: 65,
				windSpeed: 5
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

	// Location Management Methods (MVVM Architecture)
	
	/**
	 * Get current location information
	 * @returns {Object} Current location object
	 */
	getCurrentLocation() {
		return this.state.currentLocation;
	}

	/**
	 * Get nearby locations
	 * @returns {Array} Array of nearby location objects
	 */
	getNearbyLocations() {
		return this.state.nearbyLocations;
	}

	// Inventory Management Methods (MVVM Architecture)
	
	/**
	 * Get all inventory items
	 * @returns {Array} Array of inventory items
	 */
	getInventoryItems() {
		return this.state.inventory.items;
	}

	/**
	 * Remove item from inventory by ID
	 * @param {number} itemId - ID of item to remove
	 */
	removeInventoryItem(itemId) {
		this.state.inventory.items = this.state.inventory.items.filter(item => item.id !== itemId);
		this.notifySubscribers();
	}

	/**
	 * Update item count in inventory
	 * @param {number} itemId - ID of item to update
	 * @param {number} newCount - New count value
	 */
	updateItemCount(itemId, newCount) {
		const item = this.state.inventory.items.find(i => i.id === itemId);
		if (item) {
			item.count = newCount;
			if (newCount <= 0) {
				this.removeInventoryItem(itemId);
			} else {
				this.notifySubscribers();
			}
		}
	}

	// Time Management Methods (MVVM Architecture)
	
	/**
	 * Get current time information
	 * @returns {Object} Time object with hours, minutes, day, and year properties
	 */
	getTime() {
		return this.timeController.getTime();
	}

	/**
	 * Set time information (syncs with server)
	 * @param {Object} time - Time object with timestamp and speed properties
	 */
	setTime(time) {
		this.timeController.syncWithServer(time);
	}

	/**
	 * Get formatted time string
	 * @returns {string} Formatted time string (HH:MM)
	 */
	getFormattedTime() {
		return this.timeController.getFormattedTime();
	}

	/**
	 * Get day name
	 * @returns {string} Day name
	 */
	getDayName() {
		return this.timeController.getDayName();
	}

	/**
	 * Check if time has been initialized by server
	 * @returns {boolean} True if time is initialized
	 */
	isTimeInitialized() {
		return this.timeController.isTimeInitialized();
	}

	/**
	 * Get time speed
	 * @returns {number} Current time speed
	 */
	getTimeSpeed() {
		return this.timeController.speed;
	}

	/**
	 * Get TimeController instance for direct subscription
	 * @returns {TimeController} TimeController instance
	 */
	getTimeController() {
		return this.timeController;
	}

	/**
	 * Start time prediction
	 */
	startTimePrediction() {
		// Only start if time has been initialized by server
		if (this.timeController.isTimeInitialized()) {
			this.timeController.start();
		}
	}

	/**
	 * Stop time prediction
	 */
	stopTimePrediction() {
		this.timeController.stop();
	}

	/**
	 * Clean up resources
	 */
	destroy() {
		this.stopTimePrediction();
		if (this.timeController) {
			this.timeController.destroy();
		}
		this.subscribers.clear();
	}

	// Weather Management Methods (MVVM Architecture)
	
	/**
	 * Get current weather information
	 * @returns {Object} Weather object with condition, temperature, humidity, windSpeed
	 */
	getWeather() {
		return this.state.weather;
	}

	/**
	 * Get weather condition icon/emoji
	 * @returns {string} Weather condition representation
	 */
	getWeatherIcon() {
		const weatherIcons = {
			'Sunny': '☀️',
			'Cloudy': '☁️',
			'Rainy': '🌧️',
			'Stormy': '⛈️',
			'Snowy': '❄️',
			'Foggy': '🌫️',
			'Windy': '💨'
		};
		return weatherIcons[this.state.weather.condition] || '🌤️';
	}

	// Log Management Methods (MVVM Architecture)
	
	/**
	 * Add a single log entry with timestamp
	 * @param {string} message - The log message
	 * @param {string} type - The type of log (optional, defaults to 'info')
	 */
	addLog(message, type = 'info') {
		const timestamp = new Date().toLocaleTimeString('en-US', { 
			hour12: false, 
			hour: '2-digit', 
			minute: '2-digit' 
		});
		const logEntry = `[${timestamp}] ${message}`;
		
		this.state.logs = [...this.state.logs, { type, content: logEntry, timestamp }];
		this.notifySubscribers();
	}

	/**
	 * Get all logs as formatted strings for display
	 * @returns {Array} Array of formatted log strings
	 */
	getLogsAsStrings() {
		return this.state.logs.map(log => log.content);
	}

	// Window Modal Management
	removeWindowModal(id) {
		this.state.windowModals = [];
		this.notifySubscribers();
	}

	setWindowModal(modal) {
		this.state.windowModals = [modal];
		this.notifySubscribers();
	}

	// Task Management Methods
	setTask(task) {
		this.state.task = task;
		this.notifySubscribers();
	}

	getTask() {
		return this.state.task;
	}
} 