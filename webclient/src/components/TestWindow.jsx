'use client';

import { useState, useEffect } from 'react';
import ModalWindow from './ModalWindow';

export default class TestWindow extends ModalWindow {
	renderContent() {
		return <div>
			Test
		</div>
	}
}