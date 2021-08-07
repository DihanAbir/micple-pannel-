import io from 'socket.io-client';

import { pushCounts, pullCounts, updateCounts } from '../store/site/action';
import store from '../store';

const socket = io(process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:2100' : 'https://panel.micple.com', {
  query: { token: localStorage.getItem('t') },
});

socket.on('update_count', (payload) => {
  store.dispatch(updateCounts(payload));
});
socket.on('add_new_count', (payload) => {
  store.dispatch(pushCounts(payload));
});
socket.on('remove_count', (payload) => {
  store.dispatch(pullCounts(payload));
});

export default socket;
