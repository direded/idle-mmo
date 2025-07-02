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
			<div className="p-3 pt-0">
				<div className="border-gray-600 pb-2">
					<h3 className="text-lg font-semibold text-white">{task.type}</h3>
				</div>
			</div>
		);
	}
} 