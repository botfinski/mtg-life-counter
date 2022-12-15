import styled, { css } from "styled-components";
import { CounterStyleProps, ColorPanelProps } from "./Counter";

const handleColorType = (bgColor: string) => {
	switch (bgColor) {
		case "red":
			return "linear-gradient(229deg, #9c0101, #660200, #2c0403);";
		case "black":
			return "linear-gradient(229deg,#393737,#343232,#080707);";
		case "blue":
			return "linear-gradient(229deg,#013a9c,#002566,#030b2c);";
		case "green":
			return "linear-gradient(229deg,#167c01,#014d01,#010904);";
		case "white":
			return "linear-gradient(229deg,#f6d5af,#b59e5e,#97732a);";
		default:
			return "#000";
	}
};

export const CounterWrapper = styled.div<CounterStyleProps>`
	position: relative;
	height: calc(50vh - 2px);
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: ${({ bgColor }) => handleColorType(bgColor)};
	transition: all 0.2s ease-in-out;
	border-top: 2px solid black;

	&:nth-of-type(1) {
		order: 1;
		transform: rotate(180deg);
	}

	&:nth-of-type(2) {
		order: 3;
	}

	${props =>
		props.isDrawerOpened &&
		css`
			height: calc(50vh - 50px - 2px);
		`};
`;

export const CounterButton = styled.button`
	width: 80px;
	height: 100%;
	border: 0;
	color: #fff;
	font-size: 3rem;
	background: rgba(0, 0, 0, 0.1);
`;

export type HPProps = {
	value: number;
};

export const HP = styled.span<HPProps>`
	font-size: 8.5rem;
	text-shadow: black 4px 4px;

	${({ value }) =>
		value <= 0 &&
		css`
			color: red;
		`};
`;

export const ColorToggleButton = styled.button<ColorPanelProps>`
	width: 70px;
	height: 70px;
	position: absolute;
	top: 0;
	right: 0;
	border: 0;
	background: transparent;
	z-index: 9;

	& > svg {
		width: 85%;
	}
`;

export const ColorPanel = styled.div<ColorPanelProps>`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: none;
	background: rgba(0, 0, 0, 0.8);

	${props =>
		props.isColorPanelOpened &&
		css`
			display: flex;
			justify-content: space-evenly;
			align-items: center;
		`};
`;
export const ColorButton = styled.button`
	border: 0;
	height: 85px;
	width: 85px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	background: transparent;
`;
