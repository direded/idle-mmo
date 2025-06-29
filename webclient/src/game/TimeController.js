/**
 * TimeController handles client-side time prediction and synchronization with server
 */
export class TimeController {
	constructor() {
		this.time = {
			hours: -1,    // -1 indicates not set
			minutes: -1,  // -1 indicates not set
			day: -1,      // -1 indicates not set
			year: -1      // -1 indicates not set
		};
		
		this.timestamp = 0; // Server timestamp in milliseconds
		this.speed = 1; // Time speed multiplier (1 = real time, 2 = 2x speed, etc.)
		this.isRunning = false;
		this.intervalId = null;
		this.lastUpdateTime = Date.now();
		this.subscribers = new Set();
		this.isInitialized = false; // Track if time has been set by server
	}

	/**
	 * Start time prediction
	 */
	start() {
		if (this.isRunning || !this.isInitialized) return; // Don't start until initialized
		
		this.isRunning = true;
		this.lastUpdateTime = Date.now();
		
		this.intervalId = setInterval(() => {
			this.updateTime();
		}, 250); // Update every second
	}

	/**
	 * Stop time prediction
	 */
	stop() {
		if (!this.isRunning) return;
		
		this.isRunning = false;
		if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
	}

	/**
	 * Update time based on elapsed time and speed
	 */
	updateTime() {
		if (!this.isInitialized) return; // Don't update if not initialized
		
		const now = Date.now();
		const elapsed = now - this.lastUpdateTime;
		const gameMinutes = elapsed * this.speed / 1000;
		
		// Update timestamp
		this.timestamp += gameMinutes * 60 * 1000; // Convert to milliseconds
		
		this.lastUpdateTime = now;

		// Convert timestamp to game time
		if (this.updateGameTimeFromTimestamp()) {
			this.notifySubscribers();
		}
	}

	/**
	 * Convert timestamp to game time (hours, minutes, day, year)
	 */
	updateGameTimeFromTimestamp() {
		// Convert milliseconds to game time
		// Assuming 1 real second = 1 game minute (adjust as needed)
		const gameMinutes = Math.floor(this.timestamp / (1000 * 60));
		const gameHours = Math.floor(gameMinutes / 60);
		const gameDays = Math.floor(gameHours / 24);
		
		// Calculate game time
		let hours = gameHours % 24;
		let minutes = gameMinutes % 60;
		let day = (gameDays % 7) + 1; // Day 1-7 (Monday-Sunday)
		let year = Math.floor(gameDays / 365) + 1; // Starting year 203

		if (this.time.hours == hours &&
			this.time.minutes == minutes &&
			this.time.day == day &&
			this.time.year == year
		) {
			return false;
		} else {
			this.time.hours = hours;
			this.time.minutes = minutes;
			this.time.day = day;
			this.time.year = year;
			return true;
		}
	}

	/**
	 * Sync time with server data
	 * @param {Object} serverTime - Time object from server { timestamp, speed }
	 */
	syncWithServer(serverTime) {
		// Stop current prediction
		this.stop();
		
		// Update timestamp and speed
		this.timestamp = serverTime.timestamp || 0;
		this.speed = serverTime.speed || 1;
		this.isInitialized = true; // Mark as initialized
		
		// Convert timestamp to game time
		if (this.updateGameTimeFromTimestamp()) {
			this.notifySubscribers();
		}
		
		// Restart prediction
		this.start();
		
	}

	/**
	 * Get current time
	 * @returns {Object} Current time object
	 */
	getTime() {
		return { ...this.time };
	}

	/**
	 * Get current timestamp
	 * @returns {number} Current timestamp in milliseconds
	 */
	getTimestamp() {
		return this.timestamp;
	}

	/**
	 * Check if time has been initialized by server
	 * @returns {boolean} True if time has been set by server
	 */
	isTimeInitialized() {
		return this.isInitialized;
	}

	/**
	 * Get formatted time string (HH:MM)
	 * @returns {string} Formatted time string or "--:--" if not initialized
	 */
	getFormattedTime() {
		if (!this.isInitialized || this.time.hours === -1 || this.time.minutes === -1) {
			return "--:--";
		}
		return `${this.time.hours.toString().padStart(2, '0')}:${this.time.minutes.toString().padStart(2, '0')}`;
	}

	/**
	 * Get formatted date string (DD.MM.YYY)
	 * @returns {string} Formatted date string or "--.--.---" if not initialized
	 */
	getFormattedDate() {
		if (!this.isInitialized || this.time.day === -1 || this.time.year === -1) {
			return "--.--.---";
		}
		return `${this.time.day.toString().padStart(2, '0')}.05.${this.time.year}`;
	}

	/**
	 * Get day name from day number
	 * @returns {string} Day name or "--" if not initialized
	 */
	getDayName() {
		if (!this.isInitialized || this.time.day === -1) {
			return "--";
		}
		const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
		// Day 1 = Monday, so we subtract 1 to get array index
		const dayIndex = (this.time.day - 1) % 7;
		return days[dayIndex];
	}

	/**
	 * Subscribe to time changes
	 * @param {Function} callback - Callback function to call when time changes
	 * @returns {Function} Unsubscribe function
	 */
	subscribe(callback) {
		this.subscribers.add(callback);
		return () => this.subscribers.delete(callback);
	}

	/**
	 * Notify all subscribers of time changes
	 */
	notifySubscribers() {
		this.subscribers.forEach(callback => callback(this.getTime()));
	}

	/**
	 * Clean up resources
	 */
	destroy() {
		this.stop();
		this.subscribers.clear();
	}
} 