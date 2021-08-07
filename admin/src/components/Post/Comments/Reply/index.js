import React from 'react';
import { MoreVert, ThumbUpAlt, ThumbUpAltOutlined, ThumbDownAlt, ThumbDownAltOutlined } from '@material-ui/icons';
import { IconButton, withStyles, createStyles, Badge } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { Replies, CommentButtonWrapper, TimeAgo } from '../../style';
import { getUserAvatar, getUrl } from '../../../../shared/functions';
import { Reactions } from '../../../../shared';
import { UName } from '../../../Tools';
import { When } from '../../..';
import '../style.scss';

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

export default ({ user, contents, date, likes, dislikes, liked, disliked, media, emoji }) => {
  return (
    <Replies>
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
                <p>{!!media && <img className='p' alt='' src={getUrl(media)} />}</p>
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
          <TimeAgo>
            <When date={date} />
          </TimeAgo>
        </CommentButtonWrapper>
      </div>
      <div>
        {contents.length > 1 && <small className='edited'>Edited</small>}
        <IconButton size='small'>
          <MoreVert />
        </IconButton>
      </div>
    </Replies>
  );
};
