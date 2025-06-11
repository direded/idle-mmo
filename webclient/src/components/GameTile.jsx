import React from 'react';

const color = {
  corner: 'eee',
	bg: 'color3',
}

const GameTile = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-basecolor shadow-lg border-1 border-t-basecolorlight border-l-basecolorlight border-basecolordark ${className}`}>
			<div className="p-2 h-full border-corner flex flex-col">
				{title && (
					<div className={`pb-1 px-2 bg-corner`}>
						<h2 className="text-lg font-semibold text-white">{title}</h2>
					</div>
				)}
				<div className="flex-grow min-h-0">
					{/* bg-container border-1 border-b-basecolorlight border-r-basecolorlight border-basecolordark */}
					{children}
				</div>
			</div>
    </div>
  );
};

export default GameTile; 