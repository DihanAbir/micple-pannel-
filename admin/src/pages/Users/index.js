/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, Suspense, lazy } from 'react';
import { Paper, Tabs, Tab, TextField, Select, FormControl, InputLabel, MenuItem, Button, Grid } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Link, withRouter, Route, Switch } from 'react-router-dom';
import { Pagination, Autocomplete } from '@material-ui/lab';
import DateFnsUtils from '@date-io/date-fns';
import { Delete } from '@material-ui/icons';
import axios from 'axios';

import { BACKEND_URL } from '../../shared/constants/Variables';
import { adminHeader } from '../../shared/functions/Token';
import { getUserAvatar } from '../../shared/functions';
import { Spinner, AuthGuard } from '../../shared';
import { getUserInfo, getUsers } from './Hooks';
import { UName } from '../../components/Tools';
import './style.scss';

const Profile = lazy(() => import('./Profile'));
const User = lazy(() => import('./User'));

function Users({ match: { url } }) {
  document.title = 'Users';
  const statusStates = ['all', 'approved', 'pending', 'banned', 'rejected', 'verified'];
  const [headerHight, setHeaderHight] = useState(0);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [input, setInput] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [country, setCountry] = useState('');
  const [status, setStatus] = useState('all');
  const [pageIndex, setPageIndex] = useState(1);
  const [updating, setUpdating] = useState(false);
  const { counts, countries } = getUserInfo();
  const { users, totalUsers, working } = getUsers(country, status, input, sortBy, start, end, pageIndex);
  function clearFilter() {
    setCountry('');
    setStart('');
    setEnd('');
    setInput('');
    setSortBy('');
  }
  function updateUserStatus(id, name, value) {
    setUpdating(true);
    axios
      .put(`${BACKEND_URL}/users/${id}/status`, { name, value }, { headers: adminHeader() })
      .then(() => {
        users.map((user) => {
          if (user.id === id) {
            user[name] = value;
          }
          return user;
        });
        setUpdating(false);
      })
      .catch((err) => {
        setUpdating(false);
        throw err;
      });
  }
  return (
    <div className='users'>
      <Switch>
        <Route exact path={url}>
          <div ref={(el) => setHeaderHight(el?.clientHeight)} className='header'>
            <Grid className='tabs'>
              <FormControl>
                <TextField label='User search' autoComplete='off' value={input} onChange={(e) => setInput(e.target.value)} />
              </FormControl>
              <FormControl>
                <InputLabel id='sortBy'>Sort By</InputLabel>
                <Select labelId='sortBy' value={sortBy} onChange={(e, data) => setSortBy(data.props.value)}>
                  <MenuItem value='a2z'>A-Z</MenuItem>
                  <MenuItem value='z2a'>Z-A</MenuItem>
                  <MenuItem value='oldest'>Oldest</MenuItem>
                  <MenuItem value='newest'>Newest</MenuItem>
                </Select>
              </FormControl>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid className='dbdt'>
                  <KeyboardDatePicker
                    variant='inline'
                    label='Start Date'
                    format='dd/MM/yyyy'
                    value={start || new Date()}
                    minDate={new Date('02-25-2020')}
                    maxDate={new Date()}
                    onChange={(date) => setStart(date)}
                  />
                  <KeyboardDatePicker
                    variant='inline'
                    label='End Date'
                    format='dd/MM/yyyy'
                    value={end || new Date()}
                    minDate={new Date('02-25-2020')}
                    maxDate={new Date()}
                    onChange={(date) => setEnd(date)}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <Autocomplete
                disabled={countries.length < 0}
                options={countries}
                getOptionLabel={(option) => option.name}
                onChange={(e, c) => setCountry(c.value)}
                debug
                renderInput={(params) => <TextField label='Country' {...params} value={country} />}
              />
              <Button size='small' variant='contained' color='secondary' startIcon={<Delete />} onClick={clearFilter}>
                Clear
              </Button>
            </Grid>
            <Paper square>
              <Tabs textColor='primary' onChange={(e, i) => setStatus(statusStates[i])} value={statusStates.indexOf(status)}>
                <Tab label={`All (${counts.total})`} />
                <Tab label={`Approved (${counts.approved})`} />
                <Tab label={`Pending (${counts.pending})`} />
                <Tab label={`Banned (${counts.banned})`} />
                <Tab label={`Rejected (${counts.rejected})`} />
                <Tab label={`Verified (${counts.verified})`} />
              </Tabs>
            </Paper>
          </div>
          <div style={{ height: `calc(100vh - ${headerHight}px)`, opacity: working || updating ? 0.5 : 1 }} className='YhdbS'>
            {users.length > 0 && !working ? (
              <ul className='user-list'>
                {users.map((user, i) => (
                  <li key={user.id}>
                    <div className='i profile'>
                      <img src={getUserAvatar(user.avatar, user.gender)} alt='' />
                      <div className='inf'>
                        <Link to={`${url}/user/${user.id}`}>
                          <h3>
                            <UName name={user.name} verified={user.verified} />
                          </h3>
                        </Link>
                        <p>
                          (<strong>{user.username}</strong>) - ({user.country})
                        </p>
                      </div>
                    </div>
                    <div className='i buttons'>
                      {!user.verified ? (
                        <Button
                          size='small'
                          variant='contained'
                          color='primary'
                          onClick={() => updateUserStatus(user.id, 'verified', true)}
                          disabled={updating}
                        >
                          Verified
                        </Button>
                      ) : (
                        <Button
                          size='small'
                          variant='contained'
                          color='primary'
                          onClick={() => updateUserStatus(user.id, 'verified', false)}
                          disabled={updating}
                        >
                          Unverified
                        </Button>
                      )}
                      {user.approved && !user.rejected && (
                        <Button
                          size='small'
                          variant='contained'
                          color={!user.banned ? 'secondary' : 'primary'}
                          onClick={() => updateUserStatus(user.id, 'banned', !user.banned)}
                          disabled={updating}
                        >
                          {user.banned ? 'Undo Ban' : 'Ban'}
                        </Button>
                      )}
                      {!user.approved && !user.rejected && (
                        <>
                          <Button
                            size='small'
                            variant='contained'
                            color='primary'
                            onClick={() => updateUserStatus(user.id, 'approved', true)}
                            disabled={updating}
                          >
                            Approve
                          </Button>
                          <Button
                            size='small'
                            variant='contained'
                            color='secondary'
                            onClick={() => updateUserStatus(user.id, 'rejected', !user.rejected)}
                            disabled={updating}
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
                          disabled={updating}
                        >
                          Undo Rejection
                        </Button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <>{!working && <h3 className='notfound'>No user found.</h3>}</>
            )}
            {working && <Spinner height={30} />}
            {users.length > 10 && (
              <div className='pgntn'>
                <Pagination
                  color='primary'
                  page={pageIndex}
                  onChange={(e, page) => setPageIndex(page)}
                  count={Math.round(totalUsers / 10)}
                />
              </div>
            )}
          </div>
        </Route>
        <Route
          path={`${url}/user/:userid`}
          component={() => (
            <Suspense fallback={<Spinner height={100} />}>
              <User updateUserStatus={updateUserStatus} />
            </Suspense>
          )}
        />
        <Route
          path={`${url}/profile/:username`}
          component={() => (
            <Suspense fallback={<Spinner height={100} />}>
              <Profile />
            </Suspense>
          )}
        />
      </Switch>
    </div>
  );
}

export default AuthGuard(withRouter(Users));
