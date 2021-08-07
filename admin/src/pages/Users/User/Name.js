import React, { useState } from 'react';
import { Divider, IconButton, TextField, CircularProgress } from '@material-ui/core';
import { Close, Save, Edit } from '@material-ui/icons';
import axios from 'axios';

import { BACKEND_URL } from '../../../shared/constants/Variables';
import { adminHeader } from '../../../shared/functions/Token';

export default ({ uid, name, setName }) => {
  const [first, setFirst] = useState(name[0]);
  const [last, setLast] = useState(name[1]);
  const [working, setWorking] = useState(false);
  const [edit, setEdit] = useState(false);
  function change() {
    setWorking(true);
    const n = [first?.trim(), last?.trim()];
    axios
      .put(`${BACKEND_URL}/edit/${uid}/name`, { first: n[0], last: n[1] }, { headers: adminHeader() })
      .then(() => {
        setName(n);
        setFirst(n[0]);
        setLast(n[1]);
        setEdit(false);
        setWorking(false);
      })
      .catch((err) => {
        setWorking(false);
        throw err;
      });
  }
  function reset() {
    setFirst(name[0]);
    setLast(name[1]);
    setEdit(false);
  }
  return (
    <div className='form' style={{ display: 'flex', alignItems: 'center', padding: 10 }}>
      <TextField
        variant='filled'
        label='First Name'
        value={first}
        onChange={(e) => setFirst(e.target.value)}
        fullWidth
        style={{ margin: '0 10px' }}
        disabled={!edit || working}
      />
      <TextField
        variant='filled'
        label='Last Name'
        value={last}
        onChange={(e) => setLast(e.target.value)}
        fullWidth
        style={{ margin: '0 10px' }}
        disabled={!edit || working}
      />
      {edit ? (
        <IconButton color='primary' disabled={!first || !last || working} onClick={change}>
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
