import React, { useState } from 'react';
import { Divider, IconButton, CircularProgress } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { Close, Save, Edit } from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';

import { BACKEND_URL } from '../../../shared/constants/Variables';
import { adminHeader } from '../../../shared/functions/Token';

export default ({ uid, date, setDate }) => {
  const [dob, setDob] = useState(new Date(date));
  const [working, setWorking] = useState(false);
  const [edit, setEdit] = useState(false);
  function change() {
    setWorking(true);
    axios
      .put(`${BACKEND_URL}/edit/${uid}/dob`, { dob: new Date(dob).toISOString() }, { headers: adminHeader() })
      .then(() => {
        setDate(dob);
        setEdit(false);
        setWorking(false);
      })
      .catch((err) => {
        setWorking(false);
        throw err;
      });
  }
  function reset() {
    setDob(new Date(date));
    setEdit(false);
  }
  return (
    <div className='form' style={{ display: 'flex', alignItems: 'center', padding: 10 }}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          fullWidth
          variant='inline'
          format='dd/MM/yyyy'
          label='Date of Birth'
          value={dob}
          onChange={(d) => setDob(d)}
          disabled={!edit || working}
          maxDate={new Date(Date.now() - 568024668000)}
        />
      </MuiPickersUtilsProvider>
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
