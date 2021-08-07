import styled from 'styled-components';

export const Post = styled('div')`
  margin: 10px;
  background-color: #b6fff8;
  border: 1px solid #d2d2d2;
`;
export const CommentButtonWrapper = styled('div')`
  display: flex;
  align-items: center;
  margin: 5px 0 10px;
`;
export const CommentButton = styled('button')`
  border: 0;
  padding: 0;
  background: transparent;
  color: #385898;
  font-size: 12px;
  line-height: 12px;
  margin-right: 15px;
  display: block;
`;
export const TimeAgo = styled('p')`
  color: #606770;
  margin: 0;
  font-size: 12px;
  margin-left: 14px;
`;
export const Replies = styled('div')`
  display: flex;
  flex-wrap: wrap;
`;
