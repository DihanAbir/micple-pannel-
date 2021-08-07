import axios from 'axios';

import { BACKEND_URL } from '../../shared/constants/Variables';

export const AUTO_LOGIN = 'AUTO_LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN = 'LOGIN';

export function login(username, password) {
  return { type: LOGIN, payload: axios.post(`${BACKEND_URL}/auth/login`, { username, password }) };
}
export function logout() {
  return { type: LOGOUT, payload: axios.get(`${BACKEND_URL}/auth/logout`) };
}
export function auto() {
  const exp = parseInt(localStorage.getItem('exp'));
  const a = JSON.parse(localStorage.getItem('a'));
  const t = localStorage.getItem('t');
  if (exp && exp > Date.now() && a && t) {
    return { type: 'SET_AUTH', payload: { loggedIn: true, loggingIn: false, ...a } };
  } else {
    return { type: 'SET_AUTH', payload: { loggedIn: false, loggingIn: false } };
  }
}
