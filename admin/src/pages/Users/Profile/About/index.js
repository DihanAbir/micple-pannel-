import React from 'react';

import { Spinner } from '../../../../shared';
import { getAbout } from '../Hooks';
import Education from './Education';
import Location from './Location';
import Personal from './Personal';
import Contact from './Contact';
import Header from '../Header';
import Work from './Work';
import './style.scss';

export default ({ username, name, privacy }) => {
  document.title = `About | ${name?.join(' ')}`;
  const { about, working } = getAbout(username);
  return (
    <div className='display-about'>
      <Header title='About' privacy={privacy} />
      {working ? (
        <Spinner height={35} />
      ) : (
        <div className='abt-cnt'>
          {about?.works?.length > 0 && <Work works={about.works} />}
          {(about.educations?.schools?.length > 0 ||
            about.educations?.colleges?.length > 0 ||
            about?.educations?.universities?.length > 0) && <Education educations={about?.educations} />}
          {Object.keys(about?.Location || {}).length > 0 && <Location location={about?.location || {}} />}
          <Contact about={about} username={username} />
          <Personal about={about} />
        </div>
      )}
    </div>
  );
};
