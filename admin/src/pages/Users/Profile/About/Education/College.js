import React from 'react';
import { IconButton } from '@material-ui/core';
import { Public, Lock, People, School } from '@material-ui/icons';

import { Works, WorkItem } from '../style';

export default ({ college }) => {
  return (
    <Works>
      {college.map((item) => (
        <WorkItem key={item.id}>
          <div className='a'>{false ? <img src={''} alt='' /> : <School />}</div>
          <div className='m'>
            <h3>{item.name}</h3>
            <h4>{item.department}</h4>
            {!!item.degree && <div className='d'>{item.degree}</div>}
            {!!item?.detail && <p>{item.detail}</p>}
          </div>
          <div>
            <IconButton>{item.privacy === 'private' ? <Lock /> : item.privacy === 'friends' ? <People /> : <Public />}</IconButton>
          </div>
        </WorkItem>
      ))}
    </Works>
  );
};
