'use client';

import { useState } from 'react';

export default function Tile({ 
	title, 
	children, 
	className = '',
	isCollapsible = true
}) {
	const [isCollapsed, setIsCollapsed] = useState(false);

	return (
		<div className={`bg-gray-800 rounded shadow-lg overflow-hidden border border-gray-700 ${className}`}>
			<div 
				className="h-8 bg-gray-700 flex items-center px-4 cursor-pointer select-none"
				onClick={() => isCollapsible && setIsCollapsed(!isCollapsed)}
			>
				<div className="text-white text-sm font-medium flex items-center gap-2">
					{isCollapsible && (
						<span className="text-gray-400">
							{isCollapsed ? '▼' : '▲'}
						</span>
					)}
					{title}
				</div>
			</div>
			<div 
				className={`transition-[height] duration-200 ease-in-out overflow-hidden`}
				style={{ height: isCollapsed ? '0px' : 'auto' }}
			>
				<div className="p-4">
					{children}
				</div>
			</div>
		</div>
	);
}