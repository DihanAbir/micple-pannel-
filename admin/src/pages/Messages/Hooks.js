/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import axios from 'axios';

import { BACKEND_URL } from '../../shared/constants/Variables';
import { adminHeader } from '../../shared/functions/Token';

export function getMsgInfo() {
  const [counts, setCounts] = useState({
    total: 0,
    unseen: 0,
    seen: 0,
    users: 0,
    guests: 0,
  });
  useEffect(() => {
    let cancel;
    axios({
      method: 'GET',
      url: `${BACKEND_URL}/rooms/counts`,
      headers: adminHeader(),
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setCounts(data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          return;
        }
        throw error;
      });
    return () => cancel();
  }, []);
  return counts;
}

export function getRooms(status, input, sortBy, start, end, pageIndex) {
  const [working, setWorking] = useState(true);
  const [totalRooms, setTotalRooms] = useState(0);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    let cancel;
    setWorking(true);
    axios({
      method: 'GET',
      url: `${BACKEND_URL}/rooms`,
      params: {
        status,
        username: input,
        sortBy,
        date: { start, end },
        page: pageIndex,
      },
      headers: adminHeader(),
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setRooms(data.rooms);
        setTotalRooms(data.total);
        setWorking(false);
      })
      .catch((error) => {
        setWorking(false);
        if (axios.isCancel(error)) {
          return;
        }
        throw error;
      });
    return () => cancel();
  }, [status, input, sortBy, start, end, pageIndex]);
  return { rooms, totalRooms, working, setRooms };
}

export function getMessage(msgId) {
  const [working, setWorking] = useState(true);
  const [user, setUser] = useState({});
  useEffect(() => {
    let cancel;
    axios({
      method: 'GET',
      url: `${BACKEND_URL}/rooms/${msgId}`,
      headers: adminHeader(),
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setUser(data);
        setWorking(false);
      })
      .catch((error) => {
        setWorking(false);
        if (axios.isCancel(error)) {
          return;
        }
        throw error;
      });
    return () => cancel();
  }, [msgId]);
  return { user, working };
}
