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

		console.log('modal window', this.props)

		// useEffect(() => {
			
		// }, [this.state.isDragging, this.state.dragOffset])

		return (
			<>
				{/* Black backdrop */}
				<div className="fixed inset-0 bg-black/25 z-40" />
				
				<div
					className="fixed z-50"
					style={{
						left: `${this.state.position.x}px`,
						top: `${this.state.position.y}px`
					}}
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

						{/* Content */}
						<div className="p-4">
							{children || this.renderContent()}
						</div>
					</div>
				</div>
			</>
		)
	}

}
