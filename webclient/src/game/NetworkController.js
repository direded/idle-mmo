/** @import { GameController } from '@/game/GameController' */
import { redirect } from 'next/navigation';
import PacketType from './PacketType'
import { PacketFactory } from './PacketFactory';

const NetworkController = (() => {

	let ready = false

	/** @type {GameController} */
	let viewModel = null

	/**
	 * @type {WebSocket}
	 */
	let socket

	/**
	 * Packet id counter
	 * increases every time it get gotten 
	 */ 
	let packetIdConter = 0
	
	let getNextPacketId = () => {
		let next = packetIdCounter
		packetIdCounter = packetIdCounter + 1
		if (packetIdCounter > 65535) {
			packetIdCounter = 0
		}
		return next
	}

	/** 
	 * Contains callbacks for sent packets to server
	 * @type {Object<number, Object<string, function>}>}
	 */
	let subscribers = {}
	
	for (let key in PacketType) {
		if (key.endsWith('Cp')) {
			subscribers[key] = {}
		}
	}

	// TODO: move away from network controller
	let defaultTile = {
		activities: []
	}

	// Packet handlers 
	const messageHandlers = {
		[PacketType.tokenCp]: (message) => {
			NetworkController.tokenResponseAccepted = true
			if (!message.success) {
				NetworkController.onError('Wrong token')
				NetworkController.isTokenValid = false
				return;
			}
			localStorage.setItem('sessionToken', message.sessionToken);
			console.log("WebSocket initialized")
			NetworkController.isTokenValid = true
			if (message.redirect) redirect(message.redirect);
		},
		
		[PacketType.gameDataCp]: (message) => {
		},

		[PacketType.userProfileCp]: (message) => {
			
		},

		[PacketType.characterDataCp]: (message) => {
			let state = viewModel.state;
			state.character.name = message.name;
			state.task = message.task;

			state.currentLocation = { ...defaultTile, uuid: message.tile }
			if (!state.currentLocation.name) {
				state.currentLocation.name = message.tile
			}

			state.nearbyLocations = []
			for (let key in message.tile.neighbors) {
				let tile = message.tile.neighbors[key]
				state.nearbyLocations.push({
					name: tile.name,
					id: tile.id
				})
			}
			

			viewModel.notifySubscribers();
		},
	}

	const initSocket = (token, redirect, onSuccess, onError) => {
		console.log("WebSocket initializing..")
		if (socket != null) {
			socket.close()
		}
		NetworkController.onError = onError
		NetworkController.onSuccess = onSuccess

		socket = new WebSocket('ws://localhost:9000')

		socket.onmessage = (event) => {
			var message = JSON.parse(event.data);
			console.log('Message received', event.data);
			receiveMessage(message);
		};

		socket.addEventListener('close', (event) => {
			console.log('WebSocket connection closed')
		});


		sendToken(socket, token, redirect, onError);

		return socket
	}

	/** @param s {WebSocket} */
	const sendToken = (s, token, redirect, onError) => {
		NetworkController.tokenResponseAccepted = false
		const sendTokenOnConnectionOpen = () => {
			let message = { 'token': token, redirect }
			console.log('Sending', message)
			s.send(JSON.stringify(message));
		}
		
		s.addEventListener('open', sendTokenOnConnectionOpen);
		new Promise(res => setTimeout(res, 3000))
		.then(res => {
			return new Promise((resolve, reject) => {
				if (s == null || s.readyState != WebSocket.OPEN || localStorage.getItem('sessionToken') == null) {
					reject()
				} else {
					resolve()
				}
			})
		})
		.catch(() => {
			if (!NetworkController.tokenResponseAccepted) {
				if (s != null) 
					s.close()
				if (onError != null)
					onError('Cannot connect to server')
			}
			
		})
		.finally(() => {
			if (s != null) {
				s.removeEventListener('open', sendTokenOnConnectionOpen);
			}
		});
	}

	let incomingMessageQueue = []

	let receiveMessage = (message) => {
		if (ready || message.packet_type == PacketType.tokenCp) {
			return processReceivedMessage(message)
		} else {
			incomingMessageQueue.push(message);
		}
	}

	let processReceivedMessage = (message) => {
		if (message.packet_id) {
			let callback = subscribers[message.packet_type][message.packet_id]
			if (callback) {
				callback(message)
				delete subscribers[message.packet_type][message.packet_id]
			}
		}
		if (message.gameData != undefined) {
			processGameDataMessage(message)
		}
		return messageHandlers[message.packet_type](message)
	}

	let isObject = (a) => {
		typeof a === 'object' && a !== null
	}

	/**
	 * Обработка сообщения {@link message}, содержащего gameData
	 * Алгоритм проходит по всем ключам рекурсивно, присваивая установленные в viewModel.state
	 * 
	 * @param {Object} message Сообщение от сервера
	 */
	let processGameDataMessage = (message) => {
		if (Object.keys(message.gameData).length == 0) {
			return
		}
		
		// Check if time data is being updated
		let hasTimeUpdate = false;
		let timeData = null;
		
		// Check for time data in the message (new format: { timestamp, speed })
		if (message.gameData.time) {
			hasTimeUpdate = true;
			timeData = message.gameData.time;
		}
		
		let from = message.gameData
		let stack = [{from, keys: Object.keys(from), id: 0, to: viewModel.state}]
		while (stack.length > 0) {
			let frame = stack[stack.length - 1]
			let keyToProcess = frame.keys[frame.id]
			let value = frame.from[keyToProcess]
			if (isObject(value) && frame.to[keyToProcess] != null && Object.keys(value).length > 0) {
				stack.push({
					from: value,
					to: frame.to[keyToProcess],
					keys: Object.keys(value),
					id: 0
				})
			} else {
				console.log(keyToProcess, value)
				frame.to[keyToProcess] = value
				frame.id = frame.id + 1
				if (frame.id >= frame.keys.length) {
					stack.pop()
				}
			}
		}
		
		// Sync time with TimeController if time data was received
		if (hasTimeUpdate && viewModel.timeController) {
			viewModel.timeController.syncWithServer(timeData);
		}
		
		viewModel.notifySubscribers();
	}

	let sendPacket = (message, callback) => {
		if (callback) {
			let packedId = getNextPacketId()
			message.packet_id = packedId
			subscribers[message.packet_type][packetId] = callback
		}
		socket.send(JSON.stringify(message))
	}
	
	return {
		onError: () => {},
		onSuccess: () => {},
		initSocket,
		setViewModel: (/** @type {GameController} */value) => { viewModel = value },
		isTokenValid: null,
		setReady: (value) => {
			ready = value;
			if (value) {
				for (let message of incomingMessageQueue) {
					processReceivedMessage(message)
				}
				incomingMessageQueue = []
			}
		}
	}

})();

export { NetworkController };