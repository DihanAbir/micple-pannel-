import React, { useState, useEffect } from 'react';
import { makeStyles, Modal, Backdrop, Fade, Button } from '@material-ui/core';
import axios from 'axios';

import { BACKEND_URL } from '../../../../../shared/constants/Variables';
import { adminHeader } from '../../../../../shared/functions/Token';
import { Spinner } from '../../../../../shared';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },

  formControl: {
    margin: theme.spacing(1),
  },
}));

export default ({ open, close, id, username }) => {
  const classes = useStyles();
  const [working, setWorking] = useState(true);
  const [error, setError] = useState('');
  const [note, setNote] = useState({});
  useEffect(() => {
    if (!!id && !!username) {
      axios
        .get(`${BACKEND_URL}/profile/notes/${username}/${id}`, { headers: adminHeader() })
        .then(({ data }) => {
          setNote(data);
          setWorking(false);
        })
        .catch((err) => {
          setWorking(false);
          setError('Something went wrong.');
          throw err;
        });
    }
  }, [id, username]);
  return (
    <Modal
      className={classes.modal}
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={'about-yourself ' + classes.paper}>
          <h2 style={{ marginBottom: '20px' }} id='transition-modal-title'>
            My Notes
          </h2>
          {!working && !!error && <div style={{ textAlign: 'center' }}>{error}</div>}
          {working && !error ? (
            <Spinner height={30} />
          ) : (
            <>
              <div style={{ width: '300px !important', height: 'auto', wordWrap: 'break-word' }}>
                <label style={{ marginBottom: '10px' }}>
                  <b>Title</b>
                </label>
                <p>{note.title}</p>
              </div>

              <div style={{ width: '300px !important', height: 'auto', wordWrap: 'break-word' }}>
                <label style={{ marginBottom: '10px' }}>
                  <b>Notes:</b>
                </label>
                <p>{note.note}</p>
              </div>
            </>
          )}

          <div>
            <Button
              style={{ marginTop: '20px' }}
              onClick={() => {
                close();
                setNote({});
                setWorking(true);
                setError(null);
              }}
              variant='contained'
            >
              Cancel
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};
