import React from 'react';
import styled from 'styled-components';
import { CLICK_TYPE } from '../../App';

const CounterWrapper = styled.div`
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  outline: 1px solid beige;
  background: linear-gradient(229deg, #9c0101, #660200, #2c0403); 
`;

const CounterButton = styled.button`
  width: 70px;
  height: 100%;
  border: 0;
  color: #fff;
  font-size: 3rem;
  background: rgba(0,0,0,0.2);
`

const HP = styled.span`
  font-size: 8.5rem;
`

type Props = {
  id: number;
  hp: number;
  click: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number, type: string) => void;
};

const Counter: React.FC<Props> = ({ hp, id, click }) => {
  return(
    <CounterWrapper>
      <CounterButton 
        onClick={e => click(e, id, CLICK_TYPE.REDUCE)}
      >
        -
      </CounterButton>
      <HP>{hp}</HP>
      <CounterButton 
        onClick={e => click(e, id, CLICK_TYPE.ADD)}
      >
        +
      </CounterButton>
    </CounterWrapper>
  )
}

export default Counter;