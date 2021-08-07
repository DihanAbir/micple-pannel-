import React, { useState } from 'react';
import { Divider, IconButton, TextField, CircularProgress } from '@material-ui/core';
import { Close, Save, Edit } from '@material-ui/icons';
import axios from 'axios';

import { BACKEND_URL } from '../../../shared/constants/Variables';
import { adminHeader } from '../../../shared/functions/Token';

export default ({ uid, parents, setParents }) => {
  const [father, setFather] = useState(parents.father);
  const [mother, setMother] = useState(parents.mother);
  const [working, setWorking] = useState(false);
  const [edit, setEdit] = useState(false);
  function change() {
    setWorking(true);
    const n = { father: father.trim(), mother: mother.trim() };
    axios
      .put(`${BACKEND_URL}/edit/${uid}/parents`, n, { headers: adminHeader() })
      .then(() => {
        setParents(n);
        setFather(n.father);
        setMother(n.mother);
        setEdit(false);
        setWorking(false);
      })
      .catch((err) => {
        setWorking(false);
        throw err;
      });
  }
  function reset() {
    setFather(parents.father);
    setMother(parents.mother);
    setEdit(false);
  }
  return (
    <div className='form' style={{ display: 'flex', alignItems: 'center', padding: 10 }}>
      <TextField
        variant='filled'
        label={`Father's Name`}
        value={father}
        onChange={(e) => setFather(e.target.value)}
        fullWidth
        style={{ margin: '0 10px' }}
        disabled={!edit || working}
      />
      <TextField
        variant='filled'
        label={`Mother's Name`}
        value={mother}
        onChange={(e) => setMother(e.target.value)}
        fullWidth
        style={{ margin: '0 10px' }}
        disabled={!edit || working}
      />
      {edit ? (
        <IconButton color='primary' disabled={!father || !mother || working} onClick={change}>
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
