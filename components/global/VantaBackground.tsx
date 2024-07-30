'use client';

import { useEffect, useRef } from 'react';


declare global {
	interface Window {
		VANTA: any;
	}
}


export default function VantaBackground() {
	const vantaRef = useRef<HTMLDivElement>(null);
	const vantaEffect = useRef<any>(null);

	useEffect(() => {
		const loadVanta = () => {
			if (window.VANTA) {
				vantaEffect.current = window.VANTA.CELLS({
					el: vantaRef.current,
					mouseControls: true,
					touchControls: true,
					gyroControls: false,
					minHeight: 200.0,
					minWidth: 200.0,
					scale: 1.0,
					// scaleMobile: 1.0,
					// birdSize: 1.7,
					// quantity: 4.0,
					// backgroundColor: 0x000000,
					// color1: 0xff00ff,
					// color2: 0xff69b4,
				});
			}
		};

		if (window.VANTA) {
			loadVanta();
		}

		return () => {
			if (vantaEffect.current) vantaEffect.current.destroy();
		};
	}, []);

	return <div ref={vantaRef} className="absolute inset-0"></div>;
}
