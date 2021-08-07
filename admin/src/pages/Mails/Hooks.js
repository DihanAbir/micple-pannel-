/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import axios from 'axios';

import { BACKEND_URL } from '../../shared/constants/Variables';
import { adminHeader } from '../../shared/functions/Token';

export function getMailInfo() {
  const [counts, setCounts] = useState({
    total: 0,
    unseen: 0,
    seen: 0,
    unanswered: 0,
    answered: 0,
  });
  useEffect(() => {
    let cancel;
    axios({
      method: 'GET',
      url: `${BACKEND_URL}/mails/counts`,
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

export function getMails(status, sortBy, start, end, pageIndex) {
  const [working, setWorking] = useState(true);
  const [totalMails, setTotalMails] = useState(0);
  const [boxes, setBoxes] = useState([]);
  useEffect(() => {
    let cancel;
    setWorking(true);
    axios({
      method: 'GET',
      url: `${BACKEND_URL}/mails`,
      params: {
        status,
        // username: input,
        sortBy,
        date: { start, end },
        page: pageIndex,
      },
      headers: adminHeader(),
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setBoxes(data.boxes);
        setTotalMails(data.total);
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
  }, [status, sortBy, start, end, pageIndex]);
  return { boxes, totalMails, working, setBoxes };
}

export function getMail(msgId) {
  const [working, setWorking] = useState(true);
  const [mail, setMail] = useState({});
  useEffect(() => {
    let cancel;
    axios({
      method: 'GET',
      url: `${BACKEND_URL}/messages/${msgId}`,
      headers: adminHeader(),
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setMail(data);
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
  return { mail, working };
}
