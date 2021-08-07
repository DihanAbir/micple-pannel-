import React from 'react';

import Verified from '../../../assets/profile/Verified.png';
import { HoverOver } from '..';

export default ({ name, verified, width = 12 }) => {
  return (
    <span
      style={{
        display: 'flex',
        alignItems: 'baseline',
      }}
    >
      {name?.join(' ')}
      {verified && (
        <HoverOver placement='right' title='Profile Verified'>
          <img
            style={{
              marginLeft: 5,
              width,
              height: 'auto',
            }}
            alt=''
            src={Verified}
          />
        </HoverOver>
      )}
    </span>
  );
};
