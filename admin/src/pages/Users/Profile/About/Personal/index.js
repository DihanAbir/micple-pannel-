import React from 'react';

import Relation from './Relation';
import Family from './Family';
import Gender from './Gender';
import Dob from './Dob';

export default ({ about }) => {
  return (
    <>
      <h2>Basic Info</h2>
      <Gender gender={about?.gender} />
      <Dob dob={about?.dob} />
      {about?.family?.length > 0 && <Family family={about?.family || []} />}
      {about?.relation && <Relation relation={about?.relation} />}
    </>
  );
};
