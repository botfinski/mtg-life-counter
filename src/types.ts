export const PLAYER_COLORS = [
	"white",
	"red",
	"green",
	"black",
	"blue",
] as const;
export type PlayerColor = (typeof PLAYER_COLORS)[number];

export type Player = {
	id: number;
	life: number;
	poisonCounters: number;
	settingsOpened: boolean;
	bgColor: PlayerColor;
};

export const LIFE_ACTIONS = {
	ADD: 1,
	SUBTRACT: -1,
} as const;

export const DEFAULT_STARTING_LIFE = 20;
