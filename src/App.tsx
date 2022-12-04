import { useEffect, useState } from "react"
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
  top: calc(50vh - 35px);
  left: calc(50% - 35px);
  width: 70px;
  height: 70px;
  background-color: yellow;
  border: 0;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;

  ${props =>
    props.isOpened &&
    css`
      top: calc(50vh - 87px);
    `};
`

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
]

export const CLICK_TYPE = {
  ADD: "add",
  REDUCE: "reduce",
}

export default function App() {
  const [players, setPlayers] = useState(
    () => JSON.parse(localStorage.getItem("players")!) || Players
  )
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
    setTimeout(() => {
      setDrawerOpened(false)
    }, 500)
  }

  const toggleDrawer = () => {
    setDrawerOpened(drawerOpened => !drawerOpened)
    setPlayers(
      [...players].map(player => ({ ...player, colorPanelOpened: false }))
    )
  }

  const handleHPCounter = (id: number, type: string) => {
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

  const toggleColorPanel = (id: number) => {
    setPlayers(
      [...players].map(player => {
        return player.id === id
          ? { ...player, colorPanelOpened: !player.colorPanelOpened }
          : player
      })
    )
    setDrawerOpened(false)
  }

  const handleColorChange = (id: number, color: string) => {
    setPlayers(
      [...players].map(player => {
        return player.id === id
          ? { ...player, bgColor: color, colorPanelOpened: false }
          : player
      })
    )
  }

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players))
  }, [players])

  return (
    <AppWrapper>
      {players.map((player: any) => (
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
      <ToggleButton
        onClick={toggleDrawer}
        isOpened={drawerOpened}
        type="button"
      />
    </AppWrapper>
  )
}
