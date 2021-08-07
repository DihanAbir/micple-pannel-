import styled, { keyframes } from 'styled-components';
import ScrollToBottom from 'react-scroll-to-bottom';

const rotation = keyframes`
from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;
export const Container = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;
export const Box = styled('div')`
  background-color: #000c;
  box-shadow: 0 0 5px 0 #000;
  width: 100%;
  max-width: 500px;
  padding: 5px;
  height: 225px;
  font-size: 16px;
  color: aqua;
  cursor: text;
`;
export const Scroll = styled(ScrollToBottom)`
  height: 100%;
`;
export const Item = styled('div')`
  margin: 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  &.err {
    color: #f00;
  }
`;
export const Dollar = styled('div')`
  color: #2aff2a;
  margin-right: 5px;
`;
export const Input = styled('input')`
  background-color: transparent;
  outline: 0;
  color: #2aff2a;
  border: 0;
  width: 95%;
  &:hover,
  &:focus {
    outline: 0;
  }
`;
export const Spin = styled('div')`
  display: flex;
  justify-content: center;
  span {
    animation: ${rotation} 1s infinite linear;
  }
`;
