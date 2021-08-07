import React, { useState } from 'react';
import { Divider, IconButton, TextField, CircularProgress } from '@material-ui/core';
import { Close, Save, Edit } from '@material-ui/icons';
import axios from 'axios';

import { BACKEND_URL } from '../../../shared/constants/Variables';
import { adminHeader } from '../../../shared/functions/Token';

export default ({ uid, location, setLocation }) => {
  const [address, setAddress] = useState(location.address);
  const [city, setCity] = useState(location.city);
  const [state, setState] = useState(location.state);
  const [zip, setZip] = useState(location.zip);
  const [country, setCountry] = useState(location.country);
  const [working, setWorking] = useState(false);
  const [edit, setEdit] = useState(false);
  function change() {
    setWorking(true);
    const body = { address: address.trim(), city: city.trim(), state: state.trim(), country: country.trim(), zip: zip.trim() };
    axios
      .put(`${BACKEND_URL}/edit/${uid}/location`, body, { headers: adminHeader() })
      .then(() => {
        setLocation(body);
        setEdit(false);
        setWorking(false);
      })
      .catch((err) => {
        setWorking(false);
        throw err;
      });
  }
  function reset() {
    setAddress(location.address);
    setCity(location.city);
    setState(location.state);
    setZip(location.zip);
    setCountry(location.country);
    setEdit(false);
  }
  return (
    <div className='form' style={{ padding: 10 }}>
      <div style={{ display: 'flex' }}>
        <TextField
          variant='filled'
          label='Address'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
          disabled={!edit || working}
          margin='normal'
        />
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, marginRight: 10 }}>
          <TextField
            variant='filled'
            label='City'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            disabled={!edit || working}
            margin='normal'
          />
        </div>
        <div style={{ flex: 1, marginLeft: 10 }}>
          <TextField
            variant='filled'
            label='State'
            value={state}
            onChange={(e) => setState(e.target.value)}
            fullWidth
            disabled={!edit || working}
            margin='normal'
          />
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, marginRight: 10 }}>
          <TextField
            variant='filled'
            label='Zip'
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            fullWidth
            disabled={!edit}
            margin='normal'
          />
        </div>
        <div style={{ flex: 1, marginLeft: 10 }}>
          <TextField
            variant='filled'
            label='Country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            fullWidth
            disabled={!edit || working}
            margin='normal'
          />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: 10 }}>
        {edit ? (
          <IconButton color='primary' disabled={!address || !city || !state || !zip || !country || working} onClick={change}>
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
  );
};
