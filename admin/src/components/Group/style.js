const { default: styled } = require('styled-components');

export const Main = styled('div')`
  display: flex;
  align-items: center;
  padding: 5px;
  background-color: #3f51b5;
  margin: 5px;
`;
export const Avatar = styled('img')`
  border-radius: 50%;
  height: 60px;
  width: 60px;
  margin-right: 5px;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 2px;
`;
export const Body = styled('div')`
  flex: 1 1 auto;
`;
export const Buttons = styled('div')`
  button {
    margin: auto 5px;
  }
`;
