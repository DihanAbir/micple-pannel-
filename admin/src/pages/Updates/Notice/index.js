import React, { useState, useEffect } from 'react';
import { History, Add, Save, Close } from '@material-ui/icons';
import { IconButton, Switch } from '@material-ui/core';
import axios from 'axios';

import { BACKEND_URL } from '../../../shared/constants/Variables';
import { adminHeader } from '../../../shared/functions/Token';
import { When } from '../../../components';
import Histories from './History';

export default () => {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [notice, setNotice] = useState({});
  const [editing, setEditing] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/notice`, { headers: adminHeader() })
      .then(({ data }) => {
        setNotice(data);
        setChecked(data.show);
      })
      .catch((err) => {
        throw err;
      });
  }, []);
  function save() {
    const body = {
      date: new Date().toISOString(),
      title: title.trim(),
    };
    if (!body.title) {
      return;
    }
    axios
      .post(`${BACKEND_URL}/notice`, body, { headers: adminHeader() })
      .then(() => {
        setNotice(body);
        setTitle('');
        setEdit(false);
        setChecked(true);
        setEditing(false);
      })
      .catch((err) => {
        setEditing(false);
        throw err;
      });
  }
  function turnSwitch(_) {
    const val = _.target.checked;
    setChecked(val);
    setEditing(true);
    axios
      .put(`${BACKEND_URL}/notice`, { show: val }, { headers: adminHeader() })
      .then(() => {
        setEditing(false);
      })
      .catch((err) => {
        setEditing(false);
        setChecked(!val);
        throw err;
      });
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Switch checked={checked} onChange={turnSwitch} disabled={editing} />
      {!edit ? (
        <div style={{ flex: '1 1 auto', display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => setEdit(true)} style={{ backgroundColor: '#ccc', padding: 7 }}>
            <Add />
          </IconButton>
          <div style={{ whiteSpace: 'pre', margin: '0 10px', fontSize: 12, fontWeight: 700 }}>
            {!!notice.date && (
              <small>
                <When date={notice.date} />
              </small>
            )}
          </div>
          {!!notice && (
            <div style={{ flex: '1 1 auto' }}>
              <div>
                {notice?.title?.substr(0, 130)}
                {notice?.title?.length > 130 && '...'}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={{ flex: '1 1 auto', display: 'flex', alignItems: 'center' }}>
          <input
            autoFocus
            placeholder='Notice...'
            value={title}
            onChange={(_) => setTitle(_.target.value)}
            style={{ flex: '1 1 auto', padding: 5, border: 0, borderRadius: 0, margin: 5 }}
          />
          <IconButton onClick={save} disabled={editing} style={{ backgroundColor: '#ccc', padding: 7, margin: '0 10px' }}>
            <Save />
          </IconButton>
          <IconButton
            onClick={() => {
              setTitle('');
              setEdit(false);
            }}
            style={{ backgroundColor: '#ccc', padding: 7 }}
          >
            <Close />
          </IconButton>
        </div>
      )}
      <IconButton onClick={() => setHistoryModal(true)} style={{ margin: '0 10px 0' }}>
        <History />
      </IconButton>
      {historyModal && (
        <Histories
          open
          close={() => setHistoryModal(false)}
          setNotice={(n) => {
            setNotice(n);
            setChecked(true);
          }}
          setDelete={(id) => {
            if (notice.id === id) {
              setNotice({});
              setChecked(false);
            }
          }}
        />
      )}
    </div>
  );
};
