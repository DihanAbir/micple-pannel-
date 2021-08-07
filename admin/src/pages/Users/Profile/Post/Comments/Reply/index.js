import React from 'react';
import { IconButton } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { Link } from 'react-router-dom';

import { getUserAvatar, getUrl } from '../../../../../../shared/functions';
import { Replies, CommentButtonWrapper, TimeAgo } from '../../style';
import { UName } from '../../../../../../components/Tools';
import { Reactions } from '../../../../../../shared';
import { When } from '../../../../../../components';
import '../style.scss';

export default ({ user, contents, date, media, emoji }) => {
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
          <TimeAgo>
            <When date={date} />
          </TimeAgo>
        </CommentButtonWrapper>
      </div>
      <div>
        {contents.length > 1 && <small className='edited'>Edited</small>}
        <IconButton size='small' aria-haspopup='true'>
          <MoreVert />
        </IconButton>
      </div>
    </Replies>
  );
};
