import React from 'react';
import { Public, Lock, People, Today } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

import { Works, WorkItem } from '../style';

export default ({ dob }) => {
  return (
    <Works>
      <WorkItem>
        <div className='a'>
          <Today />
        </div>
        <div className='m'>
          <h4>{new Date(dob?.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</h4>
          <div className='d'>Date of Birth</div>
        </div>
        <IconButton disabled>{dob?.privacy === 'private' ? <Lock /> : dob?.privacy === 'friends' ? <People /> : <Public />}</IconButton>
      </WorkItem>
    </Works>
  );
};
