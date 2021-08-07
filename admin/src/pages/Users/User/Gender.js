import React, { useState } from 'react';
import { Divider, IconButton, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Close, Save, Edit } from '@material-ui/icons';
import axios from 'axios';

import { BACKEND_URL } from '../../../shared/constants/Variables';
import { adminHeader } from '../../../shared/functions/Token';

export default ({ uid, gender, setGender }) => {
  const [sex, setSex] = useState(gender);
  const [working, setWorking] = useState(false);
  const [edit, setEdit] = useState(false);
  function change() {
    setWorking(true);
    axios
      .put(`${BACKEND_URL}/edit/${uid}/gender`, { gender: sex }, { headers: adminHeader() })
      .then(() => {
        setGender(sex);
        setEdit(false);
        setWorking(false);
      })
      .catch((err) => {
        setWorking(false);
        throw err;
      });
  }
  function reset() {
    setSex(gender);
    setEdit(false);
  }
  return (
    <div className='form' style={{ display: 'flex', alignItems: 'center', padding: 10 }}>
      <FormControl fullWidth>
        <InputLabel id='gender'>Gender</InputLabel>
        <Select fullWidth labelId='gender' value={sex} onChange={(e) => setSex(e.target.value)} disabled={!edit || working}>
          <MenuItem value='Male'>Male</MenuItem>
          <MenuItem value='Female'>Female</MenuItem>
          <MenuItem value='Other'>Other</MenuItem>
        </Select>
      </FormControl>
      {edit ? (
        <IconButton color='primary' disabled={working} onClick={change}>
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
