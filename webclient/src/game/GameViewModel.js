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
				food: 0,
				items: [
					{ id: 1, name: 'Iron Sword', icon: '/assets/items/sword.png', count: 1, weight: 2.5, rarity: 'normal' },
					{ id: 2, name: 'Steel Dagger', icon: '/assets/items/sword.png', count: 1, weight: 1.2, rarity: 'magic' },
					{ id: 3, name: 'Leather Armor', icon: '/assets/items/leather.png', count: 1, weight: 3.0, rarity: 'normal' },
					{ id: 4, name: 'Chain Mail', icon: '/assets/items/leather.png', count: 1, weight: 4.5, rarity: 'rare' },
					{ id: 5, name: 'Health Potion', icon: '/assets/items/potion.png', count: 15, weight: 0.5, rarity: 'normal' },
					{ id: 6, name: 'Mana Potion', icon: '/assets/items/potion.png', count: 8, weight: 0.5, rarity: 'normal' },
					{ id: 7, name: 'Greater Healing Potion', icon: '/assets/items/potion.png', count: 3, weight: 0.8, rarity: 'magic' },
					{ id: 8, name: 'Leather Scraps', icon: '/assets/items/leather.png', count: 25, weight: 0.1, rarity: 'normal' },
					{ id: 9, name: 'Iron Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'normal' },
					{ id: 10, name: 'Steel Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'rare' }
				]
			},
			currentLocation: {
				name: 'Forest Clearing',
				description: 'A peaceful clearing surrounded by tall trees. The air is fresh and you can hear birds chirping in the distance. This area is known for its abundant resources and wildlife.',
				activities: [
					'Gathering Wood',
					'Hunting',
					'Gathering Herbs',
					'Fishing'
				]
			},
			nearbyLocations: [
				{
					name: 'Dark Forest',
					description: 'A dense forest with ancient trees. Home to dangerous creatures.',
					distance: '0.5 km',
					direction: 'NW'
				},
				{
					name: 'Mountain Pass',
					description: 'A narrow path through the mountains. Rich in minerals and ores.',
					distance: '1.2 km',
					direction: 'W'
				},
				{
					name: 'Riverside Camp',
					description: 'A peaceful camp by the river. Perfect for fishing and water activities.',
					distance: '0.8 km',
					direction: 'NE'
				}
			],
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

	// Location Management Methods (MVVM Architecture)
	
	/**
	 * Set current location information
	 * @param {Object} location - Location object with name, description, and activities
	 */
	setCurrentLocation(location) {
		this.state.currentLocation = { ...location };
		this.notifySubscribers();
	}

	/**
	 * Update current location name
	 * @param {string} name - New location name
	 */
	setLocationName(name) {
		this.state.currentLocation.name = name;
		this.notifySubscribers();
	}

	/**
	 * Update current location description
	 * @param {string} description - New location description
	 */
	setLocationDescription(description) {
		this.state.currentLocation.description = description;
		this.notifySubscribers();
	}

	/**
	 * Set available activities for current location
	 * @param {Array} activities - Array of activity names
	 */
	setLocationActivities(activities) {
		this.state.currentLocation.activities = [...activities];
		this.notifySubscribers();
	}

	/**
	 * Add activity to current location
	 * @param {string} activity - Activity name to add
	 */
	addLocationActivity(activity) {
		if (!this.state.currentLocation.activities.includes(activity)) {
			this.state.currentLocation.activities.push(activity);
			this.notifySubscribers();
		}
	}

	/**
	 * Remove activity from current location
	 * @param {string} activity - Activity name to remove
	 */
	removeLocationActivity(activity) {
		this.state.currentLocation.activities = this.state.currentLocation.activities.filter(a => a !== activity);
		this.notifySubscribers();
	}

	/**
	 * Set nearby locations
	 * @param {Array} locations - Array of location objects
	 */
	setNearbyLocations(locations) {
		this.state.nearbyLocations = [...locations];
		this.notifySubscribers();
	}

	/**
	 * Add nearby location
	 * @param {Object} location - Location object with name, description, distance, direction
	 */
	addNearbyLocation(location) {
		this.state.nearbyLocations.push(location);
		this.notifySubscribers();
	}

	/**
	 * Remove nearby location by name
	 * @param {string} locationName - Name of location to remove
	 */
	removeNearbyLocation(locationName) {
		this.state.nearbyLocations = this.state.nearbyLocations.filter(loc => loc.name !== locationName);
		this.notifySubscribers();
	}

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
	 * Set all inventory items
	 * @param {Array} items - Array of item objects
	 */
	setInventoryItems(items) {
		this.state.inventory.items = [...items];
		this.notifySubscribers();
	}

	/**
	 * Add item to inventory
	 * @param {Object} item - Item object to add
	 */
	addInventoryItem(item) {
		// Check if item already exists
		const existingItem = this.state.inventory.items.find(i => i.name === item.name);
		if (existingItem) {
			// Update count if item exists
			existingItem.count += item.count || 1;
		} else {
			// Add new item
			this.state.inventory.items.push({ ...item, id: Date.now() });
		}
		this.notifySubscribers();
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

	/**
	 * Get inventory item by ID
	 * @param {number} itemId - ID of item to get
	 * @returns {Object|null} Item object or null if not found
	 */
	getInventoryItem(itemId) {
		return this.state.inventory.items.find(item => item.id === itemId) || null;
	}

	/**
	 * Get inventory item by name
	 * @param {string} itemName - Name of item to get
	 * @returns {Object|null} Item object or null if not found
	 */
	getInventoryItemByName(itemName) {
		return this.state.inventory.items.find(item => item.name === itemName) || null;
	}

	/**
	 * Update inventory gold
	 * @param {number} amount - New gold amount
	 */
	setInventoryGold(amount) {
		this.state.inventory.gold = amount;
		this.notifySubscribers();
	}

	/**
	 * Add gold to inventory
	 * @param {number} amount - Amount to add
	 */
	addInventoryGold(amount) {
		this.state.inventory.gold += amount;
		this.notifySubscribers();
	}

	/**
	 * Get inventory gold
	 * @returns {number} Current gold amount
	 */
	getInventoryGold() {
		return this.state.inventory.gold;
	}

	/**
	 * Get total inventory weight
	 * @returns {number} Total weight of all items
	 */
	getInventoryWeight() {
		return this.state.inventory.items.reduce((total, item) => total + (item.weight * item.count), 0);
	}

	/**
	 * Get inventory item count
	 * @returns {number} Total number of unique items
	 */
	getInventoryItemCount() {
		return this.state.inventory.items.length;
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
			content: `[${timestamp}] ${message}`,
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