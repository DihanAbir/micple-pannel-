/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import axios from 'axios';

import { BACKEND_URL } from '../../../shared/constants/Variables';
import { adminHeader } from '../../../shared/functions/Token';

export function getProfile(username) {
  const [working, setWorking] = useState(true);
  const [profile, setProfile] = useState({});
  const [error, setError] = useState('');
  useEffect(() => {
    let cancel;
    axios({
      method: 'GET',
      url: `${BACKEND_URL}/profile/${username}`,
      headers: adminHeader(),
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setProfile(data);
        setWorking(false);
      })
      .catch((err) => {
        if (axios.isCancel(error)) {
          return;
        }
        setError(err.response?.data?.message || 'Something went wrong.');
        setWorking(false);
        throw err;
      });
    return () => cancel();
  }, [error, username]);
  return { profile, working, error };
}
export function getPosts(username, offset) {
  const [working, setWorking] = useState(true);
  const [posts, setPosts] = useState([]);
  const [counts, setCounts] = useState(0);
  useEffect(() => {
    let cancel;
    axios({
      method: 'GET',
      url: `${BACKEND_URL}/profile/timeline/${username}?offset=${offset}`,
      headers: adminHeader(),
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setPosts(data.posts);
        setCounts(data.counts);
        setWorking(false);
      })
      .catch((error) => {
        if (axios.isCancel(cancel)) {
          return;
        }
        setWorking(false);
        throw error;
      });
  }, [offset, username]);
  return { posts, working, counts };
}
export function getAbout(username) {
  const [working, setWorking] = useState(true);
  const [about, setAbout] = useState({});
  useEffect(() => {
    let cancel;
    axios({
      method: 'GET',
      url: `${BACKEND_URL}/profile/about/${username}`,
      headers: adminHeader(),
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setAbout(data);
        setWorking(false);
      })
      .catch((error) => {
        if (axios.isCancel(cancel)) {
          return;
        }
        setWorking(false);
        throw error;
      });
  }, [username]);
  return { about, working };
}
export function getFriends(username) {
  const [working, setWorking] = useState(true);
  const [friends, setFriends] = useState([]);
  const [counts, setCounts] = useState(0);
  useEffect(() => {
    let cancel;
    axios({
      method: 'GET',
      url: `${BACKEND_URL}/profile/friends/${username}`,
      headers: adminHeader(),
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setFriends(data.friends);
        setCounts(data.counts);
        setWorking(false);
      })
      .catch((error) => {
        if (axios.isCancel(cancel)) {
          return;
        }
        setWorking(false);
        throw error;
      });
  }, [username]);
  return { friends, counts, working };
}
export function getMedia(username, name) {
  const [working, setWorking] = useState(true);
  const [media, setMedia] = useState([]);
  const [counts, setCounts] = useState(0);
  useEffect(() => {
    let cancel;
    axios({
      method: 'GET',
      url: `${BACKEND_URL}/profile/media/${username}/${name}`,
      headers: adminHeader(),
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setMedia(data.media);
        setCounts(data.counts);
        setWorking(false);
      })
      .catch((error) => {
        if (axios.isCancel(cancel)) {
          return;
        }
        setWorking(false);
        throw error;
      });
  }, [username, name]);
  return { media, counts, working };
}
export function getGroups(username) {
  const [working, setWorking] = useState(true);
  const [groups, setGroups] = useState([]);
  const [counts, setCounts] = useState(0);
  useEffect(() => {
    let cancel;
    axios({
      method: 'GET',
      url: `${BACKEND_URL}/profile/groups/${username}`,
      headers: adminHeader(),
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setGroups(data.groups);
        setCounts(data.counts);
        setWorking(false);
      })
      .catch((error) => {
        if (axios.isCancel(cancel)) {
          return;
        }
        setWorking(false);
        throw error;
      });
  }, [username]);
  return { groups, counts, working };
}
export function getNotes(username) {
  const [working, setWorking] = useState(true);
  const [notes, setNotes] = useState([]);
  const [counts, setCounts] = useState(0);
  useEffect(() => {
    let cancel;
    axios({
      method: 'GET',
      url: `${BACKEND_URL}/profile/notes/${username}`,
      headers: adminHeader(),
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setNotes(data.notes);
        setCounts(data.counts);
        setWorking(false);
      })
      .catch((error) => {
        if (axios.isCancel(cancel)) {
          return;
        }
        setWorking(false);
        throw error;
      });
  }, [username]);
  return { notes, counts, working };
}
export function getActivities(username) {
  const [working, setWorking] = useState(true);
  const [activity, setActivity] = useState([]);
  const [counts, setCounts] = useState(0);
  useEffect(() => {
    let cancel;
    axios({
      method: 'GET',
      url: `${BACKEND_URL}/profile/activity/${username}`,
      headers: adminHeader(),
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setActivity(data.activity);
        setCounts(data.counts);
        setWorking(false);
      })
      .catch((error) => {
        if (axios.isCancel(cancel)) {
          return;
        }
        setWorking(false);
        throw error;
      });
  }, [username]);
  return { activity, counts, working };
}
