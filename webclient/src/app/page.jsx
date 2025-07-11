'use client';

import { useState, useContext, useEffect } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { WsContext } from '@/context/WsContext'
import { NetworkController } from '@/game/NetworkController';
import Link from 'next/link';


export default function TokenPage() {
	/** @type {[WebSocket]} */
	const [socket, setSocket] = useContext(WsContext)
	const [token, setToken] = useState('');
	const [error, setError] = useState('');
	const [keepLoggedIn, setKeepLoggedIn] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('submit')
		if (!token.trim()) {
			setError('Please enter your token');
			return;
		}

		if (!NetworkController.isTokenValid) {
			let s = NetworkController.initSocket(token.trim(), '/character-planner',
				() => {
					console.log('Successful connected')
					setSocket(s);
				},
				(msg) => {
					setError(msg);
					setSocket(null);
				});
		} else {
			redirect('/character-planner')
		}
		// router.push('/game-windows');
	};


	return (
		<div className="min-h-screen bg-gray-900 flex items-center justify-center">

			<div className="bg-gray-800 border-2 border-gray-700 p-8 w-full max-w-md">
				<h1 className="text-2xl font-bold text-white mb-6 text-center">Enter Game Token</h1>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<input
							type="text"
							value={token}
							onChange={(e) => {
								setToken(e.target.value);
								setError('');
							}}
							placeholder="Enter your token"
							className="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
						/>
						{error && (
							<p className="mt-2 text-red-500 text-sm">{error}</p>
						)}
					</div>
					<div className="flex items-center">
						<input
							type="checkbox"
							id="keepLoggedIn"
							checked={keepLoggedIn}
							onChange={(e) => setKeepLoggedIn(e.target.checked)}
							className="w-4 h-4 bg-gray-700 border-2 border-gray-600 focus:ring-gray-500"
						/>
						<label htmlFor="keepLoggedIn" className="ml-2 text-sm text-gray-300">
							Keep me logged in
						</label>
					</div>
					<button
						type="submit"
						className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 border-2 border-gray-600 transition-colors"
					>
						Start Game
					</button>
					<p className="text-center text-sm text-gray-500 mt-4">
						Write to @direded in Discord if you want to try it out
					</p>
				</form>
			</div>
		</div>
	);
}
