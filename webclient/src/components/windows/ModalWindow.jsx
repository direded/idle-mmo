'use client'

import { useState, useEffect, PureComponent } from 'react'

export default class ModalWindow extends PureComponent {

	constructor(props) {
		super(props)

		this.state = {
			position: null, // null means use centered
			isDragging: false,
			dragOffset: { x: 0, y: 0 }
		}

		this.handleMouseDown = (e) => {
			const rect = e.currentTarget.getBoundingClientRect()
			this.setState({
				isDragging: true,
				dragOffset: {
					x: e.clientX - rect.left,
					y: e.clientY - rect.top
				},
				position: this.state.position || this.getCenteredPosition()
			})
		}
	}

	getCenteredPosition() {
		// Center the modal in the viewport
		const width = 500; // modal width
		const height = 300; // estimated modal height
		const x = Math.max((window.innerWidth - width) / 2, 0);
		const y = Math.max((window.innerHeight - height) / 2, 0);
		return { x, y };
	}

	onClose(t) {
		t.props.gameController.removeWindowModal()
	}

	componentDidMount() {
		const handleMouseUp = () => {
			this.setState({ isDragging: false })
		}

		const handleMouseMove = (e) => {
			if (!this.state.isDragging) return
			const newX = e.clientX - this.state.dragOffset.x
			const newY = e.clientY - this.state.dragOffset.y
			this.setState({
				position: { x: newX, y: newY }
			})
		}

		window.addEventListener('mousemove', handleMouseMove)
		window.addEventListener('mouseup', handleMouseUp)

		// Set initial position to center
		if (!this.state.position) {
			this.setState({ position: this.getCenteredPosition() })
		}

		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
			window.removeEventListener('mouseup', handleMouseUp)
		}
	}

	componentDidUpdate(prevProps) {

		
	}

	renderContent() {}

	render() {
		const {
			title,
			children,
			onClose,
			className = ''
		} = this.props

		const { position } = this.state;

		return (
			<>
				{/* Black backdrop */}
				<div className="fixed inset-0 bg-black/25 z-40"
					onClick={() => this.onClose(this)}
				/>
				<div
					className="fixed z-50"
					style={position ? { left: `${position.x}px`, top: `${position.y}px` } : {}}
				>
					<div className="bg-gray-800 overflow-hidden w-[500px] border border-gray-500 rounded-lg">
						{/* Title Bar */}
						<div
							className="h-5 bg-gray-800 flex items-center pl-4 cursor-move select-none rounded-t-lg"
							onMouseDown={this.handleMouseDown}
						>
							<div className="text-white text-[10px] font-medium">{title}</div>
							<div className="flex-grow" />
							<button
								className="text-gray-400 hover:text-white transition-colors text-xl font-light px-2 hover:bg-gray-700 h-full flex items-center rounded-tr-lg"
								onClick={() => this.onClose(this)}
							>
								×
							</button>
						</div>
						{children || this.renderContent()}
					</div>
				</div>
			</>
		)
	}

}

