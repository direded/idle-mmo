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
			if (!message.success) return;
			localStorage.setItem('sessionToken', message.sessionToken);
			redirect(message.redirect || '/game');
		},
		
		[packetType.userProfileCl]: (message) => {

		},

		[packetType.updateCharacterCl]: (message) => {

		},
	}

	const initSocket = (token, onSuccess, onError) => {
		let socket = new WebSocket('ws://localhost:9000')

		socket.onmessage = (event) => {
			var message = JSON.parse(event.data);
			console.log('Message received', event.data);
			receiveMessage(message);
		};

		socket.addEventListener('close', (event) => {
			console.log('WebSocket connection closed')
		});

		sendToken(socket, token, onError);

		return socket
	}

	const sendToken = (s, token, onError) => {
		const sendTokenOnConnectionOpen = () => {
			s.send(JSON.stringify({ 'token': token }));
		}
		
		s.addEventListener('open', sendTokenOnConnectionOpen);
		new Promise(res => setTimeout(res, 3000))
		.then(res => {
			return new Promise((resolve, reject) => {
				if (s == null || s.readyState != WebSocket.OPEN) {
					reject()
				} else {
					resolve()
				}
			})
		})
		.catch(() => {
			if (onError != null)
				onError()
			
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
		packetType,
		initSocket,
		sendToken
	}

})();

export { NetworkController };