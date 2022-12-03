import React from "react"
import styled, { css } from "styled-components"
import { CLICK_TYPE } from "../../App"

interface CounterStyleProps {
  isDrawerOpened: boolean
}

const CounterWrapper = styled.div<CounterStyleProps>`
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  outline: 1px solid beige;
  background: linear-gradient(229deg, #9c0101, #660200, #2c0403);
  transition: all 0.2s ease-in-out;

  &:nth-of-type(1) {
    order: 1;
    transform: rotate(180deg);
  }

  &:nth-of-type(2) {
    order: 3;
  }

  ${props =>
    props.isDrawerOpened &&
    css`
      height: calc(50vh - 50px);
    `};
`

const CounterButton = styled.button`
  width: 70px;
  height: 100%;
  border: 0;
  color: #fff;
  font-size: 3rem;
  background: rgba(0, 0, 0, 0.2);
`

const HP = styled.span`
  font-size: 8.5rem;
`

type Props = {
  id: number
  hp: number
  click: (id: number, type: string) => void
  isDrawerOpened: boolean
}

const Counter: React.FC<Props> = ({ hp, id, click, isDrawerOpened }) => {
  return (
    <CounterWrapper isDrawerOpened={isDrawerOpened}>
      <CounterButton onClick={e => click(id, CLICK_TYPE.REDUCE)}>
        -
      </CounterButton>
      <HP>{hp}</HP>
      <CounterButton onClick={e => click(id, CLICK_TYPE.ADD)}>+</CounterButton>
    </CounterWrapper>
  )
}

export default Counter
