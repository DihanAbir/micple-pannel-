import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Switch,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import axios from 'axios';

import { BACKEND_URL } from '../../../shared/constants/Variables';
import { adminHeader } from '../../../shared/functions/Token';
import { Spinner } from '../../../shared';
import { When } from '../../../components';

export default ({ close, setNotice, setDelete }) => {
  const [notices, setNotices] = useState([]);
  const [working, setWorking] = useState(true);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/notice/all`, { headers: adminHeader() })
      .then(({ data }) => {
        setNotices(data);
        setWorking(false);
      })
      .catch((err) => {
        setWorking(false);
        throw err;
      });
    return () => {
      setNotices([]);
    };
  }, []);
  function onEdit(id, show) {
    axios
      .put(`${BACKEND_URL}/notice/${id}`, { show }, { headers: adminHeader() })
      .then(() => {
        const update = notices.map((i) => {
          if (i.id === id) {
            i = {
              ...i,
              show,
            };
          }
          if (show && i.id !== id) {
            i = {
              ...i,
              show: false,
            };
          }
          return i;
        });
        setNotices(update);
        if (show) {
          setNotice(notices.find((i) => i.id === id));
        }
      })
      .catch((err) => {
        throw err;
      });
  }
  function onDelete(id) {
    axios
      .delete(`${BACKEND_URL}/notice/${id}`, { headers: adminHeader() })
      .then(() => {
        const update = notices.filter((i) => i.id !== id);
        setNotices(update);
        setDelete(id);
      })
      .catch((err) => {
        throw err;
      });
  }
  return (
    <Dialog open onClose={close} fullWidth maxWidth='md'>
      <DialogTitle>
        <strong>Notice History</strong>
      </DialogTitle>
      <DialogContent dividers>
        {working ? (
          <Spinner height={20} />
        ) : (
          <List>
            {notices.map((i) => (
              <ListItem key={i.id} style={{ backgroundColor: '#eee', borderBottom: '1px solid #ccc' }}>
                <ListItemText primary={i.title} secondary={<When date={i.date} />} />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Switch checked={i.show} onChange={() => onEdit(i.id, !i.show)} />
                  <IconButton onClick={() => onDelete(i.id)}>
                    <Delete />
                  </IconButton>
                </div>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button size='small' variant='outlined' color='secondary' onClick={close}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
