import React from 'react';
import { withRouter } from 'react-router-dom';

import { ContentItem, BottomOption, Poster, Media } from '../style';
import { HoverOver } from '../../../../components/Tools';
import { getUrl } from '../../../../shared/functions';
import { Spinner } from '../../../../shared';
import { getMedia } from '../Hooks';
import { NoItem } from '../style';
import Header from '../Header';

function Photos({ username, name, privacy, history }) {
  document.title = `Photos | ${name?.join(' ')}`;
  const { media, counts, working } = getMedia(username, 'photo');
  return (
    <>
      <Header counts={counts} title='Photos' username={username} privacy={privacy} />
      {working && <Spinner height={15} />}
      {!working && media.length < 1 && (
        <NoItem>
          <span>No photos yet.</span>
        </NoItem>
      )}
      <Media>
        {media.map((photo) => (
          <ContentItem key={photo.id}>
            {/* todo */}
            <Poster style={{ position: 'relative' }} onClick={() => history.push(`/${username}/timeline?post=${photo.post}`)}>
              <img alt='' src={getUrl(photo.url)} />
            </Poster>
            <BottomOption>
              <HoverOver title={photo.title}>
                <p>{photo.title || 'Untitled'}</p>
              </HoverOver>
            </BottomOption>
          </ContentItem>
        ))}
      </Media>
    </>
  );
}

export default withRouter(Photos);
