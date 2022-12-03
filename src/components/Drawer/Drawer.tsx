import React from "react"
import styled, { css } from "styled-components"

export interface DrawerProps {
  isOpened: boolean
  resetHP?: () => void
}

const Drawer = styled.div<DrawerProps>`
  height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  order: 1;
  transition: all 0.2s ease-in-out;

  & > button {
    visibility: hidden;
    opacity: 0;
  }

  ${props =>
    props.isOpened &&
    css`
      height: 100px;
      & > button {
        visibility: visible;
        opacity: 1;
      }
    `};
`

const ResetButton = styled.button`
  position: absolute;
  top: calc(50% - 30px);
  left: calc(50% - 30px);
  width: 60px;
  height: 60px;
  background-color: white;
  border: 0;
`

const DrawerWrapper: React.FC<DrawerProps> = ({ isOpened, resetHP }) => {
  return (
    <Drawer isOpened={isOpened}>
      <ResetButton onClick={resetHP}>reset</ResetButton>
    </Drawer>
  )
}

export default DrawerWrapper
