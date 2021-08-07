import React, { useState } from 'react';
import { Modal, Fade, Backdrop, makeStyles, createStyles, Card, CardHeader, CardContent, CardActions, Button, TextField } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      boxShadow: '0 0 10px #fff',
      minWidth: '200px',
      width: '60%',
    },
    input: {
      width: '100%',
    },
  })
);

export default ({ open, close, content, onSave }) => {
  const classes = useStyles();
  const [input, setInput] = useState(content || '');
  function onSubmit() {
    const value = input.trim();
    if (!!value) {
      onSave(input);
    }
  }
  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={classes.modal}
      open={open}
      onClose={close}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Card>
            <CardHeader title='Edit Post' />
            <CardContent>
              <TextField
                className={classes.input}
                label='New content'
                multiline
                rows={4}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                variant='outlined'
              />
            </CardContent>
            <CardActions>
              <Button variant='outlined' color='secondary' onClick={close}>
                Cancel
              </Button>
              <Button variant='contained' color='primary' onClick={onSubmit} disabled={content === input}>
                Save
              </Button>
            </CardActions>
          </Card>
        </div>
      </Fade>
    </Modal>
  );
};
