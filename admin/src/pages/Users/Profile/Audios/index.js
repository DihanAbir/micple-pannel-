import React from 'react';

import { BACKEND_URL } from '../../../../shared/constants/Variables';
import { ContentItem, BottomOption, Media } from '../style';
import { HoverOver } from '../../../../components/Tools';
import { Audio } from '../../../../shared/Media';
import { Spinner } from '../../../../shared';
import { getMedia } from '../Hooks';
import { NoItem } from '../style';
import Header from '../Header';
import './style.scss';

export default ({ username, name, privacy }) => {
  document.title = `Audios | ${name?.join(' ')}`;
  const { media, counts, working } = getMedia(username, 'audio');
  return (
    <>
      <Header title='Audios' counts={counts} privacy={privacy} />
      {working && <Spinner height={15} />}
      {!working && media.length < 1 && (
        <NoItem>
          <span>No audios yet.</span>
        </NoItem>
      )}
      <Media>
        {media.map((audio) => (
          <ContentItem key={audio.id} style={{ width: 300 }}>
            <Audio src={`${BACKEND_URL}${audio.url}`} title={audio.title} duration={audio.duration} />
            <BottomOption>
              <HoverOver title={audio.title}>
                <p>{audio.title || 'Untitled'}</p>
              </HoverOver>
            </BottomOption>
          </ContentItem>
        ))}
      </Media>
    </>
  );
};
