import React from 'react';
import { Work, Public, Lock, People } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

import { Works, WorkItem } from '../style';

export default ({ works }) => {
  return (
    <>
      <h2>Profession</h2>
      <Works>
        {works.map((item) => (
          <WorkItem key={item.id}>
            <div className='a'>
              <Work />
            </div>
            <div className='m'>
              <h3>{item.employer}</h3>
              <h4>{item.position}</h4>
              {!!item?.detail && <p>{item.detail}</p>}
            </div>
            <IconButton disabled>{item.privacy === 'private' ? <Lock /> : item.privacy === 'friends' ? <People /> : <Public />}</IconButton>
          </WorkItem>
        ))}
      </Works>
    </>
  );
};
