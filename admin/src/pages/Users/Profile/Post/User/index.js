import React, { useState } from 'react';
import { MoreVert, Public, People, Lock } from '@material-ui/icons';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import axios from 'axios';

import { BACKEND_URL } from '../../../../../shared/constants/Variables';
import { adminHeader } from '../../../../../shared/functions/Token';
import { getUserAvatar } from '../../../../../shared/functions';
import { UName } from '../../../../../components/Tools';
import { When } from '../../../../../components';
import './style.scss';

export default ({ user: { name, username, avatar, gender, verified }, privacy, date, status, edited, rejected, postId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [reject, setReject] = useState(rejected);
  function toggleReject() {
    setAnchorEl(null);
    axios
      .put(`${BACKEND_URL}/post/${postId}`, { rejected: !reject }, { headers: adminHeader() })
      .then(() => {
        setReject();
      })
      .catch((err) => {
        throw err;
      });
  }
  return (
    <div className='top'>
      <div className='UserInfo'>
        <div className='userProfile'>
          <img className='userImg' src={getUserAvatar(avatar, gender)} alt='' />
          <div className='userInfo'>
            <a target='blank' href={`/${username}`} className='userName'>
              <UName name={name} verified={verified} /> {!!status && <small>{status}</small>}
            </a>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p className='timeAgo'>
                <When date={date} />
              </p>
              <IconButton style={{ padding: '0 10px' }} disabled>
                {privacy === 'private' ? <Lock /> : privacy === 'friends' ? <People /> : <Public />}
              </IconButton>
              {edited && <span style={{ fontSize: '12px' }}>Edited</span>}
            </div>
          </div>
        </div>
      </div>
      <div className='opts'>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={!!anchorEl}
          onClose={() => setAnchorEl(null)}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: '20ch',
            },
          }}
        >
          <MenuItem onClick={toggleReject}>{reject ? 'Undo Reject' : 'Reject'}</MenuItem>
        </Menu>
      </div>
    </div>
  );
};
