import React from 'react';

import { AuthGuard } from '../../shared';

function Trash() {
  document.title = 'Trash';
  return <div></div>;
}

export default AuthGuard(Trash);
