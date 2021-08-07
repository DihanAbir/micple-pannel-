import React, { Fragment } from 'react';
import { Tooltip, Typography, Fade } from '@material-ui/core';

export default ({ children, title, placement = 'top' }) => {
  return (
    <Tooltip
      placement={placement}
      title={
        <Fragment>
          <Typography component='h4' variant='body1'>
            {title}
          </Typography>
        </Fragment>
      }
      TransitionComponent={Fade}
    >
      {children}
    </Tooltip>
  );
};
