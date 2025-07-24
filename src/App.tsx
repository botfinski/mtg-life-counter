import React, { useEffect } from "react";
import { Player, DEFAULT_STARTING_LIFE, PLAYER_COLORS } from "./types";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useAppState } from "./hooks/useAppState";
import PlayerCounter from "./components/PlayerCounter/PlayerCounter";
import Menu from "./components/Menu/Menu";

const createInitialPlayers = (count: number, startingLife: number): Player[] =>
	Array.from({ length: count }, (_, i) => ({
		id: i,
		life: startingLife,
		poisonCounters: 0,
		settingsOpened: false,
		bgColor: PLAYER_COLORS[Math.floor(Math.random() * 5)],
	}));

const App: React.FC = () => {
	const [savedPlayers] = useLocalStorage<Player[]>(
		"players",
		createInitialPlayers(2, DEFAULT_STARTING_LIFE)
	);

	const appState = useAppState(savedPlayers);

	useEffect(() => {
		localStorage.setItem("players", JSON.stringify(appState.players));
	}, [appState.players]);

	useEffect(() => {
		const setSizes = () => {
			const appContainer = document.querySelector<HTMLElement>(".app-container");
			if (!appContainer) return;

			const { width, height } = appContainer.getBoundingClientRect();

			if (appState.players.length > 2) {
				const vw = width / 2 - 5;
				const vh = height / Math.ceil(appState.players.length / 2) - 5;

				document.querySelectorAll<HTMLElement>(".player-inner").forEach(element => {
					element.style.setProperty("--player-inner-width", `${vh}px`);
					element.style.setProperty("--player-inner-height", `${vw}px`);
				});
			} else {
				document.querySelectorAll<HTMLElement>(".player-inner").forEach(element => {
					element.style.setProperty("--player-inner-width", "100%");
					element.style.setProperty("--player-inner-height", "100%");
				});
			}
		};

		setSizes();

		const handleTouchMove = (event: TouchEvent) => event.preventDefault();
		document.addEventListener("touchmove", handleTouchMove, { passive: false });
		window.addEventListener("resize", setSizes);

		return () => {
			document.removeEventListener("touchmove", handleTouchMove);
			window.removeEventListener("resize", setSizes);
		};
	}, [appState.players.length]);

	return (
		<div className={`app-container ${appState.players.length}-players`}>
			{appState.players.map((player, i) => (
				<PlayerCounter
					key={`${appState.players.length}-${i}`}
					playersCount={appState.players.length}
					player={player}
					onLifeChange={appState.updateLife}
					onSettingsToggle={appState.toggleSettings}
					onBackgroundChange={appState.changeBackground}
					commanderFormat={appState.commanderFormat}
				/>
			))}

			<Menu
				playersCount={appState.players.length}
				onToggleMenu={appState.toggleMenu}
				onPlayersCountChange={appState.setPlayersCount}
				startingLife={appState.startingLife}
				onStartingLifeChange={appState.setStartingLife}
				isMenuOpened={appState.isMenuOpened}
				onResetLife={appState.resetLife}
				commanderFormat={appState.commanderFormat}
				onCommanderFormatToggle={appState.toggleCommanderFormat}
			/>
		</div>
	);
};

export default App;
