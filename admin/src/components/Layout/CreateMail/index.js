import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import axios from 'axios';

import { BACKEND_URL } from '../../../shared/constants/Variables';
import { adminHeader } from '../../../shared/functions/Token';
import './style.scss';

export default ({ user, close }) => {
  const [username, setUsername] = useState(user || '');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [working, setWorking] = useState(false);
  const [response, setResponse] = useState('');
  function onSend() {
    setWorking(true);
    axios
      .post(`${BACKEND_URL}/mails`, { date: new Date().toISOString(), username, subject, message }, { headers: adminHeader() })
      .then(() => {
        setWorking(false);
        close();
      })
      .catch((er) => {
        setResponse(er.response?.data?.message || 'Something went wrong.');
        setWorking(false);
        throw er;
      });
  }
  return (
    <div className='cmpsb'>
      <div>
        <input
          type='text'
          placeholder='Username'
          value={username}
          autoComplete='off'
          autoFocus
          onChange={(e) => setUsername(e.target.value)}
        />
        <input placeholder='Subject' type='text' value={subject} autoComplete='off' onChange={(e) => setSubject(e.target.value)} />
        <textarea value={message} placeholder='Write...' onChange={(e) => setMessage(e.target.value)} rows={4} />
      </div>
      <div className='mbtns'>
        <div>
          <Button variant='contained' color='primary' onClick={onSend} disabled={working || !username || !subject || !message}>
            Send
          </Button>
        </div>
        <div>
          <Button variant='outlined' color='secondary' onClick={close} disabled={working}>
            Discard
          </Button>
        </div>
      </div>
      <Dialog open={!!response} onClose={() => setResponse('')} fullWidth maxWidth='sm'>
        <DialogTitle>Mail Status</DialogTitle>
        <DialogContent dividers>{response}</DialogContent>
        <DialogActions>
          <Button variant='contained' color='secondary' onClick={() => setResponse('')}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
