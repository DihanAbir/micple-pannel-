import { ringSentAlerm } from '../store/site/action';
import store from '../store';
import socket from '.';

export function pushSupportMsg(roomId, input) {
  socket.emit('push_support_message', {
    roomId: roomId,
    client: false,
    message: input,
    date: new Date().toISOString(),
  });
  store.dispatch(ringSentAlerm());
}
export function joinSupportChat(roomId, message) {
  socket.emit('user_join_support_chat', { date: new Date().toISOString(), client: false, message, roomId });
  store.dispatch(ringSentAlerm());
}
