import { MtgIcon } from "../Icons/Icons";
import "./style.css";

type MenuProps = {
	toggleMenu: () => void;
	isMenuOpened: boolean;
	handlePlayersCount: (i: number) => void;
	resetLife: () => void;
	playersCount: number;
};

const Menu: React.FC<MenuProps> = ({
	toggleMenu,
	isMenuOpened,
	handlePlayersCount,
	resetLife,
	playersCount,
}) => {
	return (
		<>
			<button className="menu-button" onClick={toggleMenu} type="button">
				<MtgIcon />
			</button>
			{isMenuOpened && (
				<div className="backdrop">
					<div className="backdrop-inner">
						<div className="players-count">
							Players
							<div className="players-count-container">
								{[...Array(3)].map((_, i) => (
									<button
										key={i}
										value={i + 2}
										className="players-count-button"
										onClick={() => handlePlayersCount(i + 2)}
										disabled={Boolean(i + 2 === playersCount)}
									>
										{i + 2}
									</button>
								))}
							</div>
						</div>

						<div>
							<button
								type="button"
								onClick={() => resetLife()}
								className="reset-life-button"
							>
								Reset
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Menu;
