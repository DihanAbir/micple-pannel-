/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import axios from 'axios';

import { BACKEND_URL } from '../../shared/constants/Variables';
import { adminHeader } from '../../shared/functions/Token';

export function getUserInfo() {
  const [countries, setCountries] = useState([]);
  const [counts, setCounts] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    banned: 0,
    rejected: 0,
    verified: 0,
  });
  useEffect(() => {
    let cancel;
    axios({
      method: 'GET',
      url: `${BACKEND_URL}/users`,
      headers: adminHeader(),
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setCounts(data.counts);
        setCountries(data.countries);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          return;
        }
        throw error;
      });
    return () => cancel();
  }, []);
  return { counts, countries };
}

export function getUsers(country, status, input, sortBy, start, end, pageIndex) {
  const [working, setWorking] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    let cancel;
    setWorking(true);
    axios({
      method: 'POST',
      url: `${BACKEND_URL}/users`,
      data: {
        country,
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
        setUsers(data.users);
        setTotalUsers(data.total);
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
  }, [country, status, input, sortBy, start, end, pageIndex]);
  return { users, totalUsers, working };
}

export function getUser(userId) {
  const [working, setWorking] = useState(true);
  const [user, setUser] = useState({});
  useEffect(() => {
    let cancel;
    axios({
      method: 'GET',
      url: `${BACKEND_URL}/users/${userId}`,
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
  }, [userId]);
  return { user, working, setUser };
}
