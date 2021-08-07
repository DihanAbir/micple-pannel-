import styled from 'styled-components';
export const Container = styled('div')`
  display: flex;
`;
export const Left = styled('div')`
  width: 230px;
  height: 100vh;
  border-right: 1px solid #bbb;
  position: fixed;
  top: 0;
  left: 0;
`;
export const Body = styled('div')`
  flex: 1 1 auto;
  margin-left: 230px;
`;
export const Nav = styled('div')`
  a {
    text-align: center;
    border-top: 1px solid #bbb;
    display: block;
    padding: 13px;
    color: #000;
    font-weight: 700;
    &.active {
      background-color: #bbb;
      color: #f43636;
    }
  }
`;
export const Profile = styled('div')`
  padding: 10px 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    font-size: 17px;
  }
  img {
    display: block;
    width: 105px;
    height: 100px;
    margin: 10px auto;
    border-radius: 50%;
  }
  p {
    color: #333;
  }
`;
