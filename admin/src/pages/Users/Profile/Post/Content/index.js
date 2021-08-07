import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';

import { Audio, Photo, Video } from '../../../../../shared/Media';
import { FormatContent } from '../../../../../components/Tools';
import { getUrl } from '../../../../../shared/functions';
import './style.scss';

export default ({ media = [], contents = [], postId }) => {
  const [active, setActive] = useState(false);
  const post = contents[contents.length - 1];
  const getContent = () => {
    if (post.length <= 300 || active) {
      return post;
    } else {
      return (
        <>
          {<FormatContent>{post.substr(0, 300)}</FormatContent> + '...'}
          <span onClick={() => setActive(!active)}>&nbsp; {active ? 'more' : 'less'}</span>
        </>
      );
    }
  };
  const postMedia = document.querySelector(`#id${postId}`);
  const videos = document.querySelectorAll(`#id${postId} video`);
  const audios = document.querySelectorAll(`#id${postId} audio`);
  const slBtns = document.querySelectorAll(`#id${postId} .slick-arrow`);
  function onChangeSlide() {
    setTimeout(() => {
      for (const video of videos) {
        video.pause();
      }
      for (const audio of audios) {
        audio.pause();
      }
    }, 0);
  }
  function toggleSlBtn(val = false) {
    for (const btn of slBtns) {
      if (val) {
        btn.classList.remove('hidden');
      } else {
        btn.classList.add('hidden');
      }
    }
  }
  useEffect(() => {
    for (const btn of slBtns) {
      btn.addEventListener('click', onChangeSlide);
    }
    if (postMedia) {
      postMedia.addEventListener('mouseenter', () => toggleSlBtn(true));
      postMedia.addEventListener('mouseleave', () => toggleSlBtn(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='ContentWraper'>
      {media.length < 1 ? (
        <>
          {!!post && (
            <div className='content'>
              {post.length <= 150 ? (
                <h2>
                  <FormatContent>{post}</FormatContent>
                </h2>
              ) : (
                <p>{getContent()}</p>
              )}
            </div>
          )}
        </>
      ) : (
        <div className='mda-cont'>
          {!!post && <div className='cont-left'>{getContent()}</div>}
          <div className='mda' id={`id${postId}`}>
            <Slider onSwipe={onChangeSlide} onEdge={() => {}}>
              {media.map(({ id, type, url, poster = '', title = '', duration }) => {
                switch (type) {
                  case 'image':
                    return (
                      <div key={id}>
                        <div className='mdbk' style={{ backgroundImage: `url(${getUrl(url)})` }}>
                          <div style={{ backgroundColor: '#0008', maxHeight: 540 }}>
                            <Photo src={getUrl(url)} />
                          </div>
                        </div>
                      </div>
                    );
                  case 'video':
                    return (
                      <div key={id}>
                        <div className='mdbk' style={{ backgroundImage: `url(${getUrl(poster)})` }}>
                          <div style={{ backgroundColor: '#0008', maxHeight: 540 }}>
                            <Video src={getUrl(url)} title={title} duration={duration} />
                          </div>
                        </div>
                      </div>
                    );
                  case 'audio':
                    return (
                      <div key={id}>
                        <div className='mdbk'>
                          <div>
                            <Audio src={getUrl(url)} title={title} duration={duration} />
                          </div>
                        </div>
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
};
