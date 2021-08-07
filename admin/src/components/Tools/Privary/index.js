import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';

export default ({ anchorEl, setAnchorEl, onSelect }) => {
  const origin = {
    vertical: 'top',
    horizontal: 'right',
  };
  function select(name) {
    setAnchorEl(null);
    onSelect(name);
  }
  return (
    <Menu anchorEl={anchorEl} anchorOrigin={origin} keepMounted transformOrigin={origin} open={!!anchorEl} onClose={() => setAnchorEl(null)}>
      <MenuItem onClick={() => select('public')}>Public</MenuItem>
      <MenuItem onClick={() => select('friends')}>Friends</MenuItem>
      <MenuItem onClick={() => select('private')}>Only me</MenuItem>
    </Menu>
  );
};
