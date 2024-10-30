import "./style.css";
import { bgColors, Player } from "../../App";
import { useRef, useState } from "react";
import ColorButton from "./ColorButton";

export const HANDLE_LIFE = {
	ADD: "add",
	REDUCE: "reduce",
};

export type PlayerCounterProps = {
	playersCount: number;
	handleLife: (id: number, type: string) => void;
	handleSettings: (id: number) => void;
	player: Player;
	handleChangeBg: (playerId: number, color: string) => void;
};

const PlayerCounter: React.FC<PlayerCounterProps> = ({
	playersCount,
	handleLife,
	handleSettings,
	player,
	handleChangeBg,
}) => {
	let rotationClassName = "";

	if (playersCount === 2) {
		rotationClassName = player.id === 0 ? "rotate-180" : "";
	} else {
		rotationClassName =
			player.id === 1 || player.id === 3 ? "rotate-270" : "rotate-90";
	}

	const [lifeChange, setLifeChange] = useState(0);
	const [isActive, setIsActive] = useState(false);
	const [, setTimeLeft] = useState(0);
	const timerId = useRef<NodeJS.Timeout | null>(null);
	const abortController = useRef<AbortController | null>(null);

	const wait = (ms: number, signal: AbortSignal) =>
		new Promise(resolve => {
			const timeout = setTimeout(resolve, ms);
			signal.addEventListener("abort", () => {
				clearTimeout(timeout);
			});
		});

	const handleLifeClick = (amount: number) => {
		if (timerId.current) {
			clearInterval(timerId.current);
			abortController.current?.abort();
		}

		abortController.current = new AbortController();
		const { signal } = abortController.current;

		setTimeLeft(1);
		setIsActive(true);
		setLifeChange(prev => prev + amount);
		handleLife(player.id, amount > 0 ? HANDLE_LIFE.ADD : HANDLE_LIFE.REDUCE);

		timerId.current = setInterval(() => {
			setTimeLeft(prev => {
				if (prev === 0) {
					clearInterval(timerId.current!);
					setIsActive(false);
					wait(200, signal).then(() => setLifeChange(0));

					return 0;
				} else {
					return prev - 1;
				}
			});
		}, 1000);
	};

	return (
		<div className={`player ${rotationClassName}`}>
			<div className={`player-inner bg-${player.bgColor}`}>
				<div className="life-container">
					<button
						className="life-button"
						onClick={() => handleLifeClick(-1)}
						type="button"
					>
						-
					</button>

					<div className="life-value-container">
						<span className={`life-value ${player.life <= 0 ? "dead" : ""}`}>
							{player.life}
						</span>
						<span className={`life-temp ${isActive ? "active" : ""}`}>
							{lifeChange > 0 ? `+${lifeChange}` : lifeChange}
						</span>
					</div>

					<button
						className="life-button"
						onClick={() => handleLifeClick(1)}
						type="button"
					>
						+
					</button>
				</div>

				{/* player-counters */}

				<div className="settings-button-container">
					<button
						className="settings-button"
						onClick={() => handleSettings(player.id)}
						type="button"
					></button>
				</div>

				<div className={`settings-drawer ${player.settingsOpened ? "opened" : ""}`}>
					{bgColors.map(color => (
						<ColorButton
							key={color}
							color={color}
							handleChangeBg={handleChangeBg}
							playerId={player.id}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default PlayerCounter;
