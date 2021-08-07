import React, { lazy, Suspense } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { connect } from 'react-redux';

import { Spinner } from '../../../shared';
import { getProfile } from './Hooks';
import { UserError } from './style';
import Cover from './Cover';
import './style.scss';

const Timeline = lazy(() => import('./Timeline'));
const About = lazy(() => import('./About'));
const Audios = lazy(() => import('./Audios'));
const Friends = lazy(() => import('./Friends'));
const Photos = lazy(() => import('./Photos'));
const Groups = lazy(() => import('./Groups'));
const Videos = lazy(() => import('./Videos'));
const Notes = lazy(() => import('./Notes'));

function Profile({
  match: {
    url,
    params: { username },
  },
}) {
  const { profile, working, error } = getProfile(username);
  document.title = profile?.name?.join(' ') || 'Profile';
  if (working || !!error) {
    if (!!error) {
      return (
        <UserError>
          <Alert severity='error'>
            <Typography color='error' variant='h5'>
              {error}
            </Typography>
          </Alert>
        </UserError>
      );
    } else {
      return <Spinner height={100} />;
    }
  } else {
    return (
      <div style={{ margin: '0 auto' }}>
        <Cover profile={profile} />
        <div className='UserContent'>
          <Route exact path={`${url}`}>
            <Redirect to={`${url}/timeline`} />
          </Route>
          <Route
            path={`${url}/timeline`}
            component={() => (
              <Suspense fallback={<Spinner height={60} />}>
                <Timeline name={profile.name} username={username} />
              </Suspense>
            )}
          />
          <Route
            path={`${url}/about`}
            component={() => (
              <Suspense fallback={<Spinner height={60} />}>
                <About name={profile.name} username={username} privacy={profile?.locker?.about} />
              </Suspense>
            )}
          />
          <Route
            path={`${url}/friends`}
            component={() => (
              <Suspense fallback={<Spinner height={60} />}>
                <Friends name={profile.name} username={username} privacy={profile?.locker?.friends} />
              </Suspense>
            )}
          />
          <Route
            path={`${url}/photos`}
            component={() => (
              <Suspense fallback={<Spinner height={60} />}>
                <Photos name={profile.name} username={username} privacy={profile?.locker?.photos} />
              </Suspense>
            )}
          />
          <Route
            path={`${url}/audios`}
            component={() => (
              <Suspense fallback={<Spinner height={60} />}>
                <Audios name={profile.name} username={username} privacy={profile?.locker?.audios} />
              </Suspense>
            )}
          />
          <Route
            path={`${url}/videos`}
            component={() => (
              <Suspense fallback={<Spinner height={60} />}>
                <Videos name={profile.name} username={username} privacy={profile?.locker?.videos} />
              </Suspense>
            )}
          />
          <Route
            path={`${url}/groups`}
            component={() => (
              <Suspense fallback={<Spinner height={60} />}>
                <Groups name={profile.name} username={username} privacy={profile?.locker?.groups} />
              </Suspense>
            )}
          />
          <Route
            path={`${url}/notes`}
            component={() => (
              <Suspense fallback={<Spinner height={60} />}>
                <Notes name={profile.name} username={username} privacy={profile?.locker?.notes} />
              </Suspense>
            )}
          />
        </div>
      </div>
    );
  }
}

export default connect((store) => ({ auth: store.auth }))(withRouter(Profile));
