'use client';

import { NetworkController } from '@/game/NetworkController'
import { createContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { redirect } from  'next/navigation';

export const WsContext = createContext(undefined)

const WsContextProvider = ({ children }) => {

	/** @type {[WebSocket]} */
	const [socket, setSocket] = useState(() => null);
	const pathname = usePathname();
	useEffect(() => {
			let localToken = localStorage.getItem('sessionToken');
		if (localToken != null) {
			let s = NetworkController.initSocket(
				localToken,
				pathname != '/' ? null : '/character-planner',
				() => {},
				() => { redirect('/') })
			setSocket(s)
		} else {
			if (pathname != '/') {
				redirect('/')
			}
		}
	}, [])

	// useEffect(() => initSocket(), []);
	return (
		<WsContext.Provider value={[ socket, setSocket ]}>
				{children}
		</WsContext.Provider>
	)
}

export default WsContextProvider;
