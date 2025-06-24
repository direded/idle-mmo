import { NetworkController } from './NetworkController';

export class GameViewModel {
	constructor() {
		this.state = {
			activeTab: 'general',
			showLocationModal: false,
			selectedLocation: null,
			showSettingsModal: false,
			windowModals: [
				{ type: 'test' },
				{ type: 'test' },
				{ type: 'test' },
				{ type: 'test' },
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
	 * Add multiple log entries at once
	 * @param {Array} messages - Array of log messages
	 * @param {string} type - The type of log for all messages (optional)
	 */
	addLogs(messages, type = 'info') {
		const timestamp = new Date().toLocaleTimeString('en-US', { 
			hour12: false, 
			hour: '2-digit', 
			minute: '2-digit' 
		});
		
		const newLogs = messages.map(message => ({
			type,
			content: `${timestamp} ${message}`,
			timestamp
		}));
		
		this.state.logs = [...this.state.logs, ...newLogs];
		this.notifySubscribers();
	}

	/**
	 * Set logs to a specific array (replaces all existing logs)
	 * @param {Array} logs - Array of log objects or strings
	 */
	setLogs(logs) {
		if (Array.isArray(logs)) {
			// If logs are strings, convert them to log objects
			const processedLogs = logs.map(log => {
				if (typeof log === 'string') {
					const timestamp = new Date().toLocaleTimeString('en-US', { 
						hour12: false, 
						hour: '2-digit', 
						minute: '2-digit' 
					});
					return { type: 'info', content: log, timestamp };
				}
				return log;
			});
			
			this.state.logs = processedLogs;
			this.notifySubscribers();
		}
	}

	/**
	 * Clear all logs
	 */
	clearLogs() {
		this.state.logs = [];
		this.notifySubscribers();
	}

	/**
	 * Get all logs as formatted strings for display
	 * @returns {Array} Array of formatted log strings
	 */
	getLogsAsStrings() {
		return this.state.logs.map(log => log.content);
	}

	/**
	 * Get logs filtered by type
	 * @param {string} type - The type of logs to filter by
	 * @returns {Array} Array of filtered log objects
	 */
	getLogsByType(type) {
		return this.state.logs.filter(log => log.type === type);
	}

	/**
	 * Get the most recent N logs
	 * @param {number} count - Number of recent logs to return
	 * @returns {Array} Array of recent log objects
	 */
	getRecentLogs(count = 10) {
		return this.state.logs.slice(-count);
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