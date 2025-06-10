import { redirect } from 'next/navigation';

const NetworkController = (() => {
	const packetType = {
		tokenCl: -1,
		userProfileCl: 10,
		updateCharacterCl: 11,
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

		[packetType.updateCharacterCl]: (message) => {

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
		return messageHandlers[message.type](message)
	}

	return {
		onError: () => {},
		onSuccess: () => {},
		packetType,
		initSocket,
		sendToken,
		isTokenValid: null
	}

})();

export { NetworkController };