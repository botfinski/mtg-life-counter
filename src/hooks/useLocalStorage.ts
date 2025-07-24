import { useState, useEffect } from "react";

export const useLocalStorage = <T>(
	key: string,
	initialValue: T
): [T, (value: T) => void] => {
	const [value, setValue] = useState<T>(() => {
		try {
			const saved = localStorage.getItem(key);
			return saved ? JSON.parse(saved) : initialValue;
		} catch {
			return initialValue;
		}
	});

	useEffect(() => {
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.error("Failed to save to localStorage:", error);
		}
	}, [key, value]);

	return [value, setValue];
};
