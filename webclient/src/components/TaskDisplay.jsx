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
		<div className="p-2 border-t border-gray-700">
			<div 
				className="p-2 cursor-pointer hover:bg-gray-700 transition-colors"
				onClick={handleTaskClick}
			>
				<h4 className="text-sm font-bold text-white">Current Task</h4>
				<p className="text-xs text-gray-300">{state.task.name || 'Unknown Task'}</p>
				{state.task.type && (
					<div className="text-xs text-gray-400 mt-1">Type: {state.task.type}</div>
				)}
			</div>
		</div>
	);
} 