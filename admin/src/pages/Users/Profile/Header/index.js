import React from 'react';
import { Public, Info, People, Audiotrack, VideoLibrary, Group, Note, Photo, Timelapse, Lock } from '@material-ui/icons';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';

import { HoverOver } from '../../../../components/Tools';
import './style.scss';

export default ({ title, counts = 0, privacy }) => {
  return (
    <AppBar position='static' className='h'>
      <Toolbar>
        <Typography variant='h6' className='ht'>
          <HeaderIcon title={title} />
          {title} {!!counts && counts}
        </Typography>
        <HoverOver title='Privacy'>
          <IconButton color='inherit'>{privacy === 'public' ? <Public /> : privacy === 'friends' ? <People /> : <Lock />}</IconButton>
        </HoverOver>
      </Toolbar>
    </AppBar>
  );
};

function HeaderIcon({ title }) {
  switch (title.toLocaleLowerCase()) {
    case 'about':
      return <Info fontSize='large' />;
    case 'friends':
      return <People fontSize='large' />;
    case 'photos':
      return <Photo fontSize='large' />;
    case 'audios':
      return <Audiotrack fontSize='large' />;
    case 'videos':
      return <VideoLibrary fontSize='large' />;
    case 'groups':
      return <Group fontSize='large' />;
    case 'notes':
      return <Note fontSize='large' />;
    case 'activity log':
      return <Timelapse fontSize='large' />;
    default:
      return <Info fontSize='large' />;
  }
}
