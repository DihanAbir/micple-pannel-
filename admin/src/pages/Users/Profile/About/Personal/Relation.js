import React from 'react';
import { Public, Lock, People, Favorite } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

import { Works, WorkItem } from '../style';

export default ({ relation }) => {
  return (
    <Works>
      <h3>Relationship</h3>
      {Object.keys(relation || {}).length > 1 && (
        <WorkItem>
          <div className='a'>
            <Favorite />
          </div>
          <div className='m'>
            <h3>{relation?.status}</h3>
            {!!relation?.name && <h4>{relation?.name}</h4>}
            {!!relation?.date && !!relation?.name && (
              <div className='d'>
                <small>{new Date(relation?.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</small>
              </div>
            )}
            <div className='d'>Relationship</div>
          </div>
          <IconButton disabled>{relation?.privacy === 'private' ? <Lock /> : relation?.privacy === 'friends' ? <People /> : <Public />}</IconButton>
        </WorkItem>
      )}
    </Works>
  );
};
