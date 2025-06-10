'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Window({
	title,
	children,
	className = '',
	isCollapsible = true,
	headerIcon, // To add icons to the header
	specialBorder = false // For the yellow/black border
}) {
	const [isCollapsed, setIsCollapsed] = useState(false);

	const headerClasses = `h-8 bg-green-600 flex items-center px-2 py-1 cursor-pointer select-none border-b-2 border-gray-900`; // Green header
	const bodyClasses = `bg-gray-100 text-gray-800 p-2 overflow-auto`; // Light gray body, overflow for scrollbars

	return (
		<div className={`relative rounded-sm shadow-md overflow-hidden ${className} ${specialBorder ? 'border-4 border-dashed border-yellow-500' : 'border-2 border-gray-900'}`}>
			<div
				className={headerClasses}
				onClick={() => isCollapsible && setIsCollapsed(!isCollapsed)}
			>
				<div className="flex items-center gap-1">
					{headerIcon && <Image src={headerIcon} alt="icon" width={16} height={16} className="w-4 h-4" />}
					<span className="text-white text-sm font-semibold">{title}</span>
					{isCollapsible && (
						<span className="text-gray-900 ml-auto mr-1 text-xs">
							{isCollapsed ? '▼' : '▲'}
						</span>
					)}
				</div>
			</div>
			<div
				className={`transition-[height] duration-200 ease-in-out overflow-hidden`}
				style={{ height: isCollapsed ? '0px' : 'auto' }}
			>
				<div className={bodyClasses}>
					{children}
				</div>
			</div>
		</div>
	);
} 