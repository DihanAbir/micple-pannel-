import React from 'react';

import './style.scss';

const Spinner = ({ height = 0 }) => (
  <div style={{ height: height ? (typeof height === 'string' ? height : `${height}vh`) : 'auto' }} className='spinner'>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default Spinner;
