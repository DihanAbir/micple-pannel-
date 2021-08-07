/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { IconButton } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

import { getUserAvatar } from '../../../../../shared/functions';
import { CommentButtonWrapper, TimeAgo } from '../style';
import { UName } from '../../../../../components/Tools';
import { Reactions } from '../../../../../shared';
import { When } from '../../../../../components';
import Replys from './Reply';
import './style.scss';

export default ({ comments }) => {
  return (
    <div>
      {comments?.map((id, contents, user, date, replies, postId, emoji, media) => (
        <div className='Comments fadeIn'>
          <div className='profileBox'>
            <img className='avatar' src={getUserAvatar(user.avatar, user.gender)} alt='' />
          </div>
          <div className='commentBox'>
            <div className='commentWrapper'>
              <div className='comment'>
                <a className='user' href={`/${user.username}`} target>
                  <UName name={user.name} verified={user.verified} />
                </a>
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
            <IconButton size='small' aria-haspopup='true'>
              <MoreVert />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  );
};
