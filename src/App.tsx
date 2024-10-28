import { useEffect, useState } from "react";
import Menu from "./components/Menu/Menu";
import PlayerCounter, {
	HANDLE_LIFE,
} from "./components/PlayerCounter/PlayerCounter";

export type Player = {
	id: number;
	life: number;
	poisonCounters: number;
	settingsOpened: boolean;
};

const initialPlayerState = (numPlayers: number): Player[] =>
	Array(numPlayers)
		.fill(null)
		.map((_, i) => ({
			id: i,
			life: 20,
			poisonCounters: 0,
			settingsOpened: false,
		}));

const App = () => {
	const [players, setPlayers] = useState(initialPlayerState(2));
	const [isMenuOpened, setMenuOpened] = useState(false);

	const toggleMenu = () => {
		setMenuOpened(isMenuOpened => !isMenuOpened);
	};

	const handleLife = (id: number, type: string) => {
		switch (type) {
			case HANDLE_LIFE.ADD:
				setPlayers(
					[...players].map(player => {
						return player.id === id ? { ...player, life: player.life + 1 } : player;
					})
				);
				break;

			case HANDLE_LIFE.REDUCE:
				setPlayers(
					[...players].map(player => {
						return player.id === id ? { ...player, life: player.life - 1 } : player;
					})
				);
				break;

			default:
				console.log(`Type ${type} is not supported.`);
				break;
		}
	};

	const handlePlayersCount = (nrOfPlayers: number) => {
		setPlayers(initialPlayerState(nrOfPlayers));
		toggleMenu();
	};

	const resetLife = () => {
		setPlayers(
			[...players].map(player => ({
				...player,
				life: 20,
			}))
		);

		setTimeout(() => {
			toggleMenu();
		}, 250);
	};

	// useEffect(() => {
	// 	localStorage.setItem("players", JSON.stringify(players));
	// }, [players]);

	useEffect(() => {
		const setSizes = () => {
			document.documentElement.style.setProperty(
				"--vh",
				`${window.innerHeight}px`
			);

			const appContainer = document.querySelector<HTMLElement>(".app-container");
			const { width, height } = appContainer!.getBoundingClientRect();

			if (players.length > 2) {
				const vw = width / 2 - 5;
				const vh = height / Math.ceil(players.length / 2) - 5;

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
	}, [players]);

	return (
		<div className={`app-container ${players.length}-players`}>
			{players.map((player: Player, i: number) => (
				<PlayerCounter
					key={`${players.length}-${i} - 1`}
					playersCount={players.length}
					handleLife={handleLife}
					player={player}
				/>
			))}

			<Menu
				toggleMenu={toggleMenu}
				handlePlayersCount={handlePlayersCount}
				isMenuOpened={isMenuOpened}
				resetLife={resetLife}
			/>
		</div>
	);
};

export default App;
