import React, { useRef, useState, useEffect } from 'react';
import {
  SkipPrevious,
  SkipNext,
  PlayArrow,
  Pause,
  VolumeOff,
  VolumeDown,
  VolumeUp,
  Sync,
  SyncDisabled,
  PlayCircleOutline,
  CropFree,
  CropSquare,
} from '@material-ui/icons';
import { Slider, withStyles, IconButton, Typography } from '@material-ui/core';

import { HoverOver } from '../../../components/Tools';

const white = '#fff';
const Duration = withStyles({
  root: {
    color: '#ff42ce',
    height: 8,
  },
  thumb: {
    height: 18,
    width: 18,
    backgroundColor: white,
    border: '2px solid currentColor',
    marginLeft: -8,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);
const Volume = withStyles({
  root: {
    color: 'yellow',
    height: 5,
  },
  thumb: {
    marginTop: -4,
  },
  track: {
    height: 5,
    borderRadius: 4,
  },
  rail: {
    height: 5,
    borderRadius: 4,
  },
})(Slider);

export default ({ next, prev, src, title = '', duration }) => {
  const [paused, setPaused] = useState(true);
  const [ctime, setCtime] = useState(0);
  const [dur, setDur] = useState(duration);
  const [silent, setSilent] = useState(false);
  const [active, setActive] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [repeat, setRepeat] = useState(localStorage.getItem('video_repeat') === 'false' ? false : true);
  const [sound, setSound] = useState(~~localStorage.getItem('sound_lavel') || 100);
  let video = useRef();
  useEffect(() => {
    let activeTimeout;
    if (active && !paused) {
      clearTimeout(activeTimeout);
      activeTimeout = setTimeout(() => {
        setActive(false);
      }, 4000);
    }
  }, [active, paused]);
  useEffect(() => {
    video.volume = sound / 100;
    localStorage.setItem('sound_lavel', sound);
  }, [sound]);
  useEffect(() => {
    localStorage.setItem('video_repeat', repeat);
  }, [repeat]);
  function togglePlay() {
    if (paused) {
      video.play();
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  }
  function toggleFullscreen() {
    if (fullscreen) {
      // todo
    } else {
      video
        .requestFullscreen({ navigationUI: 'show' })
        .then(() => setFullscreen(true))
        .catch((err) => err);
    }
  }
  function onChangeDuration(e, v) {
    const time = dur * (v / 100);
    video.currentTime = time;
    setCtime(v);
  }
  function format(inp) {
    const h = ~~(inp / 3600);
    const m = ~~((inp / 60) % 60);
    const s = ~~(inp % 60);
    if (h > 0) {
      return `${h > 9 ? '' + h : '0' + h}:${m > 9 ? '' + m : '0' + m}:${s > 9 ? '' + s : '0' + s}`;
    } else {
      return `${m > 9 ? '' + m : '0' + m}:${s > 9 ? '' + s : '0' + s}`;
    }
  }
  return (
    <div
      style={{
        backgroundColor: '#424242',
        color: white,
        position: 'relative',
        minWidth: 300,
        width: '100%',
        cursor: active || paused ? 'default' : 'none',
      }}
      onMouseOver={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onMouseMove={() => setActive(true)}
    >
      <video
        style={{ width: '100%' }}
        ref={(ref) => (video = ref)}
        src={src}
        loop={repeat}
        onEnded={() => setPaused(true)}
        onLoadedMetadata={() => {
          if (!duration) {
            setDur(video.duration);
          }
        }}
        onTimeUpdate={() => setCtime((100 / video.duration) * video.currentTime)}
      />
      <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, display: 'flex', flexDirection: 'column' }}>
        {!!title && (
          <div style={{ backgroundColor: '#0008', opacity: active || paused ? 1 : 0 }}>
            <HoverOver title={title}>
              <Typography
                component='h3'
                variant='h6'
                style={{ padding: 5, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
                align='center'
              >
                {title}
              </Typography>
            </HoverOver>
          </div>
        )}
        <div
          style={{ flex: '1 1 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={togglePlay}
          onDoubleClick={toggleFullscreen}
        >
          {paused && <PlayCircleOutline style={{ color: '#fff', fontSize: 50, backgroundColor: '#0005', borderRadius: '50%' }} />}
        </div>
        <div style={{ backgroundColor: '#0008', opacity: active || paused ? 1 : 0 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1, textAlign: 'center', fontSize: 18 }}>{format(~~((dur / 100) * ctime))}</div>
            <div style={{ flex: 5, display: 'flex' }}>
              <Duration valueLabelDisplay='auto' valueLabelFormat={format(~~((dur / 100) * ctime))} value={~~ctime} onChange={onChangeDuration} />
            </div>
            <div style={{ flex: 1, textAlign: 'center', fontSize: 18 }}>{format(~~dur)}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
              <IconButton style={{ flex: 1, padding: '2px 5px' }} onClick={() => setSilent(!silent)}>
                {sound < 1 || silent ? (
                  <VolumeOff style={{ color: white, fontSize: 22 }} />
                ) : sound > 1 && sound < 51 ? (
                  <VolumeDown style={{ color: white, fontSize: 22 }} />
                ) : (
                  <VolumeUp style={{ color: white, fontSize: 22 }} />
                )}
              </IconButton>
              <div style={{ flex: 4, display: 'flex' }}>
                <Volume value={sound} onChange={(e, v) => setSound(v)} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', flex: 1 }}>
              <IconButton style={{ padding: '2px 5px' }} onClick={prev}>
                <SkipPrevious style={{ color: white, fontSize: 22 }} />
              </IconButton>
              <IconButton style={{ padding: 0 }} onClick={togglePlay}>
                {paused ? <PlayArrow style={{ fontSize: 30, color: white }} /> : <Pause style={{ fontSize: 30, color: white }} />}
              </IconButton>
              <IconButton style={{ padding: '2px 5px' }} onClick={next}>
                <SkipNext style={{ color: white, fontSize: 22 }} />
              </IconButton>
            </div>
            <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
              <IconButton style={{ padding: '2px 5px' }} onClick={() => setRepeat(!repeat)}>
                {repeat ? <Sync style={{ color: white, fontSize: 22 }} /> : <SyncDisabled style={{ color: white, fontSize: 22 }} />}
              </IconButton>
              <IconButton style={{ padding: '2px 5px' }} onClick={toggleFullscreen}>
                {fullscreen ? <CropSquare style={{ color: white, fontSize: 22 }} /> : <CropFree style={{ color: white, fontSize: 22 }} />}
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
