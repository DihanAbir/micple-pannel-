import styled from 'styled-components';
import { Avatar } from '@material-ui/core';

export const FriendsContainer = styled('div')`
  width: 98%;
  margin: 0 auto;
`;
export const FriendCard = styled('div')`
  display: flex;
  align-items: center;
  border: 1px solid #c6c6c6;
  padding: 5px;
  background-color: #d4d4d4;
  margin: 5px;
  width: 100%;
  max-width: 475px;
`;
export const FriendAvatar = styled(Avatar)`
  height: 90px !important;
  width: 90px !important;
  & > img {
    border-radius: 50%;
    padding: 3px;
    border: 1px solid #b9b9b9;
    margin-right: 5px;
  }
`;
export const FriendInfo = styled('div')`
  margin-left: 5px;
  a {
    font-size: 16px;
    font-weight: 500;
    display: block;
    margin-bottom: 5px;
  }
`;
