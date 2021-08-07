import React from 'react';
import { Public, Lock } from '@material-ui/icons';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { getGroupAvatar } from '../../shared/functions';
import { GroupAvatar } from '../../assets/profile';
import { Main, Avatar, Body } from './style';
import { HoverOver } from '../Tools';

export default ({ group }) => {
  return (
    <Main>
      <Avatar src={!!group.avatar ? getGroupAvatar(group.avatar) : GroupAvatar} alt='' />
      <Body>
        <Link to={`/groups/${group.id}`}>
          <Typography component='h2' style={{ fontSize: 17, fontWeight: 700 }}>
            {group.name}
          </Typography>
        </Link>
        <Typography component='p' variant='body1' style={{ margin: '3px 0', display: 'flex', alignItems: 'flex-start' }}>
          <HoverOver title='Group privacy'>{group.privacy === 'public' ? <Public /> : <Lock />}</HoverOver>
          <div>
            &nbsp; {group.members} Members. {group.ppd} post(s) a day.
          </div>
        </Typography>
      </Body>
    </Main>
  );
};
