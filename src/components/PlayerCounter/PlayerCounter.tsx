import { useState } from "react";
import "./style.css";
import { Player } from "../../App";

export const HANDLE_LIFE = {
	ADD: "add",
	REDUCE: "reduce",
};

export type PlayerCounterProps = {
	playersCount: number;
	handleLife: (id: number, type: string) => void;
	player: Player;
};

const PlayerCounter: React.FC<PlayerCounterProps> = ({
	playersCount,
	handleLife,
	player,
}) => {
	let rotationClassName = "";

	if (playersCount === 2) {
		if (player.id === 0) {
			rotationClassName = "rotate-180";
		}
	} else {
		if (player.id === 1 || player.id === 3) {
			rotationClassName = "rotate-270";
		} else {
			rotationClassName = "rotate-90";
		}
	}

	const [isSettingsOpened, setSettingsOpened] = useState(false);

	const toggleSettings = () => {
		setSettingsOpened(isSettingsOpened => !isSettingsOpened);
	};

	return (
		<div className={`player ${rotationClassName}`}>
			<div className="player-inner">
				<div className="life-container">
					<button
						className="life-button"
						onClick={() => handleLife(player.id, HANDLE_LIFE.REDUCE)}
						type="button"
					>
						-
					</button>

					<span className="life-value">{player.life}</span>

					<button
						className="life-button"
						onClick={() => handleLife(player.id, HANDLE_LIFE.ADD)}
						type="button"
					>
						+
					</button>
				</div>

				{/* player-counters */}

				<div className="settings-button-container">
					<button
						className="settings-button"
						onClick={toggleSettings}
						type="button"
					></button>
				</div>

				<div className={`settings-drawer ${isSettingsOpened ? "opened" : ""}`}>
					Player
					<br />
					Settings drawer
				</div>
			</div>
		</div>
	);
};

export default PlayerCounter;
