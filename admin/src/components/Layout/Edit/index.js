import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, Zoom, TextField, Button, DialogActions } from '@material-ui/core';
import { connect } from 'react-redux';
import axios from 'axios';

import { BACKEND_URL } from '../../../shared/constants/Variables';
import { adminHeader } from '../../../shared/functions/Token';

function Edit({ open, close, auth, dispatch }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPass, setNewPass] = useState(false);
  const [pass, setPass] = useState('');
  const [cPass, setCPass] = useState('');
  const [working, setWorking] = useState(false);
  useEffect(() => {
    if (auth.username) {
      setUsername(auth.username);
    }
  }, [auth]);
  function passTest(p) {
    return p.length >= 8 || p.length <= 32;
  }
  function onSave() {
    setWorking(true);
    const body = {
      username,
      password,
    };
    if (pass) {
      body.newPassword = pass.trim();
      body.cNewPassword = cPass;
    }
    axios
      .put(`${BACKEND_URL}/admin/edit`, body, { headers: adminHeader() })
      .then(() => {
        setWorking(false);
        setPassword('');
        setCPass('');
        setPass('');
        setNewPass(false);
        setUsername(body.username);
        dispatch({ type: 'SET_AUTH', payload: { username: body.username } });
        localStorage.setItem('a', JSON.stringify({ ...JSON.parse(localStorage.getItem('a')), username: body.username }));
        close();
      })
      .catch((err) => {
        setWorking(false);
        setPassword('');
        throw err;
      });
  }
  function validate() {
    return working || !username || !passTest(username) || !passTest(password) || (!!pass ? pass !== cPass : false);
  }
  return (
    <Dialog open={open} TransitionComponent={Zoom} keepMounted onClose={close} fullWidth maxWidth='sm'>
      <DialogContent>
        <TextField
          label='Username'
          margin='normal'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          error={!passTest(username)}
        />
        <TextField
          label='Current Password'
          type='password'
          margin='normal'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        {newPass ? (
          <>
            <TextField
              label='New Password'
              type='password'
              margin='normal'
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              fullWidth
              error={!passTest(pass)}
            />
            <TextField
              label='Confirm New Password'
              type='password'
              margin='normal'
              value={cPass}
              onChange={(e) => setCPass(e.target.value)}
              fullWidth
              error={pass !== cPass || !passTest(cPass)}
            />
          </>
        ) : (
          <Button size='small' onClick={() => setNewPass(true)} variant='contained' color='secondary'>
            Set New Password
          </Button>
        )}
      </DialogContent>
      <DialogActions>
        <Button size='small' onClick={close} variant='outlined' color='secondary'>
          Close
        </Button>
        <Button size='small' onClick={onSave} variant='contained' color='primary' disabled={validate()}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect((store) => ({ auth: store.auth }))(Edit);
