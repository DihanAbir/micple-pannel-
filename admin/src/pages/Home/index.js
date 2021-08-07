import React from 'react';
import { Redirect } from 'react-router-dom';

import { AuthGuard } from '../../shared';

function Home() {
  return <Redirect to='/dashboard' />;
}

export default AuthGuard(Home);
