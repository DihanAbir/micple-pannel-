import React, { useState } from 'react';
import { Divider, IconButton, TextField, CircularProgress } from '@material-ui/core';
import { Close, Save, Edit } from '@material-ui/icons';
import axios from 'axios';

import { BACKEND_URL } from '../../../shared/constants/Variables';
import { adminHeader } from '../../../shared/functions/Token';

export default ({ uid, identity, setIdentity }) => {
  const [nicnip, setNicnip] = useState(identity.nicnip);
  const [taxid, setTaxid] = useState(identity.taxid);
  const [working, setWorking] = useState(false);
  const [edit, setEdit] = useState(false);
  function change() {
    setWorking(true);
    const body = { nicnip: nicnip.trim(), taxid: taxid.trim() };
    axios
      .put(`${BACKEND_URL}/edit/${uid}/identity`, body, { headers: adminHeader() })
      .then(() => {
        setIdentity(body);
        setEdit(false);
        setWorking(false);
      })
      .catch((err) => {
        setWorking(false);
        throw err;
      });
  }
  function reset() {
    setNicnip(identity.nicnip);
    setTaxid(identity.taxid);
    setEdit(false);
  }
  return (
    <div className='form' style={{ padding: 10 }}>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, marginLeft: 10 }}>
          <TextField
            variant='filled'
            label='NIC/NPC Number'
            value={nicnip}
            onChange={(e) => setNicnip(e.target.value)}
            fullWidth
            disabled={!edit || working}
            margin='normal'
          />
        </div>
        <div style={{ flex: 1 }}>
          <TextField
            variant='filled'
            label='Tax Number'
            value={taxid}
            onChange={(e) => setTaxid(e.target.value)}
            fullWidth
            disabled={!edit || working}
            margin='normal'
          />
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginLeft: 10 }}>
          {edit ? (
            <IconButton color='primary' disabled={!nicnip || !taxid || working} onClick={change}>
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
      </div>
    </div>
  );
};
