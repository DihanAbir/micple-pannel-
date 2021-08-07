import React from 'react';
import { Public, Lock, People, Language } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

import { Works, WorkItem } from '../style';

export default ({ website }) => {
  return (
    <Works>
      {Object.keys(website || {}).length > 0 && (
        <WorkItem>
          <div className='a'>
            <Language />
          </div>
          <div className='m'>
            <h4>{website?.name}</h4>
            <div className='d'>Website</div>
          </div>
          <IconButton>{website?.privacy === 'private' ? <Lock /> : website?.privacy === 'friends' ? <People /> : <Public />}</IconButton>
        </WorkItem>
      )}
    </Works>
  );
};
