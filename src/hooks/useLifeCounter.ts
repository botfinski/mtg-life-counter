import { useState, useRef, useCallback } from "react";

export const useLifeCounter = (
	playerId: number,
	onLifeChange: (id: number, amount: number) => void
) => {
	const [lifeChange, setLifeChange] = useState(0);
	const [isActive, setIsActive] = useState(false);
	const timerId = useRef<NodeJS.Timeout | null>(null);

	const handleLifeClick = useCallback(
		(amount: number) => {
			if (timerId.current) {
				clearTimeout(timerId.current);
			}

			setIsActive(true);
			setLifeChange(prev => prev + amount);
			onLifeChange(playerId, amount);

			timerId.current = setTimeout(() => {
				setIsActive(false);
				setTimeout(() => setLifeChange(0), 200);
			}, 1000);
		},
		[playerId, onLifeChange]
	);

	const cleanup = useCallback(() => {
		if (timerId.current) {
			clearTimeout(timerId.current);
		}
	}, []);

	return { lifeChange, isActive, handleLifeClick, cleanup };
};
