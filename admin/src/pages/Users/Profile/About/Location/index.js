import React from 'react';
import { Public, Lock, People, LocationOn } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

import { Works, WorkItem } from '../style';

export default ({ location }) => {
  return (
    <>
      <h2>Location</h2>
      <Works>
        <WorkItem>
          <div className='a'>
            <LocationOn />
          </div>
          <div className='m'>
            <h4>
              {location.address}, {location.city}
            </h4>
            <h4>
              {location.state} - {location.zip}
            </h4>
            <h4>{location.country}</h4>
          </div>
          <IconButton disabled>{location.privacy === 'private' ? <Lock /> : location.privacy === 'friends' ? <People /> : <Public />}</IconButton>
        </WorkItem>
      </Works>
    </>
  );
};
