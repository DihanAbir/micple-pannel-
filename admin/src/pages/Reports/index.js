import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemAvatar, Avatar, IconButton, Button, Menu, MenuItem, Fade } from '@material-ui/core';
import { Delete, Visibility } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { BACKEND_URL } from '../../shared/constants/Variables';
import { adminHeader } from '../../shared/functions/Token';
import { openMailCompose } from '../../store/site/action';
import { getUserAvatar } from '../../shared/functions';
import { HoverOver } from '../../components/Tools';
import { AuthGuard, Spinner } from '../../shared';
import { When } from '../../components';

function Reports({ history: { push }, dispatch }) {
  document.title = 'Reports';
  const [reports, setReports] = useState([]);
  const [working, setWorking] = useState(true);
  const [u1Menu, setU1Menu] = useState(null);
  const [u2Menu, setU2Menu] = useState(null);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/reports`, { headers: adminHeader() })
      .then(({ data }) => {
        setReports(data.reports);
        setWorking(false);
      })
      .catch((err) => {
        setWorking(false);
        throw err;
      });
  }, []);
  function onDelete(id) {
    axios
      .delete(`${BACKEND_URL}/reports/${id}`, { headers: adminHeader() })
      .then(() => {
        const updates = reports.filter((i) => i.id !== id);
        setReports(updates);
      })
      .catch((err) => {
        throw err;
      });
  }
  function makeAnswered(id) {
    axios
      .put(`${BACKEND_URL}/reports/${id}`, {}, { headers: adminHeader() })
      .then(() => {
        const updates = reports.map((i) => {
          if (i.id === id) {
            i.answered = true;
          }
          return i;
        });
        setReports(updates);
      })
      .catch((err) => {
        throw err;
      });
  }
  function openProfile(id) {
    setU1Menu(null);
    setU2Menu(null);
    push(`/users/user/${id}`);
  }
  function openMail(username) {
    setU1Menu(null);
    setU2Menu(null);
    dispatch(openMailCompose(username));
  }
  if (working && reports.length < 1) {
    if (working) {
      return <Spinner height={100} />;
    } else {
      return (
        <Typography component='h3' align='center' style={{ marginTop: 30 }}>
          No reports found.
        </Typography>
      );
    }
  } else {
    return (
      <div>
        <List>
          {reports.map((item) => (
            <ListItem key={item.id} style={{ borderBottom: '1px solid #ddd', backgroundColor: '#fff' }}>
              <ListItemAvatar>
                <Avatar src={getUserAvatar(item.from.avatar, item.from.gender)} alt='' />
              </ListItemAvatar>
              <div style={{ flex: '1 1 auto', marginRight: 10 }}>
                <p>
                  <strong>{`${item.from.username} reported '${item.title}' to ${item.to.username}`}</strong>
                </p>
                <p>
                  <small>
                    <strong>
                      <When date={item.date} />
                    </strong>
                  </small>
                </p>
                <p>{item.detail}</p>
              </div>
              <div style={{ display: 'flex' }}>
                <Button
                  size='small'
                  variant='outlined'
                  onClick={(_) => setU1Menu(_.currentTarget)}
                  style={{ textTransform: 'initial', fontSize: 14, marginRight: 5 }}
                >
                  {item.from.username}
                </Button>
                <Menu anchorEl={u1Menu} keepMounted open={!!u1Menu} onClose={() => setU1Menu(null)} TransitionComponent={Fade}>
                  <MenuItem onClick={() => openProfile(item.from.id)}>Open Profile</MenuItem>
                  <MenuItem onClick={() => openMail(item.from.username)}>Send A Mail</MenuItem>
                </Menu>

                <Button
                  size='small'
                  variant='outlined'
                  onClick={(_) => setU2Menu(_.currentTarget)}
                  style={{ textTransform: 'initial', fontSize: 14, marginRight: 5 }}
                >
                  {item.to.username}
                </Button>
                <Menu anchorEl={u2Menu} keepMounted open={!!u2Menu} onClose={() => setU2Menu(null)} TransitionComponent={Fade}>
                  <MenuItem onClick={() => openProfile(item.to.id)}>Open Profile</MenuItem>
                  <MenuItem onClick={() => openMail(item.to.username)}>Send A Mail</MenuItem>
                </Menu>

                <HoverOver title='Make answered'>
                  <IconButton hidden={!item.answered} onClick={() => makeAnswered(item.id)}>
                    <Visibility />
                  </IconButton>
                </HoverOver>
                <IconButton color='secondary' onClick={() => onDelete(item.id)}>
                  <Delete />
                </IconButton>
              </div>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default connect()(AuthGuard(withRouter(Reports)));
