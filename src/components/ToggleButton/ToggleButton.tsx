import React from "react"
import styled, { css } from "styled-components"
import { MtgIcon } from "../Icons/Icons"

export type ToggleButtonProps = {
  toggleDrawer?: () => void
  drawerOpened: boolean
}

const ToggleButtonWrapper = styled.button<ToggleButtonProps>`
  position: absolute;
  top: calc(50vh - 35px);
  left: calc(50% - 35px);
  width: 70px;
  height: 70px;
  background-color: white;
  border: 3px solid black;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;

  ${props =>
    props.drawerOpened &&
    css`
      top: calc(50vh - 87px);
    `};
`

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  toggleDrawer,
  drawerOpened,
}) => {
  return (
    <ToggleButtonWrapper
      onClick={toggleDrawer}
      drawerOpened={drawerOpened}
      type="button"
    >
      <MtgIcon />
    </ToggleButtonWrapper>
  )
}

export default ToggleButton
