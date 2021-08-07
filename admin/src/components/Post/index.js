import React, { useState } from 'react';

import Reactions from './Reactions';
import Comments from './Comments';
import store from '../../store';
import Content from './Content';
import { Post } from './style';
import User from './User';
import './style.js';

export default ({ id, user, privacy, date, comments, totalComments, shares, contents, media, status, myreact, reacts }) => {
  const [active, setActive] = useState(false);
  function isMe() {
    return store.getState().auth.user.id === user.id;
  }
  return (
    <Post className='fadeIn'>
      <User
        content={contents[contents.length - 1]}
        edited={contents.length > 1}
        postId={id}
        user={user}
        privacy={privacy}
        date={date}
        status={status}
        isMe={isMe}
      />
      <Content contents={contents} media={media} postId={id} />
      <Reactions
        isMe={isMe}
        postId={id}
        reacts={reacts}
        myreact={myreact}
        comments={totalComments}
        shares={shares}
        setActive={setActive}
        active={active}
        username={user.username}
      />
      {active && <Comments postId={id} comments={comments} totalComments={totalComments} />}
    </Post>
  );
};
