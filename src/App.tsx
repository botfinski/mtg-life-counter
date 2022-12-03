import { useState } from "react"
import Counter from "./components/Counter/Counter"
import Drawer, { DrawerProps } from "./components/Drawer/Drawer"
import styled, { css } from "styled-components"

const AppWrapper = styled.div`
  text-align: center;
  background-color: #282c34;
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  background-color: #282c34;
`

const ToggleButton = styled.button<DrawerProps>`
  position: absolute;
  top: calc(50vh - 30px);
  left: calc(50% - 30px);
  width: 60px;
  height: 60px;
  background-color: yellow;
  border: 0;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;

  ${props =>
    props.isOpened &&
    css`
      top: calc(50vh - 80px);
    `};
`

export const Players = [
  {
    id: 1,
    hp: 20,
  },
  {
    id: 2,
    hp: 13,
  },
]

export const CLICK_TYPE = {
  ADD: "add",
  REDUCE: "reduce",
}

export default function App() {
  const [players, setPlayers] = useState(Players)
  const [drawerOpened, setDrawerOpened] = useState(false)

  const resetHP = () => {
    setPlayers(
      [...players].map(player => {
        return {
          ...player,
          hp: 20,
        }
      })
    )
  }

  const toggleDrawer = () => {
    setDrawerOpened(drawerOpened => !drawerOpened)
  }

  const handleClick = (id: number, type: string) => {
    switch (type) {
      case CLICK_TYPE.ADD:
        setPlayers(
          [...players].map(player => {
            return player.id === id ? { ...player, hp: player.hp + 1 } : player
          })
        )

        break
      case CLICK_TYPE.REDUCE:
        setPlayers(
          [...players].map(player => {
            return player.id === id ? { ...player, hp: player.hp - 1 } : player
          })
        )

        break
      default:
        console.log(`Type ${type} is not supported.`)
    }
  }

  return (
    <AppWrapper>
      {players.map(player => (
        <Counter
          hp={player.hp}
          id={player.id}
          key={player.id}
          click={handleClick}
          isDrawerOpened={drawerOpened}
        />
      ))}
      <Drawer isOpened={drawerOpened} resetHP={resetHP} />
      <ToggleButton onClick={toggleDrawer} isOpened={drawerOpened} />
    </AppWrapper>
  )
}
