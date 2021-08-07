import React from 'react';
import { MoreVert, Public, People, Lock } from '@material-ui/icons';
import { Icon, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { getUserAvatar } from '../../../shared/functions';
import { UName } from '../../Tools';
import When from '../../When';
import './style.scss';

export default ({ user: { name, username, avatar, gender, verified }, privacy, date, status, edited }) => {
  return (
    <div className='top'>
      <div className='UserInfo'>
        <div className='userProfile'>
          <img className='userImg' src={getUserAvatar(avatar, gender)} alt='' />
          <div className='userInfo'>
            <Link to={`/${username}`} className='userName'>
              <UName name={name} verified={verified} /> {!!status && <small>{status}</small>}
            </Link>
            <div>
              <p className='timeAgo'>
                <When date={date} />
              </p>
              <IconButton style={{ padding: '0 10px' }}>
                {privacy === 'private' ? <Lock /> : privacy === 'friends' ? <People /> : <Public />}
              </IconButton>
              {edited && <span style={{ fontSize: '12px' }}>Edited</span>}
            </div>
          </div>
        </div>
      </div>
      <div className='opts'>
        <Icon aria-label='more' aria-controls='long-menu'>
          <MoreVert />
        </Icon>
      </div>
    </div>
  );
};
