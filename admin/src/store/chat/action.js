import {
  OPEN_CHAT,
  CLOSE_CHAT,
  TOGGLE_CHAT,
  PUSH_CHAT_MESSAGE,
  PUSH_CHAT_ROOM,
  MAKE_ROOM_ACTIVE,
  MAKE_ROOM_INACTIVE,
  PUSH_OLD_ROOM,
} from './type';

export function openChat(id) {
  return { type: OPEN_CHAT, payload: id };
}
export function closeChat(id) {
  return { type: CLOSE_CHAT, payload: id };
}
export function toggleChat(id) {
  return { type: TOGGLE_CHAT, payload: id };
}

export function pushRoom(payload) {
  return { type: PUSH_CHAT_ROOM, payload };
}
export function pushMessage(id, messages) {
  return { type: PUSH_CHAT_MESSAGE, payload: { id, messages } };
}
export function makeActive(roomId) {
  return { type: MAKE_ROOM_ACTIVE, payload: roomId };
}
export function makeInactive(roomId) {
  return { type: MAKE_ROOM_INACTIVE, payload: roomId };
}
export function pushOldRoom(payload) {
  return { type: PUSH_OLD_ROOM, payload };
}
