/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { MoreVert, ThumbUpAlt, ThumbUpAltOutlined, ThumbDownAltOutlined, ThumbDownAlt, Reply } from '@material-ui/icons';
import { IconButton, Badge, withStyles, createStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { getUserAvatar } from '../../../shared/functions';
import { CommentButtonWrapper, TimeAgo } from '../style';
import { Reactions } from '../../../shared';
import { UName } from '../../Tools';
import When from '../../When';
import Replys from './Reply';
import './style.scss';

const StyledBadge = withStyles(() =>
  createStyles({
    badge: {
      right: -7,
      top: 7,
      boxShadow: '2px 0 5px #000',
      padding: 1,
      backgroundColor: '#ffe6c4',
      color: '#000',
      fontSize: 10,
    },
  })
)(Badge);

const Comments = ({ id, contents, user, date, replies, postId, likes, dislikes, liked, disliked, media, emoji }) => {
  return (
    <>
      <div className='Comments fadeIn'>
        <div className='profileBox'>
          <img className='avatar' src={getUserAvatar(user.avatar, user.gender)} alt='' />
        </div>
        <div className='commentBox'>
          <div className='commentWrapper'>
            <div className='comment'>
              <Link className='user' to={`/${user.username}`}>
                <UName name={user.name} verified={user.verified} />
              </Link>
              &nbsp;
              {!emoji ? (
                <>
                  {contents[contents?.length - 1]}
                  <p>{!!media && <img className='p' alt='' src={media} />}</p>
                </>
              ) : (
                <p>
                  <img className='e' alt='' src={Reactions.find((r) => r.name === emoji).icon} />
                </p>
              )}
            </div>
          </div>
          <CommentButtonWrapper>
            <IconButton>
              <StyledBadge badgeContent={likes}>{liked ? <ThumbUpAlt color='primary' /> : <ThumbUpAltOutlined />}</StyledBadge>
            </IconButton>
            <IconButton>
              <StyledBadge badgeContent={dislikes}>{disliked ? <ThumbDownAlt color='primary' /> : <ThumbDownAltOutlined />}</StyledBadge>
            </IconButton>
            <IconButton>
              <Reply />
            </IconButton>
            <TimeAgo>
              <When date={date} />
            </TimeAgo>
          </CommentButtonWrapper>
          {replies?.map((reply) => (
            <Replys key={reply.id} {...reply} postId={postId} commentId={id} />
          ))}
        </div>
        <div>
          {contents.length > 1 && <small className='edited'>Edited</small>}
          <IconButton size='small'>
            <MoreVert />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default ({ comments, postId }) => {
  return (
    <div>
      {comments?.map((comment) => (
        <Comments key={comment.id} {...comment} postId={postId} />
      ))}
    </div>
  );
};
