'use client'

import ModalWindow from './ModalWindow'

export default class TaskWindow extends ModalWindow {
	renderContent() {
		const { task } = this.props;
		
		if (!task || task.type === 'null') {
			return (
				<div className="text-center text-gray-400">
					<p>No active task</p>
				</div>
			);
		}

		return (
			<div className="space-y-4">
				<div className="border-b border-gray-600 pb-2">
					<h3 className="text-lg font-semibold text-white">{task.name || 'Unknown Task'}</h3>
					{task.type && (
						<span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded mt-1">
							{task.type}
						</span>
					)}
				</div>
				
				{task.description && (
					<div>
						<h4 className="text-sm font-medium text-gray-300 mb-2">Description</h4>
						<p className="text-gray-400 text-sm">{task.description}</p>
					</div>
				)}
				
				{task.objectives && task.objectives.length > 0 && (
					<div>
						<h4 className="text-sm font-medium text-gray-300 mb-2">Objectives</h4>
						<ul className="space-y-1">
							{task.objectives.map((objective, index) => (
								<li key={index} className="text-gray-400 text-sm flex items-center">
									<span className={`w-2 h-2 rounded-full mr-2 ${
										objective.completed ? 'bg-green-500' : 'bg-gray-500'
									}`}></span>
									{objective.description}
								</li>
							))}
						</ul>
					</div>
				)}
				
				{task.rewards && (
					<div>
						<h4 className="text-sm font-medium text-gray-300 mb-2">Rewards</h4>
						<div className="text-gray-400 text-sm">
							{task.rewards}
						</div>
					</div>
				)}
				
				{task.deadline && (
					<div>
						<h4 className="text-sm font-medium text-gray-300 mb-2">Deadline</h4>
						<div className="text-gray-400 text-sm">
							{task.deadline}
						</div>
					</div>
				)}
			</div>
		);
	}
} 