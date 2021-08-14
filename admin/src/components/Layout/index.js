import React, { useState, useEffect, useRef } from 'react';
import { Menu, ButtonGroup, Button, MenuItem, Badge } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { ChatusReceived, ChatusSend } from '../../assets/sounds';
import { BACKEND_URL } from '../../shared/constants/Variables';
import { Left, Profile, Nav, Body, Container } from './style';
import { adminHeader } from '../../shared/functions/Token';
import { fetchCounts, closeMailCompose } from '../../store/site/action';
import { logout } from '../../store/auth/action';
import AdminImg from '../../assets/Admin.png';
import socket1 from '../../sockets/socket';
import socket0 from '../../sockets';
import Compose from './CreateMail';
import Edit from './Edit';

function Indicator({ children, count }) {
  return (
    <Badge badgeContent={count} color={count > 0 ? 'secondary' : 'default'}>
      {children}
    </Badge>
  );
}

socket0.connect();
socket1.connect();

function Layout({
  auth: { name, username },
  site: {
    counts,
    alerm,
    mail: { address, compose },
  },
  dispatch,
  children,
}) {
  const [edit, setEdit] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  let receivedAudio = useRef();
  let sentAudio = useRef();
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/admin/counts`, { headers: adminHeader() })
      .then(({ data }) => {
        dispatch(fetchCounts(data));
      })
      .catch((err) => {
        throw err;
      });
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (!!alerm.sent) {
      sentAudio.play();
    }
  }, [alerm.sent]);
  useEffect(() => {
    if (!!alerm.received) {
      receivedAudio.play();
    }
  }, [alerm.received]);
  function onOpenEdit() {
    setAnchorEl(null);
    setEdit(true);
  }
  function onLogout() {
    setAnchorEl(null);
    dispatch(logout());
    window.location.assign('/');
  }
  return (
    <Container>
      <Left>
        <Profile>
          <h2>{name}</h2>
          <img alt={username} src={AdminImg} />
          <div>
            <ButtonGroup color='primary' variant='outlined'>
              <Button style={{ fontSize: 14, textTransform: 'lowercase' }}>{username}</Button>
              <Button style={{ fontSize: 14 }} onClick={(_) => setAnchorEl(_.currentTarget)}>
                <ArrowDropDown />
              </Button>
            </ButtonGroup>
          </div>

          <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={onOpenEdit}>Settings</MenuItem>
            <MenuItem onClick={onLogout}>Logout</MenuItem>
          </Menu>
        </Profile>
        <Nav>
          <NavLink exact to='/dashboard'>
            Dashboard
          </NavLink>
          <NavLink to='/updates'>Updates</NavLink>
          <NavLink to='/users'>
            <Indicator count={counts.users.size}>Users</Indicator>
          </NavLink>
          <NavLink to='/messages'>
            <Indicator count={counts.messages.size}>Live</Indicator>
          </NavLink>
          <NavLink to='/calling'>Calling</NavLink>
          <NavLink to='/mails'>
            <Indicator count={counts.mails.size}>Mail</Indicator>
          </NavLink>
          {/* <NavLink to='/monitoring'>Monitoring</NavLink> */}
          <NavLink to='/sponsors'>Ads</NavLink>
          <NavLink to='/reports'>
            <Indicator count={counts.reports.size}>Reports</Indicator>
          </NavLink>
          <NavLink to='/trash'>Bin</NavLink>
        </Nav>
      </Left>
      <Body>{children}</Body>
      <Edit user={username} open={edit} close={() => setEdit(false)} />
      <audio src={ChatusReceived} ref={(ref) => (receivedAudio = ref)} />
      <audio src={ChatusSend} ref={(ref) => (sentAudio = ref)} />
      {compose && <Compose user={address} close={() => dispatch(closeMailCompose())} />}
    </Container>
  );
}

export default connect((store) => ({ auth: store.auth, site: store.site }))(Layout);
