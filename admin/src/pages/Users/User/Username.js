import React, { useState } from 'react';
import { Divider, IconButton, TextField, CircularProgress } from '@material-ui/core';
import { Close, Save, Edit } from '@material-ui/icons';
import axios from 'axios';

import { BACKEND_URL } from '../../../shared/constants/Variables';
import { adminHeader } from '../../../shared/functions/Token';

export default ({ uid, username, setUsername }) => {
  const [user, setUser] = useState(username);
  const [working, setWorking] = useState(false);
  const [edit, setEdit] = useState(false);
  function change() {
    setWorking(true);
    axios
      .put(`${BACKEND_URL}/edit/${uid}/username`, { username: user.trim() }, { headers: adminHeader() })
      .then(() => {
        setUsername(user.trim());
        setEdit(false);
        setWorking(false);
      })
      .catch((err) => {
        setWorking(false);
        throw err;
      });
  }
  function reset() {
    setUser(username);
    setEdit(false);
  }
  return (
    <div className='form' style={{ display: 'flex', alignItems: 'center', padding: 10 }}>
      <TextField
        variant='filled'
        label='Username'
        value={user}
        onChange={(e) => setUser(e.target.value)}
        fullWidth
        style={{ margin: '0 10px' }}
        disabled={!edit || working}
      />
      {edit ? (
        <IconButton color='primary' disabled={!user || working} onClick={change}>
          {working ? <CircularProgress size={20} /> : <Save />}
        </IconButton>
      ) : (
        <IconButton color='primary' onClick={() => setEdit(true)}>
          <Edit />
        </IconButton>
      )}
      <Divider style={{ height: 20 }} orientation='vertical' />
      <IconButton color='secondary' onClick={reset}>
        <Close />
      </IconButton>
    </div>
  );
};
