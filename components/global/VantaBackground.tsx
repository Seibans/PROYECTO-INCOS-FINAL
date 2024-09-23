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
				vantaEffect.current = window.VANTA.BIRDS({
					el: vantaRef.current,
					mouseControls: true,
					touchControls: true,
					gyroControls: false,
					minHeight: 200.00,
					minWidth: 200.00,
					scale: 1.00,
					scaleMobile: 1.00,
					color1: 0xfca828,
					color2: 0x53ffd9,
					birdSize: 1.50,
					wingSpan: 21.00,
					speedLimit: 3.00,
					separation: 91.00,
					alignment: 1.00,
					cohesion: 74.00,
					quantity: 4.00,
					backgroundAlpha: 0.00
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
