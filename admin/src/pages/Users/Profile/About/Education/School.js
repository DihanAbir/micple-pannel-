import React from 'react';
import { Public, Lock, People, School } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

import { Works, WorkItem } from '../style';

export default ({ school }) => {
  return (
    <Works>
      {school.map((item) => (
        <WorkItem key={item.id}>
          <div className='a'>
            <School />
          </div>
          <div className='m'>
            <h3>{item.name}</h3>
            <h4>{item.department}</h4>
            {!!item.degree && <div className='d'>{item.degree}</div>}
            {!!item?.detail && <p>{item.detail}</p>}
          </div>
          <IconButton disabled>{item.privacy === 'private' ? <Lock /> : item.privacy === 'friends' ? <People /> : <Public />}</IconButton>
        </WorkItem>
      ))}
    </Works>
  );
};
