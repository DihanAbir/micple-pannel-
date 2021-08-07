import React from 'react';

import { Root, IconWrapper, IconContainer } from './style';
import { Reactions } from '../../shared';

export default ({ children, center = false, left = false }) => {
  return (
    <Root>
      {children}
      <IconWrapper left={left} center={center}>
        <IconContainer>
          <Reactions open={children} close={() => {}} onReact={() => {}} />
        </IconContainer>
      </IconWrapper>
    </Root>
  );
};
