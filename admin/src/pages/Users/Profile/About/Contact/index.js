import React from 'react';

import Website from './Website';
import Phone from './Phone';
import Mail from './Mail';

export default ({ about, username }) => {
  return (
    <>
      <h2>Contact Info</h2>
      <Mail username={username} />
      <Phone phone={about?.phone || []} />
      <Website website={about?.website || []} />
    </>
  );
};
