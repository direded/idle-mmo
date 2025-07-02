import React from 'react';
import { Tooltip } from 'react-tooltip';

export default function CharacterStatsDisplay({ stats }) {

	const StatRow = ({ stat, id }) => {
		return (
			<div id={id}>
				<p className="inline-block w-1/2">{stat.name}</p>
				<p className="inline-block w-1/2">{stat.value}</p>
			</div>
		)
	}

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 p-2">
      <h2 className="text-sm font-bold text-white mb-1">Character stats</h2>
			{stats.map(stat => (
				<div key={stat.id} className="py-1" id={`character-stat-${stat.id}`}>
					<StatRow stat={stat} />
					<Tooltip anchorSelect={`#character-stat-${stat.id}`} place={'top'} noArrow={true}
							opacity={1}
						>
						This is tooltip that might help you know more about this stat.<br/>For now its just a placeholder.
					</Tooltip>
				</div>
			))}
    </div>
  );
} 