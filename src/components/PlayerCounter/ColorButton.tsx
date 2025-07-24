import React from "react";
import { PlayerColor } from "../../types";
import { Black, Blue, Green, Red, White } from "../Icons/Icons";

type ColorButtonProps = {
	color: PlayerColor;
	onColorChange: (playerId: number, color: PlayerColor) => void;
	playerId: number;
};

const ColorButton: React.FC<ColorButtonProps> = React.memo(
	({ color, onColorChange, playerId }) => {
		const handleClick = () => onColorChange(playerId, color);

		const renderIcon = () => {
			switch (color) {
				case "black":
					return <Black />;
				case "white":
					return <White />;
				case "red":
					return <Red />;
				case "blue":
					return <Blue />;
				case "green":
					return <Green />;
				default:
					return null;
			}
		};

		return (
			<button
				className="color-button"
				onClick={handleClick}
				type="button"
				aria-label={`Zmień kolor na ${color}`}
			>
				{renderIcon()}
			</button>
		);
	}
);

ColorButton.displayName = "ColorButton";

export default ColorButton;
