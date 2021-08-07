import React, { useState, useEffect } from 'react';
import { Button, IconButton, InputBase, Typography, Divider } from '@material-ui/core';
import { Check, Close, Visibility, VisibilityOff, Delete } from '@material-ui/icons';
import { withRouter, Link } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import axios from 'axios';

import { BACKEND_URL } from '../../../shared/constants/Variables';
import { PASSWORD_REGEX } from '../../../shared/constants/RegEx';
import { adminHeader } from '../../../shared/functions/Token';
import { getUserAvatar } from '../../../shared/functions';
import { UName } from '../../../components/Tools';
import { Spinner } from '../../../shared';
import { getUser } from '../Hooks';
import './style.scss';

import Location from './Location';
import Username from './Username';
import Identity from './Identity';
import Parents from './Parents';
import Gender from './Gender';
import Remove from './Delete';
import Phone from './Phone';
import Name from './Name';
import Dob from './Dob';

function User({
  match: {
    params: { userid },
  },
  updateUserStatus,
  history,
}) {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [cNewPassword, setCNewPassword] = useState('');
  const [changing, setChanging] = useState(false);
  const [response, setResponse] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showDel, setShowDel] = useState(false);
  const { user, working, setUser } = getUser(userid);
  document.title = user?.name?.join(' ') || 'User';
  useEffect(() => {
    if (user.password) {
      setPassword(user.password);
    }
  }, [user.password]);
  function changePassword() {
    setChanging(true);
    axios
      .put(`${BACKEND_URL}/users/${userid}/password`, { password, newPassword, confirmPassword: cNewPassword }, { headers: adminHeader() })
      .then(() => {
        setResponse('Password has been changed.');
        setUser({
          ...user,
          password,
        });
        setNewPassword('');
        setCNewPassword('');
        setChanging(false);
      })
      .catch((err) => {
        setResponse(err?.response?.data?.message || 'Something went wrong.');
        setChanging(false);
        throw err;
      });
  }
  function onResetPass() {
    setPassword(user?.password || '');
    setNewPassword('');
    setCNewPassword();
  }
  if (user.name?.length < 1 || working) {
    if (working) {
      return <Spinner height={100} />;
    } else {
      return (
        <div className='not-found'>
          <h1>No user found with id: {userid}</h1>
        </div>
      );
    }
  } else {
    return (
      <div className='usrbd'>
        <div id={user.id} className='inusr'>
          <div className='i profile'>
            <img src={getUserAvatar(user.avatar, user.gender)} alt='' />
            <div className='inf'>
              <Link to={`/users/profile/${user.username}`}>
                <h3>
                  <UName name={user.name} verified={user.verified} />
                </h3>
              </Link>
              <p>{user.username}</p>
            </div>
          </div>
          <div className='i buttons'>
            <div style={{ padding: '0 10px', marginRight: 10, display: 'flex', alignItems: 'center', border: '1px solid #0002' }}>
              <InputBase
                placeholder='Current'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={changing}
                type={showPass ? 'text' : 'password'}
              />
              <IconButton onClick={() => setShowPass(!showPass)}>{showPass ? <VisibilityOff /> : <Visibility />}</IconButton>
              <InputBase
                placeholder='New'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={changing}
                type={showNew ? 'text' : 'password'}
              />
              <IconButton onClick={() => setShowNew(!showNew)}>{showNew ? <VisibilityOff /> : <Visibility />}</IconButton>
              <InputBase
                placeholder='Confirm'
                value={cNewPassword}
                onChange={(e) => setCNewPassword(e.target.value)}
                disabled={changing}
                type='password'
              />
              <IconButton
                type='submit'
                onClick={changePassword}
                color='primary'
                disabled={
                  changing || !PASSWORD_REGEX.test(password) || !PASSWORD_REGEX.test(newPassword) || !PASSWORD_REGEX.test(cNewPassword)
                }
              >
                <Check />
              </IconButton>
              <Divider orientation='vertical' style={{ height: 20 }} />
              <IconButton type='button' onClick={onResetPass}>
                <Close />
              </IconButton>
            </div>

            {user.approved && !user.rejected && (
              <Button
                size='small'
                variant='contained'
                color={!user.banned ? 'secondary' : 'primary'}
                onClick={() => updateUserStatus(user.id, 'banned', !user.banned)}
              >
                {user.banned ? 'Undo Ban' : 'Ban'}
              </Button>
            )}
            {!user.approved && !user.rejected && (
              <>
                <Button size='small' variant='contained' color='primary' onClick={() => updateUserStatus(user.id, 'approved', true)}>
                  Approve
                </Button>
                <Button
                  size='small'
                  variant='contained'
                  color='secondary'
                  onClick={() => updateUserStatus(user.id, 'rejected', !user.rejected)}
                >
                  Reject
                </Button>
              </>
            )}
            {user.rejected && (
              <Button
                size='small'
                variant='contained'
                color='primary'
                onClick={() => updateUserStatus(user.id, 'rejected', !user.rejected)}
              >
                Undo Rejection
              </Button>
            )}
            <IconButton color='secondary' onClick={() => setShowDel(true)}>
              <Delete />
            </IconButton>
          </div>
        </div>
        <Remove
          open={showDel}
          close={() => setShowDel(false)}
          uid={user.id}
          name={user.name}
          username={user.username}
          deleteUser={() => {
            history.goBack();
          }}
        />
        {!!response && <Alert severity='error'>{response}</Alert>}
        <div className='main'>
          <Typography component='h2' variant='h5' style={{ margin: '10px 0', color: '#555' }} align='center'>
            Personal Information
          </Typography>

          <div style={{ display: 'flex', margin: '20px 10px' }}>
            <Name
              uid={user.id}
              name={user.name}
              setName={(name) => {
                setUser({ ...user, name });
              }}
            />
          </div>

          <div style={{ display: 'flex', margin: '20px 10px' }}>
            <Parents
              uid={user.id}
              parents={user.parents}
              setParents={(parents) => {
                setUser({ ...user, parents });
              }}
            />
          </div>

          <div style={{ display: 'flex', margin: '20px 10px' }}>
            <div style={{ flex: 1, marginLeft: 14 }}>
              <Dob uid={user.id} date={user.dob} setDate={(dob) => setUser({ ...user, dob })} />
            </div>
            <div style={{ flex: 1, marginRight: 14 }}>
              <Gender uid={user.id} gender={user.gender} setGender={(gender) => setUser({ ...user, gender })} />
            </div>
          </div>

          <Typography component='h2' variant='h5' style={{ margin: '10px 0', color: '#555' }} align='center'>
            Residence Information
          </Typography>

          <div style={{ display: 'flex', margin: '20px 10px' }}>
            <Location uid={user.id} location={user.location} setLocation={(location) => setUser({ ...user, location })} />
          </div>

          <Typography component='h2' variant='h5' style={{ margin: '10px 0', color: '#555' }} align='center'>
            National Information
          </Typography>

          <div style={{ display: 'flex', margin: '20px 10px' }}>
            <Identity uid={user.id} identity={user.identity} setIdentity={(identity) => setUser({ ...user, identity })} />
          </div>

          <Typography component='h2' variant='h5' style={{ margin: '10px 0', color: '#555' }} align='center'>
            User Information
          </Typography>

          <div style={{ display: 'flex', margin: '20px 10px' }}>
            <div style={{ flex: 1, marginLeft: 14 }}>
              <Username uid={user.id} username={user.username} setUsername={(username) => setUser({ ...user, username })} />
            </div>
            <div style={{ flex: 1, marginRight: 14 }}>
              <Phone uid={user.id} phone={user.phone} setPhone={(phone) => setUser({ ...user, phone })} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(User);
