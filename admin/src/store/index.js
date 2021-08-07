import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import promise from 'redux-promise-middleware';

import site from './site';
import auth from './auth';
import chat from './chat';

const history = createBrowserHistory();

export default createStore(
  combineReducers({
    auth,
    chat,
    site,
    router: connectRouter(history),
  }),
  compose(applyMiddleware(promise))
);
