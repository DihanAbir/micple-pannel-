import React from 'react';

import { processString } from '../../../shared/functions/String';

const url_regex = /(https?|ftp|file):\/\/(\S+)\.?([a-z]{2,}?)(.*?)( |,|$|\.)?/g;

export default ({ children }) => {
  const config = [
    {
      regex: url_regex,
      action: (key, result) => (
        <a key={key} href={result[0]} style={{ cursor: 'pointer' }} target='blank'>
          {result[0]}
        </a>
      ),
    },
  ];
  return processString(config)(children);
};
