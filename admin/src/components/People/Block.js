import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

export default ({ open, close, username, action }) => {
  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth='sm'>
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent dividers>Are you sure to block {username}</DialogContent>
      <DialogActions>
        <Button variant='outlined' color='secondary' onClick={close}>
          Cancel
        </Button>
        <Button variant='contained' color='secondary' onClick={action}>
          Block
        </Button>
      </DialogActions>
    </Dialog>
  );
};
