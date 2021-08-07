import React, { useRef, useState, useEffect } from 'react';
import { SkipPrevious, SkipNext, PlayArrow, Pause, VolumeOff, VolumeDown, VolumeUp, Sync, SyncDisabled } from '@material-ui/icons';
import { Slider, withStyles, IconButton, Typography } from '@material-ui/core';

import { HoverOver } from '../../../components/Tools';
import './style.scss';

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
      zIndex: 99,
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
  const [repeat, setRepeat] = useState(localStorage.getItem('audio_repeat') === 'false' ? false : true);
  const [sound, setSound] = useState(~~localStorage.getItem('sound_lavel') || 100);
  let audio = useRef();
  useEffect(() => {
    audio.volume = sound / 100;
    localStorage.setItem('sound_lavel', sound);
  }, [sound]);
  useEffect(() => {
    localStorage.setItem('audio_repeat', repeat);
  }, [repeat]);
  function togglePlay() {
    if (paused) {
      audio.play();
      setPaused(false);
    } else {
      audio.pause();
      setPaused(true);
    }
  }
  function getArray(n) {
    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(i);
    }
    return a;
  }
  function onChangeDuration(e, v) {
    const time = dur * (v / 100);
    audio.currentTime = time;
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
    <div style={{ color: white, backgroundColor: '#000a', position: 'relative', minWidth: 300, width: '100%' }}>
      {!!title && (
        <div>
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
      <div style={{ display: 'flex', margin: '0 10px' }}>
        <Duration valueLabelDisplay='auto' valueLabelFormat={format(~~((dur / 100) * ctime))} value={~~ctime} onChange={onChangeDuration} />
      </div>
      <div style={{ display: 'flex', fontSize: 18, justifyContent: 'space-between', padding: '2px 5px' }}>
        <div>{format(~~((dur / 100) * ctime))}</div>
        <div>{format(~~dur)}</div>
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
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
          <span style={{ flex: 2 }} />
          <div style={{ flex: 1, textAlign: 'center' }}>
            <IconButton style={{ padding: '2px 5px' }} onClick={() => setRepeat(!repeat)}>
              {repeat ? <Sync style={{ color: white, fontSize: 22 }} /> : <SyncDisabled style={{ color: white, fontSize: 22 }} />}
            </IconButton>
          </div>
        </div>
      </div>
      <audio
        ref={(ref) => (audio = ref)}
        src={src}
        loop={repeat}
        onEnded={() => setPaused(true)}
        onLoadedMetadata={() => {
          if (!duration) {
            setDur(audio.duration);
          }
        }}
        onTimeUpdate={() => setCtime((100 / audio.duration) * audio.currentTime)}
      />
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translate(-50%)',
          alignItems: 'center',
          justifyContent: 'space-around',
          zIndex: -1,
          width: '100%',
          maxWidth: 300,
          height: '100%',
        }}
      >
        {getArray(20).map((i) => (
          <div key={i} className='bar' style={{ animationPlayState: paused ? 'paused' : 'running' }} />
        ))}
      </div>
    </div>
  );
};
