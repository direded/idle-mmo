'use client'

import { useState, useEffect } from 'react';

export default function TaskDisplay({ gameController }) {
	const [state, setState] = useState(gameController.state);
	
	// Subscribe to state changes
	useEffect(() => {
		const unsubscribe = gameController.subscribe((newState) => {
			setState(newState);
		});
		return unsubscribe;
	}, [gameController]);

	const handleTaskClick = () => {
		if (state.task && state.task.type !== 'null') {
			gameController.setWindowModal({
				type: 'task',
				task: state.task
			});
		}
	};

	// Don't render if no task or task type is null
	if (!state.task || state.task.type === 'null') {
		return null;
	}

	return (
		<div className="border-t border-gray-700 text-center min-h-30 hover:bg-gray-700 transition-colors cursor-pointer"
			onClick={handleTaskClick}
		>
			<div 
				className="p-2"
				
			>
				<p className="text-sm text-gray-300">{state.task.type}</p>
			</div>
		</div>
	);
} 