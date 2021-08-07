import {
  OPEN_MAIL_COMPOSE,
  CLOSE_MAIL_COMPOSE,
  FETCH_COUNTS,
  PUSH_COUNTS,
  PULL_COUNTS,
  UPDATE_COUNTS,
  SENT_ALERM,
  RECEIVED_ALERM,
} from './type';

const initialState = {
  counts: {
    users: new Set(),
    messages: new Set(),
    reports: new Set(),
    mails: new Set(),
  },
  mail: {
    address: '',
    compose: false,
  },
  alerm: {
    sent: 0,
    received: 0,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_COUNTS:
      return {
        ...state,
        counts: {
          mails: new Set(payload.mails),
          messages: new Set(payload.messages),
          reports: new Set(payload.reports),
          users: new Set(payload.users),
        },
      };
    case UPDATE_COUNTS:
      return {
        ...state,
        counts: {
          ...state.counts,
          [payload.name]: new Set(payload.ids),
        },
      };
    case PUSH_COUNTS:
      state.counts[payload.name].add(payload.id);
      return state;
    case PULL_COUNTS:
      state.counts[payload.name].delete(payload.id);
      return state;
    case OPEN_MAIL_COMPOSE:
      return {
        ...state,
        mail: {
          address: payload,
          compose: true,
        },
      };
    case CLOSE_MAIL_COMPOSE:
      return {
        ...state,
        mail: {
          address: '',
          compose: false,
        },
      };
    case SENT_ALERM:
      return {
        ...state,
        alerm: {
          ...state.alerm,
          sent: Date.now(),
        },
      };
    case RECEIVED_ALERM:
      return {
        ...state,
        alerm: {
          ...state.alerm,
          received: Date.now(),
        },
      };
    case 'SET_SITE':
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
