import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

function Sponsor({
  match: {
    params: { sponsorid },
  },
  history: { goBack },
}) {
  return (
    <Dialog open fullWidth maxWidth='md' onClose={goBack}>
      <DialogTitle>
        <strong>Post ID {sponsorid}</strong>
      </DialogTitle>
      <DialogContent dividers>
        <div>
          <Button size='small' variant='contained' color='primary'>
            Post Preview
          </Button>
        </div>
        <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <p style={{ flex: 1 }}>Views 120 of 250</p>
          <p style={{ flex: 1 }}>Expire 24 Sep / 30 Sep</p>
          <p style={{ flex: 1 }}>Budget $100</p>
        </div>
        <div>
          <img style={{ width: '100%' }} src='https://miro.medium.com/max/720/0*UjBJ_iTNESi6Zevk.jpg' alt='example' />
        </div>
        <div style={{ margin: '20px 0' }}>Tnx ID: iojnawkjldnailwnakefjniaufnakefnkajn</div>
        <div>Some description of the sponsorship</div>
      </DialogContent>
      <DialogActions>
        <Button size='small' variant='contained' color='primary'>
          Activate
        </Button>
        <Button size='small' variant='outlined' color='primary'>
          Deactivate
        </Button>
        <span style={{ flex: '1 1 auto' }} />
        <Button size='small' variant='contained' color='secondary'>
          Delete
        </Button>
        <Button size='small' variant='outlined' color='secondary' onClick={goBack}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withRouter(Sponsor);
