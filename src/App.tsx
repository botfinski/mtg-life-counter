import React, { useState } from 'react';
import Counter from './components/Counter/Counter';
import styled from 'styled-components';

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

const ResetButton = styled.button`
  position: absolute;
  top: calc(50% - 30px);
  left: calc(50% - 30px);
  width: 60px;
  height: 60px;
  background-color: yellow;
  border: 0;
  border-radius: 50%;
`

export const Players = [
  {
    id: 1,
    hp: 20
  },
  {
    id: 2,
    hp: 13
  }
]

export const CLICK_TYPE = {
  ADD: 'add',
  REDUCE: 'reduce'
}

export default function App() {

  const [players, setPlayers] = useState(Players)
  
  const resetHP = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(players);
    
    setPlayers([...players].map(player => {
      return {
        ...player,
        hp: 20
      }
    }))
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, id: number, type: string) => {
    console.log(id)
    console.log(type)

    switch (type) {
      case CLICK_TYPE.ADD:
        // setPlayers()
       
        break;
      case CLICK_TYPE.REDUCE:
        console.log(type)
        // setHP(hp - 1)
        break;
      default:
        console.log(`Type ${type} is not supported.`);
    }
  }
  

  // console.log(`setPlayer${id}HP`)
  

  console.log(players);

  return (
    <AppWrapper>
      {players.map(player => (
        <Counter hp={player.hp} id={player.id} key={player.id} click={handleClick} />
      ))}
      <ResetButton onClick={e => resetHP(e)} >reset</ResetButton>
    </AppWrapper>
  );
}