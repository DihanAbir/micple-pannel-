import styled, { css } from 'styled-components';

export const IconWrapper = styled('div')`
  position: absolute;
  padding: 0 0 2px;
  bottom: 100%;
  ${({ left }) =>
    left &&
    css`
      right: 0;
    `};
  ${({ center }) =>
    center &&
    css`
      left: 50%;
      transform: translateX(-50%);
    `};
`;
export const Root = styled('div')`
  position: relative;
  &:not(:hover) {
    ${IconWrapper} {
      display: none;
    }
  }
`;

export const IconContainer = styled('div')`
  display: flex;
  align-items: center;
  box-shadow: 0 0 3px 0 #9b9b9b;

  padding: 4px;
  background-color: #fff;
  border-radius: 6px;
  margin-bottom: 8px;
`;
export const IconButton = styled('button')`
  background-color: #0000;
  border: 0;
  padding: 0;
  margin: 0 4px;
  outline: 0;
  width: 25px;
  height: 30px;
  img {
    transition: all 0.3s;
    &:hover {
      transform: scale(1.2);
    }
  }
  ${({ chatModal }) =>
    chatModal &&
    css`
      margin: 0 2px;
      img {
        height: 12px;
      }
    `};
`;
