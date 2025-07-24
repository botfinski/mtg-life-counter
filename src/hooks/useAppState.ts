import { useReducer, useCallback } from "react";
import {
	Player,
	PlayerColor,
	DEFAULT_STARTING_LIFE,
	PLAYER_COLORS,
} from "../types";

type AppState = {
	players: Player[];
	isMenuOpened: boolean;
	startingLife: number;
	commanderFormat: boolean;
};

type AppAction =
	| { type: "UPDATE_LIFE"; id: number; amount: number }
	| { type: "TOGGLE_SETTINGS"; id: number }
	| { type: "CHANGE_BACKGROUND"; id: number; color: PlayerColor }
	| { type: "SET_PLAYERS_COUNT"; count: number; startingLife: number }
	| { type: "RESET_LIFE"; startingLife: number }
	| { type: "TOGGLE_MENU" }
	| { type: "SET_STARTING_LIFE"; life: number }
	| { type: "TOGGLE_COMMANDER_FORMAT" }
	| { type: "SET_PLAYERS"; players: Player[] };

const getRandomColor = (): PlayerColor =>
	PLAYER_COLORS[Math.floor(Math.random() * PLAYER_COLORS.length)];

const createInitialPlayers = (count: number, startingLife: number): Player[] =>
	Array.from({ length: count }, (_, i) => ({
		id: i,
		life: startingLife,
		poisonCounters: 0,
		settingsOpened: false,
		bgColor: getRandomColor(),
	}));

const appReducer = (state: AppState, action: AppAction): AppState => {
	switch (action.type) {
		case "UPDATE_LIFE":
			return {
				...state,
				players: state.players.map(player =>
					player.id === action.id
						? { ...player, life: player.life + action.amount }
						: player
				),
			};

		case "TOGGLE_SETTINGS":
			return {
				...state,
				players: state.players.map(player =>
					player.id === action.id
						? { ...player, settingsOpened: !player.settingsOpened }
						: player
				),
			};

		case "CHANGE_BACKGROUND":
			return {
				...state,
				players: state.players.map(player =>
					player.id === action.id
						? { ...player, bgColor: action.color, settingsOpened: false }
						: player
				),
			};

		case "SET_PLAYERS_COUNT":
			return {
				...state,
				players: createInitialPlayers(action.count, action.startingLife),
				isMenuOpened: false,
			};

		case "RESET_LIFE":
			return {
				...state,
				players: state.players.map(player => ({
					...player,
					life: action.startingLife,
					settingsOpened: false,
				})),
				isMenuOpened: false,
			};

		case "TOGGLE_MENU":
			return {
				...state,
				isMenuOpened: !state.isMenuOpened,
			};

		case "SET_STARTING_LIFE":
			return {
				...state,
				startingLife: action.life,
				isMenuOpened: false,
				players: state.players.map(player => ({
					...player,
					life: action.life,
				})),
			};

		case "TOGGLE_COMMANDER_FORMAT":
			return {
				...state,
				commanderFormat: !state.commanderFormat,
			};

		case "SET_PLAYERS":
			return {
				...state,
				players: action.players,
			};

		default:
			return state;
	}
};

export const useAppState = (initialPlayers: Player[]) => {
	const [state, dispatch] = useReducer(appReducer, {
		players: initialPlayers,
		isMenuOpened: false,
		startingLife: DEFAULT_STARTING_LIFE,
		commanderFormat: false,
	});

	const updateLife = useCallback((id: number, amount: number) => {
		dispatch({ type: "UPDATE_LIFE", id, amount });
	}, []);

	const toggleSettings = useCallback((id: number) => {
		dispatch({ type: "TOGGLE_SETTINGS", id });
	}, []);

	const changeBackground = useCallback((id: number, color: PlayerColor) => {
		dispatch({ type: "CHANGE_BACKGROUND", id, color });
	}, []);

	const setPlayersCount = useCallback(
		(count: number) => {
			dispatch({
				type: "SET_PLAYERS_COUNT",
				count,
				startingLife: state.startingLife,
			});
		},
		[state.startingLife]
	);

	const resetLife = useCallback(() => {
		dispatch({ type: "RESET_LIFE", startingLife: state.startingLife });
	}, [state.startingLife]);

	const toggleMenu = useCallback(() => {
		dispatch({ type: "TOGGLE_MENU" });
	}, []);

	const setStartingLife = useCallback((life: number) => {
		dispatch({ type: "SET_STARTING_LIFE", life });
	}, []);

	const toggleCommanderFormat = useCallback(() => {
		dispatch({ type: "TOGGLE_COMMANDER_FORMAT" });
	}, []);

	const setPlayers = useCallback((players: Player[]) => {
		dispatch({ type: "SET_PLAYERS", players });
	}, []);

	return {
		...state,
		updateLife,
		toggleSettings,
		changeBackground,
		setPlayersCount,
		resetLife,
		toggleMenu,
		setStartingLife,
		toggleCommanderFormat,
		setPlayers,
	};
};
