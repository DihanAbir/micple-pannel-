import React from 'react';

import { AuthGuard } from '../../shared';

function Calling() {
  document.title = 'Calling';
  return <div></div>;
}

export default AuthGuard(Calling);
