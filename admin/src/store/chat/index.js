import { OPEN_CHAT, CLOSE_CHAT, TOGGLE_CHAT, PUSH_CHAT_MESSAGE, PUSH_CHAT_ROOM, PUSH_OLD_ROOM } from './type';

const initState = [
  // {
  //   messages: [
  //     {
  //       id: m._id,
  //       client: m.client,
  //       message: m.message,
  //       date: m.date,
  //       image: doc.url,
  //     },
  //   ],
  //   id: doc._id,
  //   location: { city, country, lat: ll[0], lon: ll[1] },
  //   device: { browser, platform },
  //   date,
  //   admin: { id: null },
  //   user: {
  //     id: uroom.user._id,
  //     username: uroom.user.name,
  //     name: uroom.user.name,
  //     gender: uroom.user.gender,
  //     verified: uroom.user.verified,
  //     avatar: await getProfileAvatar(uroom.user._id, 50),
  //   },
  //   minimized: false,
  //   active: true
  // },
];

export default (state = initState, { type, payload }) => {
  switch (type) {
    case OPEN_CHAT:
      return state.map((chat) => {
        if (chat.id === payload) {
          if (!chat.messages) {
            chat.messages = [];
          }
          chat.active = true;
          chat.minimized = false;
        }
        return chat;
      });
    case CLOSE_CHAT:
      return state.map((chat) => {
        if (chat.id === payload) {
          chat.active = false;
          chat.minimized = false;
        }
        return chat;
      });
    case TOGGLE_CHAT:
      return state.map((chat) => {
        if (chat.id === payload) {
          chat.minimized = !chat.minimized;
        }
        return chat;
      });

    case PUSH_CHAT_ROOM:
      const rm = state.find((r) => r.id === payload.id);
      if (rm) {
        state.push({ ...rm, status: 'active', active: true, minimized: false });
      } else {
        state.push({ ...payload, status: 'active', active: true, minimized: false });
      }
      return [...state];
    // case MAKE_ROOM_ACTIVE:
    //   return state.map((chat) => {
    //     if (chat.id === payload) {
    //       chat.status = 'active';
    //     }
    //     return chat;
    //   });
    // case MAKE_ROOM_INACTIVE:
    //   return state.map((chat) => {
    //     if (chat.id === payload) {
    //       chat.status = new Date().toISOString();
    //     }
    //     return chat;
    //   });

    case PUSH_CHAT_MESSAGE:
      return state.map((chat) => {
        if (chat.id === payload.id) {
          let oldMsgs = [];
          const newMsgs = [];
          if (chat?.messages?.length > 0) {
            oldMsgs = chat.messages;
          }
          if (Array.isArray(payload.messages)) {
            for (const msg of payload.messages) {
              if (newMsgs.findIndex((m) => m.id === msg.id) === -1) {
                newMsgs.push(msg);
              }
            }
          } else {
            newMsgs.push(payload.messages);
          }
          const orMsgs = [];
          for (const msg of [...oldMsgs, ...newMsgs]) {
            if (orMsgs.findIndex((m) => m.id === msg.id) === -1) {
              orMsgs.push(msg);
            }
          }
          chat.messages = orMsgs;
          chat.active = true;
        }
        return chat;
      });
    case PUSH_OLD_ROOM:
      const old = state.find((i) => i.id === payload.id);
      if (!old) {
        return [...state, { ...payload, status: 'active', active: true, minimized: false }];
      }
      return state.map((i) => {
        if (i.id === payload.id) {
          i = {
            ...i,
            active: true,
            minimized: false,
          };
        }
        return i;
      });
    default:
      return state;
  }
};
