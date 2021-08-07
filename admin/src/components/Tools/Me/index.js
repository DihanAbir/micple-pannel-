import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Spinner } from '../../../shared';

function Me({
  auth: {
    loggingIn,
    user: { username },
    loggedIn,
  },
}) {
  if (loggingIn) {
    return <Spinner height={100} />;
  } else {
    return <Redirect to={!loggedIn ? '/?l=now' : `/${username}`} />;
  }
}

export default connect((store) => ({ auth: store.auth }))(Me);
