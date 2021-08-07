import React from 'react';
import { Link } from 'react-router-dom';

import { FriendCard, FriendAvatar, FriendInfo } from './style';
import { getUserAvatar } from '../../shared/functions';
import { UName } from '../Tools';

export default ({ user }) => {
  return (
    <FriendCard>
      <FriendAvatar src={getUserAvatar(user.avatar, user.gender)} alt='' />
      <FriendInfo>
        <Link to={`/${user.username}`}>
          <UName name={user.name} verified={user.verified} />
        </Link>
        {user.info?.map((txt, i) => (
          <p key={i}>{txt}</p>
        ))}
      </FriendInfo>
    </FriendCard>
  );
};
