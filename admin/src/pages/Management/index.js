import React from 'react';

import { AuthGuard } from '../../shared';

function Management() {
  document.title = 'Admins Management';
  return <div></div>;
}

export default AuthGuard(Management);
