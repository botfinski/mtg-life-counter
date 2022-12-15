import React from "react";
import styled, { css } from "styled-components";

export interface DrawerProps {
  isOpened: boolean;
  resetHP?: () => void;
}

const Drawer = styled.div<DrawerProps>`
  height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  order: 1;
  transition: all 0.2s ease-in-out;
  background: #414141;
  box-shadow: inset 0px 10px 35px -10px #000;

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
`;

const ResetButton = styled.button`
  width: 95px;
  height: 60px;
  background-color: white;
  border: 0;
  font-family: inherit;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  border: 3px solid black;
`;

const DrawerWrapper: React.FC<DrawerProps> = ({ isOpened, resetHP }) => {
  return (
    <Drawer isOpened={isOpened}>
      <ResetButton type="button" onClick={resetHP}>
        reset
      </ResetButton>
    </Drawer>
  );
};

export default DrawerWrapper;
