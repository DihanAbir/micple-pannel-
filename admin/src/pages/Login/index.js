import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Container, Box, Scroll, Item, Input, Dollar, Spin } from './style';
import LoginCover from '../../assets/Cover.jpg';
import { login } from '../../store/auth/action';

function Login({ history, auth: { error, loggingIn, loggedIn }, dispatch }) {
  document.title = 'Login';
  const [value, setValue] = useState('');
  const [username, setUsername] = useState('');
  const [commands, setCommands] = useState([{ name: 'input' }]);
  useEffect(() => {
    if (loggedIn) {
      history.push(`/dashboard`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);
  useEffect(() => {
    if (error) {
      pushCommand('Invalid credentials.', 'text', true);
      setUsername('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);
  function pushCommand(msg = '', type = 'text', err = false) {
    const n = [{ name: 'input', type }];
    if (!!msg) {
      n.unshift({ name: 'msg', val: msg, err });
    }
    setValue('');
    setCommands([...commands, ...n]);
  }
  function onLogin(password) {
    if (!username && !password) {
      return;
    }
    dispatch(login(username, password));
  }
  function onEnter(e) {
    if (e.key === 'Enter') {
      if (value.substr(0, 5).toLocaleLowerCase() === 'clear') {
        setValue('');
        setCommands([{ name: 'input' }]);
      } else if (value.substr(0, 4).toLocaleLowerCase() === 'echo') {
        const msg = value.substr(5).trim();
        pushCommand(msg);
      } else if (!username) {
        setUsername(value);
        pushCommand(null, 'password');
      } else {
        onLogin(value);
      }
    }
  }
  return (
    <Container style={{ backgroundImage: `url(${LoginCover})` }}>
      <Box onClick={() => document.getElementById(`commandInput${commands.length - 1}`)?.focus()} onContextMenu={(e) => e.preventDefault()}>
        <Scroll>
          {commands.map(({ name, val, err, type = 'text' }, index) => {
            if (name === 'msg') {
              return (
                <Item className={err ? 'err' : ''} key={index}>
                  {val}
                </Item>
              );
            } else {
              return (
                <Item key={index}>
                  <Dollar>$</Dollar>
                  <Input
                    autoFocus
                    autoComplete='off'
                    value={commands.length - 1 === index && !loggingIn ? value : val}
                    onChange={(e) => (commands.length - 1 === index && !loggingIn ? setValue(e.target.value) : {})}
                    onPaste={(e) => e.preventDefault()}
                    onKeyPress={onEnter}
                    id={`commandInput${index}`}
                    disabled={commands.length - 1 !== index || loggingIn}
                    type={type}
                  />
                </Item>
              );
            }
          })}
          {loggingIn && (
            <Item>
              <Spin>
                <span>|</span>
              </Spin>
            </Item>
          )}
        </Scroll>
      </Box>
    </Container>
  );
}

export default connect((store) => ({ auth: store.auth }))(withRouter(Login));
