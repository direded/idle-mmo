import React from 'react';

export default function CharacterStatsDisplay({ stats }) {

	const StatRow = ({ stat }) => {
		return (
			<div>
				<p className="inline-block w-1/2">{stat.name}</p>
				<p className="inline-block w-1/2">{stat.value}</p>
			</div>
		)
	}

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 p-2">
      <h2 className="text-sm font-bold text-white mb-1">Character stats</h2>
			{stats.map(stat => (
				<StatRow key={stat.id} stat={stat} />
			))}
    </div>
  );
} 