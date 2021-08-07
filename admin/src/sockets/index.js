import io from 'socket.io-client';

import { pushRoom, pushMessage } from '../store/chat/action';
import { ringReceivedAlerm } from '../store/site/action';
import store from '../store';

const socket = io(process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:2000' : 'https://www.micple.com', {
  query: { atoken: localStorage.getItem('t') },
});

socket.on('new_user_joined_live_chat', (room) => {
  store.dispatch(pushRoom(room));
  store.dispatch(ringReceivedAlerm());
});
socket.on('push_support_message', ({ id, message }) => {
  store.dispatch(pushMessage(id, message));
  if (message.client) {
    store.dispatch(ringReceivedAlerm());
  }
});

socket.on('new_support_mail_arrived', (mail) => {
  // todo
});

export default socket;
