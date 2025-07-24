import React from "react";
import { MtgIcon } from "../Icons/Icons";
import "./style.css";

type MenuProps = {
	playersCount: number;
	onToggleMenu: () => void;
	onPlayersCountChange: (count: number) => void;
	startingLife: number;
	onStartingLifeChange: (life: number) => void;
	isMenuOpened: boolean;
	onResetLife: () => void;
	commanderFormat: boolean;
	onCommanderFormatToggle: () => void;
};

const PLAYER_COUNT_OPTIONS = [2, 3, 4];
const STARTING_LIFE_OPTIONS = [20, 30, 40];

const Menu: React.FC<MenuProps> = React.memo(
	({
		playersCount,
		onToggleMenu,
		onPlayersCountChange,
		startingLife,
		onStartingLifeChange,
		isMenuOpened,
		onResetLife,
		// commanderFormat,
		// onCommanderFormatToggle,
	}) => {
		return (
			<>
				<button
					className="menu-button"
					onClick={onToggleMenu}
					type="button"
					aria-label="Otwórz menu"
				>
					<MtgIcon />
				</button>

				{isMenuOpened && (
					<div className="backdrop">
						<div className="backdrop-inner">
							<div className="menu-container players-count">
								Players
								<div className="count-container">
									{PLAYER_COUNT_OPTIONS.map(count => (
										<button
											key={count}
											className="count-button"
											onClick={() => onPlayersCountChange(count)}
											disabled={count === playersCount}
										>
											{count}
										</button>
									))}
								</div>
							</div>

							<div className="menu-container starting-life">
								Starting Life
								<div className="count-container">
									{STARTING_LIFE_OPTIONS.map(life => (
										<button
											key={life}
											className="count-button"
											onClick={() => onStartingLifeChange(life)}
											disabled={life === startingLife}
										>
											{life}
										</button>
									))}
								</div>
							</div>

							{/* <div className="commander">
								Commander?{" "}
								<input
									className="commander-checkbox"
									type="checkbox"
									checked={commanderFormat}
									onChange={onCommanderFormatToggle}
								/>
							</div> */}

							<button
								type="button"
								onClick={onResetLife}
								className="reset-life-button"
							>
								Reset
							</button>
						</div>
					</div>
				)}
			</>
		);
	}
);

Menu.displayName = "Menu";

export default Menu;
