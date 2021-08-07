import React from 'react';

import { FriendsContainer, FriendCard, FriendAvatar, FriendInfo } from './style';
import { getUserAvatar } from '../../../../shared/functions';
import { UName } from '../../../../components/Tools';
import { Spinner } from '../../../../shared';
import { getFriends } from '../Hooks';
import { NoItem } from '../style';
import Header from '../Header';

export default ({ username, name, privacy }) => {
  document.title = `Friends | ${name?.join(' ')}`;
  const { friends, counts, working } = getFriends(username);
  return (
    <>
      <Header title='Friends' counts={counts} privacy={privacy} />
      <FriendsContainer>
        {friends?.map((user) => (
          <FriendCard>
            <FriendAvatar src={getUserAvatar(user?.avatar, user.gender)} alt='' />
            <FriendInfo>
              <a target='blank' href={`/${user.username}`}>
                <UName name={user.name} verified={user.verified} />
              </a>
              {user.info?.map((txt, i) => (
                <p key={i}>{txt}</p>
              ))}
            </FriendInfo>
          </FriendCard>
        ))}
        {working && <Spinner height={30} />}
        {friends?.length < 1 && !working && (
          <NoItem>
            <span>No friends.</span>
          </NoItem>
        )}
      </FriendsContainer>
    </>
  );
};
