import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const UserError = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export const TabWrapper = styled('div')`
  box-shadow: 0 0 2px 0 #656565;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 120px;
  padding-right: 15px;
  border-bottom: 3px solid #ce513f;
  background: #fff;
  height: 38px;
`;
export const LogOut = styled('button')`
  padding: 0;
  border: 0;
  background: transparent;
  font-size: 18px;
  font-weight: 700;
`;
export const NoItem = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;
  span {
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    color: #777;
    border-bottom: 1px solid #777;
    padding-bottom: 10px;
  }
`;
export const RequestLink = styled(Link)`
  border-bottom: 2px solid #c6c6c6;
  border-right: 2px solid #c6c6c6;
  padding: 2px 10px;
  color: orange;
  display: block;
  margin: 20px auto;
  width: 150px;
  text-align: center;
  &:hover {
    color: #df9000;
    border-bottom: 2px solid #df9000;
    border-right: 2px solid #df9000;
  }
`;
export const Media = styled('div')`
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
  justify-content: center;
`;
export const ContentItem = styled('div')`
  width: 230px;
  cursor: pointer;
  box-shadow: 0 0 5px #0004;
  margin: 5px;
`;
export const BottomOption = styled('div')`
  padding: 5px;
  font-size: 15px;
`;
export const Poster = styled('div')`
  position: relative;
`;
export const Duration = styled('span')`
  position: absolute;
  left: 10px;
  top: 10px;
  background-color: #666;
  padding: 0 5px;
  color: #fff;
  width: auto !important;
`;
