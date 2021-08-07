import React from 'react';
import { Wc } from '@material-ui/icons';

import { Works, WorkItem } from '../style';

export default ({ gender }) => {
  return (
    <Works>
      <WorkItem>
        <div className='a'>
          <Wc />
        </div>
        <div className='m'>
          <h4>{gender}</h4>
          <div className='d'>Gender</div>
        </div>
      </WorkItem>
    </Works>
  );
};
