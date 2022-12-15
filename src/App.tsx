import { useEffect, useState } from "react";
import Counter from "./components/Counter/Counter";
import Drawer from "./components/Drawer/Drawer";
import ToggleButton from "./components/ToggleButton/ToggleButton";
import styled from "styled-components";

const AppWrapper = styled.div`
	text-align: center;
	background-color: #282c34;
	color: #fff;
	min-height: 100vh;
	display: flex;
	flex-flow: column nowrap;
	align-items: stretch;
	background-color: #282c34;
`;

export type Player = {
	id: number;
	hp: number;
	colorPanelOpened: boolean;
	bgColor: string;
};

export const Players = [
	{
		id: 1,
		hp: 20,
		colorPanelOpened: false,
		bgColor: "black",
	},
	{
		id: 2,
		hp: 20,
		colorPanelOpened: false,
		bgColor: "red",
	},
];

export const CLICK_TYPE = {
	ADD: "add",
	REDUCE: "reduce",
};

export default function App() {
	const [players, setPlayers] = useState(
		() => JSON.parse(localStorage.getItem("players")!) || Players
	);
	const [drawerOpened, setDrawerOpened] = useState(false);

	const resetHP = () => {
		setPlayers(
			[...players].map(player => {
				return {
					...player,
					hp: 20,
				};
			})
		);
		setTimeout(() => {
			setDrawerOpened(false);
		}, 500);
	};

	const toggleDrawer = () => {
		setDrawerOpened(drawerOpened => !drawerOpened);
		setPlayers(
			[...players].map(player => ({ ...player, colorPanelOpened: false }))
		);
	};

	const handleHPCounter = (id: number, type: string) => {
		switch (type) {
			case CLICK_TYPE.ADD:
				setPlayers(
					[...players].map(player => {
						return player.id === id ? { ...player, hp: player.hp + 1 } : player;
					})
				);
				break;
			case CLICK_TYPE.REDUCE:
				setPlayers(
					[...players].map(player => {
						return player.id === id ? { ...player, hp: player.hp - 1 } : player;
					})
				);
				break;
			default:
				console.log(`Type ${type} is not supported.`);
		}
	};

	const toggleColorPanel = (id: number) => {
		setPlayers(
			[...players].map(player => {
				return player.id === id
					? { ...player, colorPanelOpened: !player.colorPanelOpened }
					: player;
			})
		);
		setDrawerOpened(false);
	};

	const handleColorChange = (id: number, color: string) => {
		setPlayers(
			[...players].map(player => {
				return player.id === id
					? { ...player, bgColor: color, colorPanelOpened: false }
					: player;
			})
		);
	};

	useEffect(() => {
		localStorage.setItem("players", JSON.stringify(players));
	}, [players]);

	return (
		<AppWrapper>
			{players.map((player: Player) => (
				<Counter
					hp={player.hp}
					id={player.id}
					key={player.id}
					bgColor={player.bgColor}
					handleHPCounter={handleHPCounter}
					isDrawerOpened={drawerOpened}
					isColorPanelOpened={player.colorPanelOpened}
					toggleColorPanel={toggleColorPanel}
					handleColorChange={handleColorChange}
				/>
			))}
			<Drawer isOpened={drawerOpened} resetHP={resetHP} />
			<ToggleButton toggleDrawer={toggleDrawer} drawerOpened={drawerOpened} />
		</AppWrapper>
	);
}
