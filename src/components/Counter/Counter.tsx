import React from "react";
import { CLICK_TYPE } from "../../App";
import {
	Black,
	Blue,
	ColorToggle as ColorToggleIcon,
	Green,
	Red,
	White,
} from "../Icons/Icons";
import {
	CounterWrapper,
	CounterButton,
	HP,
	ColorToggleButton,
	ColorPanel,
	ColorButton,
} from "./styles";

export const Colors = ["white", "black", "green", "blue", "red"];
export interface CounterStyleProps {
	isDrawerOpened: boolean;
	bgColor: string;
}

export type ColorPanelProps = {
	isColorPanelOpened: boolean;
};

export type CounterProps = {
	id: number;
	hp: number;
	bgColor: string;
	handleHPCounter: (id: number, type: string) => void;
	isDrawerOpened: boolean;
	isColorPanelOpened: boolean;
	handleColorChange: (id: number, color: string) => void;
	toggleColorPanel: (id: number) => void;
};

const Counter: React.FC<CounterProps> = ({
	hp,
	id,
	bgColor,
	handleHPCounter,
	isDrawerOpened,
	isColorPanelOpened,
	toggleColorPanel,
	handleColorChange,
}) => {
	return (
		<CounterWrapper isDrawerOpened={isDrawerOpened} bgColor={bgColor}>
			<CounterButton
				onClick={() => handleHPCounter(id, CLICK_TYPE.REDUCE)}
				type="button"
			>
				-
			</CounterButton>
			<HP value={hp}>{hp}</HP>
			<CounterButton
				onClick={() => handleHPCounter(id, CLICK_TYPE.ADD)}
				type="button"
			>
				+
			</CounterButton>
			<ColorToggleButton
				type="button"
				isColorPanelOpened={isColorPanelOpened}
				onClick={() => toggleColorPanel(id)}
			>
				<ColorToggleIcon />
			</ColorToggleButton>
			<ColorPanel isColorPanelOpened={isColorPanelOpened}>
				{Colors.map(color => (
					<ColorButton
						type="button"
						value={color}
						key={color}
						onClick={() => handleColorChange(id, color)}
					>
						{color === "black" && <Black />}
						{color === "white" && <White />}
						{color === "red" && <Red />}
						{color === "blue" && <Blue />}
						{color === "green" && <Green />}
					</ColorButton>
				))}
			</ColorPanel>
		</CounterWrapper>
	);
};

export default Counter;
