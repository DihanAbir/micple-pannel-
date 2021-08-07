import React from 'react';

import { Group } from '../../../../components';
import { Spinner } from '../../../../shared';
import { getGroups } from '../Hooks';
import Header from '../Header';

export default ({ username, name, privacy }) => {
  document.title = `Groups | ${name?.join(' ')}`;
  const { groups, counts, working } = getGroups(username);
  return (
    <div>
      <Header title='Groups' counts={counts} privacy={privacy} username={username} />
      {groups.map((item) => (
        <Group group={item} key={item.id} />
      ))}
      {working && <Spinner height={10} />}
    </div>
  );
};
