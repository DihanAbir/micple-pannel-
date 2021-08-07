import {
  FETCH_COUNTS,
  PUSH_COUNTS,
  PULL_COUNTS,
  OPEN_MAIL_COMPOSE,
  CLOSE_MAIL_COMPOSE,
  UPDATE_COUNTS,
  SENT_ALERM,
  RECEIVED_ALERM,
} from './type';

export function fetchCounts(payload) {
  return { type: FETCH_COUNTS, payload };
}
export function updateCounts(payload) {
  return { type: UPDATE_COUNTS, payload };
}
export function pushCounts(payload) {
  return { type: PUSH_COUNTS, payload };
}
export function pullCounts(payload) {
  return { type: PULL_COUNTS, payload };
}
export function openMailCompose(payload = '') {
  return {
    type: OPEN_MAIL_COMPOSE,
    payload,
  };
}
export function closeMailCompose() {
  return {
    type: CLOSE_MAIL_COMPOSE,
  };
}
export function ringReceivedAlerm() {
  return { type: RECEIVED_ALERM };
}
export function ringSentAlerm() {
  return { type: SENT_ALERM };
}
