import React, { useState, forwardRef } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Slide, CircularProgress } from '@material-ui/core';
import axios from 'axios';

import { BACKEND_URL } from '../../../shared/constants/Variables';
import { adminHeader } from '../../../shared/functions/Token';

const Transition = forwardRef((props, ref) => <Slide direction='up' ref={ref} {...props} />);

export default ({ open, name, uid, close, deleteUser, username }) => {
  const [working, setWorking] = useState(false);
  function onDelete() {
    setWorking(true);
    axios
      .delete(`${BACKEND_URL}/edit/${uid}`, { headers: adminHeader() })
      .then(() => {
        setWorking(false);
        deleteUser();
        close();
      })
      .catch((err) => {
        setWorking(false);
        throw err;
      });
  }
  return (
    <Dialog fullWidth maxWidth='sm' open={open} onClose={close} TransitionComponent={Transition}>
      <DialogTitle>{working ? 'Please wait' : `Delete ${name.join(' ')}`}</DialogTitle>
      <DialogContent dividers>
        {working ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CircularProgress size={20} color='secondary' /> Cleaning all the data relevent to {username}. This may take some time.
          </div>
        ) : (
          <div>
            Are you sure to delete <strong>{username}</strong> permanently?
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button size='small' variant='contained' color='secondary' onClick={close} disabled={working}>
          Cancel
        </Button>
        <Button size='small' variant='contained' color='primary' onClick={onDelete} disabled={working}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
