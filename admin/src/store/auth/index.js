import { LOGIN, LOGOUT, AUTO_LOGIN } from './action';

export const initialState = {
  id: '',
  name: '',
  username: '',
  loggingIn: true,
  loggedIn: false,
  error: false,
};

const FULFILLED = '_FULFILLED';
const PENDING = '_PENDING';
const REJECTED = '_REJECTED';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN + PENDING:
      return {
        ...state,
        loggingIn: true,
      };
    case LOGIN + FULFILLED:
      return onLogin(state, payload);
    case LOGIN + REJECTED:
      return {
        ...state,
        loggingIn: false,
        error: true,
      };
    case LOGOUT + PENDING:
      localStorage.removeItem('exp');
      localStorage.removeItem('a');
      localStorage.removeItem('t');
      return initialState;
    case AUTO_LOGIN + PENDING:
      return {
        ...state,
        loggingIn: true,
      };
    case AUTO_LOGIN + FULFILLED:
      return onLogin(state, payload);
    case AUTO_LOGIN + REJECTED:
      return { ...state, error: true };
    case 'SET_AUTH':
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

function onLogin(state, { data: { admin, token } }) {
  localStorage.setItem('exp', Date.now() + 86400000);
  localStorage.setItem('t', token);
  localStorage.setItem('a', JSON.stringify(admin));
  return {
    ...state,
    ...admin,
    loggedIn: true,
    loggingIn: false,
  };
}
