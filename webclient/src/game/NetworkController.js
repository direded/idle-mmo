/** @import { GameViewModel } from '@/game/GameViewModel' */
import { redirect } from 'next/navigation';

const NetworkController = (() => {

	/** @type {GameViewModel} */
	let viewModel = null

	const packetType = {
		tokenCl: -1,
		userProfileCl: 10,
		characterDataCl: 11,
		testSv: 10000,
		commonSv: 20000
	}

	const messageHandlers = {
		[packetType.tokenCl]: (message) => {
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
		
		[packetType.userProfileCl]: (message) => {

		},

		[packetType.characterDataCl]: (message) => {
			let state = viewModel.state;
			state.character.name = message.name;
			state.process.type = message.process.type;

			state.currentLocation = message.tile.name;

			state.nearbyLocations = []
			for (let key in message.tile.neighbors) {
				console.log(key)
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
		NetworkController.onError = onError
		NetworkController.onSuccess = onSuccess
		let socket = new WebSocket('ws://localhost:9000')

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

	var receiveMessage = (message) => {
		return messageHandlers[message.packet_type](message)
	}

	return {
		onError: () => {},
		onSuccess: () => {},
		packetType,
		initSocket,
		setViewModel: (/** @type {GameViewModel} */value) => { viewModel = value },
		isTokenValid: null,
	}

})();

export { NetworkController };