'use client';

import { NetworkController } from '@/game/NetworkController'
import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const WsContext = createContext(undefined)

const WsContextProvider = ({ children }) => {

	/** @type {[WebSocket]} */
	const [socket, setSocket] = useState(() => null);
	
	useEffect(() => {
		let localToken = localStorage.getItem('sessionToken');
		if (localStorage.getItem('sessionToken') != null && socket == null) {
			let s = NetworkController.initSocket(localToken)
			setSocket(s)
		}
	}, [])

	// useEffect(() => initSocket(), []);
	const router = useRouter();
	NetworkController.router = router;
	return (
		<WsContext.Provider value={[ socket, setSocket ]}>
				{children}
		</WsContext.Provider>
	)
}

export default WsContextProvider;
