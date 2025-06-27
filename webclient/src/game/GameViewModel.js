import { NetworkController } from './NetworkController';

export class GameViewModel {
	constructor() {
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
			time: {
				day: 'Monday',
				date: '14.05.203',
				time: '13:48',
				formatted: '14.05.203 13:48'
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
	 * @param {Array} activities - Array of activity objects with id and name
	 */
	setLocationActivities(activities) {
		this.state.currentLocation.activities = [...activities];
		this.notifySubscribers();
	}

	/**
	 * Add activity to current location
	 * @param {string} activityName - Activity name to add
	 */
	addLocationActivity(activityName) {
		const activityExists = this.state.currentLocation.activities.some(act => act.name === activityName);
		if (!activityExists) {
			const newActivity = {
				uuid: '',
				name: activityName
			};
			this.state.currentLocation.activities.push(newActivity);
			this.notifySubscribers();
		}
	}

	/**
	 * Remove activity from current location
	 * @param {string} activityName - Activity name to remove
	 */
	removeLocationActivity(activityName) {
		this.state.currentLocation.activities = this.state.currentLocation.activities.filter(act => act.name !== activityName);
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
			this.state.inventory.items.push({ ...item, uuid: '' });
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

	// Time Management Methods (MVVM Architecture)
	
	/**
	 * Get current time information
	 * @returns {Object} Time object with day, date, time, and formatted properties
	 */
	getTime() {
		return this.state.time;
	}

	/**
	 * Set time information
	 * @param {Object} time - Time object with day, date, time properties
	 */
	setTime(time) {
		this.state.time = { 
			...time, 
			formatted: `${time.date} ${time.time}` 
		};
		this.notifySubscribers();
	}

	/**
	 * Update time
	 * @param {string} time - Time string (HH:MM format)
	 */
	setTimeOnly(time) {
		this.state.time.time = time;
		this.state.time.formatted = `${this.state.time.date} ${time}`;
		this.notifySubscribers();
	}

	/**
	 * Update date
	 * @param {string} date - Date string (DD.MM.YYY format)
	 */
	setDateOnly(date) {
		this.state.time.date = date;
		this.state.time.formatted = `${date} ${this.state.time.time}`;
		this.notifySubscribers();
	}

	/**
	 * Update day of week
	 * @param {string} day - Day name
	 */
	setDayOnly(day) {
		this.state.time.day = day;
		this.notifySubscribers();
	}

	/**
	 * Advance time by minutes
	 * @param {number} minutes - Minutes to advance
	 */
	advanceTime(minutes) {
		const [hours, mins] = this.state.time.time.split(':').map(Number);
		let totalMinutes = hours * 60 + mins + minutes;
		
		// Handle day overflow (24 hours = 1440 minutes)
		while (totalMinutes >= 1440) {
			totalMinutes -= 1440;
			this.advanceDay();
		}
		
		const newHours = Math.floor(totalMinutes / 60);
		const newMins = totalMinutes % 60;
		const newTime = `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`;
		
		this.setTimeOnly(newTime);
	}

	/**
	 * Advance to next day
	 */
	advanceDay() {
		const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
		const currentDayIndex = days.indexOf(this.state.time.day);
		const nextDayIndex = (currentDayIndex + 1) % 7;
		this.setDayOnly(days[nextDayIndex]);
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
	 * Set weather information
	 * @param {Object} weather - Weather object with condition, temperature, humidity, windSpeed
	 */
	setWeather(weather) {
		this.state.weather = { ...weather };
		this.notifySubscribers();
	}

	/**
	 * Update weather condition
	 * @param {string} condition - Weather condition (e.g., 'Sunny', 'Rainy', 'Cloudy')
	 */
	setWeatherCondition(condition) {
		this.state.weather.condition = condition;
		this.notifySubscribers();
	}

	/**
	 * Update temperature
	 * @param {number} temperature - Temperature in Celsius
	 */
	setTemperature(temperature) {
		this.state.weather.temperature = temperature;
		this.notifySubscribers();
	}

	/**
	 * Update humidity
	 * @param {number} humidity - Humidity percentage
	 */
	setHumidity(humidity) {
		this.state.weather.humidity = humidity;
		this.notifySubscribers();
	}

	/**
	 * Update wind speed
	 * @param {number} windSpeed - Wind speed in km/h
	 */
	setWindSpeed(windSpeed) {
		this.state.weather.windSpeed = windSpeed;
		this.notifySubscribers();
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

	removeWindowModal(id) {
		this.state.windowModals = [];
		this.notifySubscribers();
	}

	addWindowModal(modal) {
		this.state.windowModals = [modal];
		this.notifySubscribers();
	}

	setWindowModal(modal) {
		this.state.windowModals = [modal];
		this.notifySubscribers();
	}
} 