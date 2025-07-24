import React, { useEffect } from "react";
import { Player, PlayerColor, PLAYER_COLORS } from "../../types";
import { useLifeCounter } from "../../hooks/useLifeCounter";
import ColorButton from "./ColorButton";
import "./style.css";

type PlayerCounterProps = {
	playersCount: number;
	player: Player;
	onLifeChange: (id: number, amount: number) => void;
	onSettingsToggle: (id: number) => void;
	onBackgroundChange: (id: number, color: PlayerColor) => void;
	commanderFormat: boolean;
};

const getRotationClass = (playersCount: number, playerId: number): string => {
	if (playersCount === 2) {
		return playerId === 0 ? "rotate-180" : "";
	}
	return playerId === 1 || playerId === 3 ? "rotate-270" : "rotate-90";
};

const PlayerCounter: React.FC<PlayerCounterProps> = React.memo(
	({
		playersCount,
		player,
		onLifeChange,
		onSettingsToggle,
		onBackgroundChange,
		commanderFormat,
	}) => {
		const { lifeChange, isActive, handleLifeClick, cleanup } = useLifeCounter(
			player.id,
			onLifeChange
		);

		const rotationClassName = getRotationClass(playersCount, player.id);

		useEffect(() => {
			return cleanup;
		}, [cleanup]);

		return (
			<div className={`player ${rotationClassName}`}>
				<div className={`player-inner bg-${player.bgColor}`}>
					<div className="life-container">
						<button
							className="life-button"
							onClick={() => handleLifeClick(-1)}
							type="button"
							aria-label="Zmniejsz życie"
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
							aria-label="Zwiększ życie"
						>
							+
						</button>
					</div>

					<div className="settings-button-container">
						<button
							className="settings-button"
							onClick={() => onSettingsToggle(player.id)}
							type="button"
							aria-label="Otwórz ustawienia"
						/>
					</div>

					<div
						className={`settings-drawer ${player.settingsOpened ? "opened" : ""}`}
					>
						{PLAYER_COLORS.map(color => (
							<ColorButton
								key={color}
								color={color}
								onColorChange={onBackgroundChange}
								playerId={player.id}
							/>
						))}
					</div>
				</div>
			</div>
		);
	}
);

PlayerCounter.displayName = "PlayerCounter";

export default PlayerCounter;
