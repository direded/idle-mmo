'use client'

import { useState, useEffect, Component } from 'react'

export default class ModalWindow extends Component {

	constructor(props) {
		super(props)

		this.state = {
			position: { x: 100, y: 100 },
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
				}
			})
		}
	}

	onClose(t) {
		console.log('onClose', t.props.gameViewModel.state.windowModals)
		t.props.gameViewModel.removeWindowModal()
		console.log('onClose', t.props.gameViewModel.state.windowModals)
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
			title = 'Modal Window',
			children,
			onClose,
			className = ''
		} = this.props

		// useEffect(() => {
			
		// }, [this.state.isDragging, this.state.dragOffset])

		return (
			<div
				className="fixed z-50"
				style={{
					left: `${this.state.position.x}px`,
					top: `${this.state.position.y}px`
				}}
			>
				<div className="bg-gray-800 overflow-hidden w-[500px] shadow-[0_0_8px_rgba(0,0,0,0.4)]">
					{/* Title Bar */}
					<div
						className="h-7 bg-gray-700 flex items-center pl-4 cursor-move select-none"
						onMouseDown={this.handleMouseDown}
					>
						<div className="text-white text-sm font-medium">{title}</div>
						<div className="flex-grow" />
						<button
							className="text-gray-400 hover:text-white transition-colors text-2xl font-light px-2 hover:bg-gray-600 h-full flex items-center"
							onClick={() => this.onClose(this)}
						>
							×
						</button>
					</div>

					{/* Content */}
					<div className="p-4">
						{children || this.renderContent()}
					</div>
				</div>
			</div>
		)
	}

}
