import React from 'react';
import { Public, Lock, People, PeopleOutline } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

import { Works, WorkItem } from '../style';

export default ({ family }) => {
  return (
    <Works>
      <h3>Family members</h3>
      {family.map((item) => (
        <WorkItem key={item.id}>
          <div className='a'>
            <PeopleOutline />
          </div>
          <div className='m'>
            <h3>{item.name}</h3>
            <h4>{item.relation}</h4>
          </div>
          <IconButton disabled>{item.privacy === 'private' ? <Lock /> : item.privacy === 'friends' ? <People /> : <Public />}</IconButton>
        </WorkItem>
      ))}
    </Works>
  );
};
