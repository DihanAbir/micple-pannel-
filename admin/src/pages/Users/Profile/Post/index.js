import React, { useState } from 'react';

import Reactions from './Reactions';
import Comments from './Comments';
import Content from './Content';
import { Post } from './style';
import User from './User';
import './style.js';

export default ({ id, user, privacy, date, comments, totalComments, contents, media, status, reacts, rejected }) => {
  const [active, setActive] = useState(false);
  return (
    <Post className='fadeIn'>
      <User edited={contents.length > 1} user={user} privacy={privacy} date={date} status={status} rejected={rejected} postId={id} />
      <Content contents={contents} media={media} postId={id} />
      <Reactions reacts={reacts} comments={totalComments} setActive={setActive} active={active} />
      {active && <Comments comments={comments} />}
    </Post>
  );
};
