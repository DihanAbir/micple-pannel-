import React, { useState } from 'react';
import Slider from 'react-slick';

import { Audio, Photo, Video } from '../../../shared/Media';
import { getUrl } from '../../../shared/functions';
import { FormatContent } from '../../Tools';
import './style.scss';

export default ({ media = [], contents = [], postId }) => {
  const [active, setActive] = useState(false);
  const post = contents[contents.length - 1];
  function getContent() {
    if (post.length <= 300 || active) {
      return <FormatContent>{post}</FormatContent>;
    } else {
      if (active) {
        return (
          <>
            <FormatContent>{post}</FormatContent>
            <span onClick={() => setActive(!active)}>&nbsp; less</span>
          </>
        );
      } else {
        return (
          <>
            <FormatContent>{post.substr(0, 300)}</FormatContent>
            <span onClick={() => setActive(!active)}>&nbsp; more</span>
          </>
        );
      }
    }
  }
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
  for (const btn of slBtns) {
    btn.addEventListener('click', onChangeSlide);
  }
  if (postMedia) {
    postMedia.addEventListener('mouseenter', () => toggleSlBtn(true));
    postMedia.addEventListener('mouseleave', () => toggleSlBtn(false));
  }
  return (
    <div className='ContentWraper'>
      {media.length < 1 ? (
        <>
          {!!post && (
            <div className='content'>
              {post.length <= 150 ? (
                <h2 style={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                  <FormatContent>{post}</FormatContent>
                </h2>
              ) : (
                <p style={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>{getContent()}</p>
              )}
            </div>
          )}
        </>
      ) : (
        <div className='mda-cont'>
          {!!post && (
            <div className='cont-left' style={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
              {getContent()}
            </div>
          )}
          <div className='mda' id={`id${postId}`}>
            <Slider onSwipe={onChangeSlide} onEdge={(e) => {}}>
              {media.map(({ id, type, url, poster = '', title, duration }) => {
                switch (type) {
                  case 'image':
                    return (
                      <div key={id}>
                        <div className='mdbk' style={{ backgroundImage: `url(${getUrl(url)})` }}>
                          <div style={{ backgroundColor: '#0008', height: 540 }}>
                            <Photo src={getUrl(url)} />
                          </div>
                        </div>
                      </div>
                    );
                  case 'video':
                    return (
                      <div key={id}>
                        <div className='mdbk' style={{ backgroundImage: `url(${getUrl(poster)})` }}>
                          <div style={{ backgroundColor: '#0008', height: 540 }}>
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
