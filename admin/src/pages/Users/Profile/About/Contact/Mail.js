import React from 'react';
import { IconButton } from '@material-ui/core';
import { Public, AlternateEmail } from '@material-ui/icons';

import { Works, WorkItem } from '../style';

export default ({ username }) => {
  return (
    <>
      <Works>
        <WorkItem>
          <div className='a'>
            <AlternateEmail />
          </div>
          <div className='m'>
            <h4>{`${username}@micple.com`}</h4>
            <div className='d'>Email</div>
          </div>
          <IconButton disabled>
            <Public />
          </IconButton>
        </WorkItem>
      </Works>
    </>
  );
};
