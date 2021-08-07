/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';

import { Spinner } from '../../../../shared';
import { getPosts } from '../Hooks';
import { NoItem } from '../style';
import Post from '../Post';

export default ({ username, name }) => {
  document.title = `Timeline | ${name?.join(' ')}`;
  const [offset] = useState(0);
  const { posts, working } = getPosts(username, offset);
  if (window.innerHeight) {
  }
  return (
    <>
      {posts
        .filter((item) => item.user.username === username)
        .map((post) => (
          <Post key={post.id} {...post} />
        ))}
      {working && <Spinner height={30} />}
      {!working && posts.length < 1 && (
        <NoItem>
          <span>No posts.</span>
        </NoItem>
      )}
    </>
  );
};
