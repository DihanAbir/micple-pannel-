import React, { useState } from 'react';
import { AddPhotoAlternate, EmojiEmotions, Cancel } from '@material-ui/icons';
import { IconButton, Typography } from '@material-ui/core';

import { Reactions } from '../../../../shared';
import './style.scss';

export default () => {
  const [anchorEl, setAnchorEl] = useState(null);
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
        <input
          style={{ visibility: 'hidden', height: 0, width: 0 }}
          accept='image/*'
          id='commentImage'
          type='file'
          onChange={selectImage}
        />
      </div>
    </div>
  );
};
