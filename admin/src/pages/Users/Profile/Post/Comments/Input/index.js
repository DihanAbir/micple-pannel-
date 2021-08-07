import React, { useState } from 'react';
import { AddPhotoAlternate, EmojiEmotions, Cancel } from '@material-ui/icons';
import { IconButton, Typography } from '@material-ui/core';

import { commentPost, replyComment } from '../../../../sockets/emit';
import { readImage } from '../../../../shared/functions/Avatar';
import { Reactions } from '../../../../shared';
import './style.scss';

export default ({ postId, commentId, type }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  function onComment(e) {
    const text = input.trim();
    if (e.keyCode === 13 && (!!image || !!text)) {
      if (!!image) {
        readImage(image)
          .then((data) => {
            if (type === 'comment') {
              commentPost(postId, text, { data, type: image.type, name: image.name });
            }
            if (type === 'reply') {
              replyComment(postId, commentId, text, { data, type: image.type, name: image.name });
            }
          })
          .catch((e) => setError(e));
      } else {
        if (type === 'comment') {
          commentPost(postId, text);
        }
        if (type === 'reply') {
          replyComment(postId, commentId, text);
        }
      }
      setInput('');
      setImage(null);
    }
  }
  function onReact(name) {
    if (type === 'comment') {
      commentPost(postId, '', null, name);
    } else if (type === 'reply') {
      replyComment(postId, commentId, '', null, name);
    }
    setAnchorEl(null);
  }
  function selectImage({ target }) {
    const file = target.files[0];
    if (!['jpg', 'jpeg', 'png'].includes(file.type.split('/')[1])) {
      setError('Invalid image type.');
    } else if (file.size > 1048576) {
      setError('Image is too large');
    } else {
      setImage(file);
    }
  }
  return (
    <div className='UserCommentInput'>
      {!!image && (
        <div className='add-gal'>
          <IconButton color='secondary' onClick={() => setImage(null)}>
            <Cancel color='secondary' />
          </IconButton>
          <img alt='' src={URL.createObjectURL(image)} />
        </div>
      )}
      {!!error && (
        <div className='add-gal'>
          <Typography component='p' variant='subtitle1' color='secondary'>
            {error}
          </Typography>
        </div>
      )}
      <div className='wrapper'>
        <input placeholder='Write a comment...' value={input} onKeyUp={onComment} onChange={(e) => setInput(e.target.value)} autoFocus />
        <div className='buttonWapper'>
          <Reactions open={anchorEl} close={() => setAnchorEl(null)} onReact={onReact} />
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <EmojiEmotions color='primary' />
          </IconButton>
          <IconButton onClick={() => document.getElementById('commentImage').click()}>
            <AddPhotoAlternate color='primary' />
          </IconButton>
        </div>
        <input style={{ visibility: 'hidden', height: 0, width: 0 }} accept='image/*' id='commentImage' type='file' onChange={selectImage} />
      </div>
    </div>
  );
};
