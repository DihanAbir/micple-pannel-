import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import './style.scss';

const views = [
  {
    name: 'Timeline',
    link: 'timeline',
  },
  {
    name: 'About',
    link: 'about',
  },
  {
    name: 'Friends',
    link: 'friends',
  },
  {
    name: 'Photos',
    link: 'photos',
  },
  {
    name: 'Audios',
    link: 'audios',
  },
  {
    name: 'Videos',
    link: 'videos',
  },
  {
    name: 'Groups',
    link: 'groups',
  },
  {
    name: 'Notes',
    link: 'notes',
  },
];

const ProfileTabs = ({ match: { url } }) => {
  return (
    <div className='UserTabs'>
      <ul>
        {views.map(({ name, link }, i) => (
          <li key={i}>
            <NavLink to={`${url}/${link}`}>{name}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withRouter(ProfileTabs);
