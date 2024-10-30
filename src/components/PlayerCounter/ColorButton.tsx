import { Black, Blue, Green, Red, White } from "../Icons/Icons";

type ColorButtonProps = {
	color: string;
	handleChangeBg: (playerId: number, color: string) => void;
	playerId: number;
};

const ColorButton: React.FC<ColorButtonProps> = ({
	color,
	handleChangeBg,
	playerId,
}) => {
	return (
		<button
			className="color-button"
			onClick={() => handleChangeBg(playerId, color)}
		>
			{color === "black" && <Black />}
			{color === "white" && <White />}
			{color === "red" && <Red />}
			{color === "blue" && <Blue />}
			{color === "green" && <Green />}
		</button>
	);
};

export default ColorButton;
