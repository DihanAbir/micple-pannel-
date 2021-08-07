import React from 'react';
import { Public, Lock, People, Phone } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

import { Works, WorkItem } from '../style';

export default ({ phone }) => {
  return (
    <Works>
      <WorkItem>
        <div className='a'>
          <Phone />
        </div>
        <div className='m'>
          <h4>{phone.number}</h4>
          <div className='d'>Phone Number</div>
        </div>
        <IconButton disabled>{phone.privacy === 'private' ? <Lock /> : phone.privacy === 'friends' ? <People /> : <Public />}</IconButton>
      </WorkItem>
    </Works>
  );
};
