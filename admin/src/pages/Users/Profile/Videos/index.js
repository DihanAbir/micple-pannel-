import React from 'react';
import { PlayCircleOutline } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';

import { ContentItem, BottomOption, Duration, Poster, Media } from '../style';
import { HoverOver } from '../../../../components/Tools';
import { Spinner } from '../../../../shared';
import { getMedia } from '../Hooks';
import { NoItem } from '../style';
import Header from '../Header';
import './style.scss';

function Videos({ username, name, privacy, history }) {
  document.title = `Videos | ${name?.join(' ')}`;
  const { media, counts, working } = getMedia(username, 'video');
  return (
    <>
      <Header title='Videos' counts={counts} username={username} privacy={privacy} />
      {working && <Spinner height={15} />}
      {!working && media.length < 1 && (
        <NoItem>
          <span>No videos yet.</span>
        </NoItem>
      )}
      <Media>
        {media.map((video) => (
          <ContentItem key={video.id}>
            {/* todo */}
            <Poster style={{ position: 'relative' }} onClick={() => history.push(`/${username}/timeline?post=${video.post}`)}>
              <PlayCircleOutline style={{ fontSize: 50 }} />
              <Duration>{video.duration ? `${~~(video.duration / 60)}:${video.duration % 60}` : '~'}</Duration>
            </Poster>
            <BottomOption>
              <HoverOver title={video.title}>
                <p>{video.title || 'Untitled'}</p>
              </HoverOver>
            </BottomOption>
          </ContentItem>
        ))}
      </Media>
    </>
  );
}

export default withRouter(Videos);
