import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import { auto } from './store/auth/action';
import { Layout } from './components';
import { Spinner } from './shared';
import store from './store';

const Management = lazy(() => import('./pages/Management'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Messages = lazy(() => import('./pages/Messages'));
const Sponsors = lazy(() => import('./pages/Sponsors'));
const Updates = lazy(() => import('./pages/Updates'));
const Reports = lazy(() => import('./pages/Reports'));
const Calling = lazy(() => import('./pages/Calling'));
const Mails = lazy(() => import('./pages/Mails'));
const Users = lazy(() => import('./pages/Users'));
const Trash = lazy(() => import('./pages/Trash'));
const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));

export default () => {
  useEffect(() => {
    store.dispatch(auto());
    // eslint-disable-next-line
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path='/'
            component={() => (
              <Suspense fallback={<Spinner height={100} />}>
                <Home />
              </Suspense>
            )}
          />
          <Route
            path='/login'
            component={() => (
              <Suspense fallback={<Spinner height={100} />}>
                <Login />
              </Suspense>
            )}
          />
          <Layout>
            <Switch>
              <Route
                path='/dashboard'
                component={() => (
                  <Suspense fallback={<Spinner height={100} />}>
                    <Dashboard />
                  </Suspense>
                )}
              />
              <Route
                path='/monitoring'
                component={() => (
                  <Suspense fallback={<Spinner height={100} />}>
                    <Management />
                  </Suspense>
                )}
              />
              <Route
                path='/calling'
                component={() => (
                  <Suspense fallback={<Spinner height={100} />}>
                    <Calling />
                  </Suspense>
                )}
              />
              <Route
                path='/messages'
                component={() => (
                  <Suspense fallback={<Spinner height={100} />}>
                    <Messages />
                  </Suspense>
                )}
              />
              <Route
                path='/mails'
                component={() => (
                  <Suspense fallback={<Spinner height={100} />}>
                    <Mails />
                  </Suspense>
                )}
              />
              <Route
                path='/users'
                component={() => (
                  <Suspense fallback={<Spinner height={100} />}>
                    <Users />
                  </Suspense>
                )}
              />
              <Route
                path='/updates'
                component={() => (
                  <Suspense fallback={<Spinner height={100} />}>
                    <Updates />
                  </Suspense>
                )}
              />
              <Route
                path='/sponsors'
                component={() => (
                  <Suspense fallback={<Spinner height={100} />}>
                    <Sponsors />
                  </Suspense>
                )}
              />
              <Route
                path='/reports'
                component={() => (
                  <Suspense fallback={<Spinner height={100} />}>
                    <Reports />
                  </Suspense>
                )}
              />
              <Route
                path='/trash'
                component={() => (
                  <Suspense fallback={<Spinner height={100} />}>
                    <Trash />
                  </Suspense>
                )}
              />
              <Route>
                <Redirect to='/' />
              </Route>
            </Switch>
          </Layout>
          <Route>
            <Redirect to='/' />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};
