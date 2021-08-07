import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@material-ui/core';
import { Twitter, Facebook, LinkedIn, Instagram, Link } from '@material-ui/icons';
import styled from 'styled-components';

import { getUrl } from '../../../shared/functions';
import VK from '../../../assets/reactions/VK.png';
import { HoverOver } from '../../Tools';

const shares = [
  { name: 'facebook', Icon: Facebook, color: '#3b5998' },
  { name: 'twitter', Icon: Twitter, color: '#00acee' },
  { name: 'instagram', Icon: Instagram, color: '#3f729b' },
  { name: 'linkedin', Icon: LinkedIn, color: '#0e76a8' },
];

export default ({ open, close, postId, username }) => {
  function openWith(name) {
    window.open(getUrl(`/api/share?to=${name}&post=/${username}/timeline?post=${postId}`), 'blank');
  }
  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth='sm'>
      <DialogTitle>
        <strong>Share</strong>
      </DialogTitle>
      <DialogContent dividers>
        <IconContainer>
          {shares.map(({ name, Icon, color }) => (
            <HoverOver title={name} key={name}>
              <IconButton style={{ backgroundColor: color }} onClick={() => openWith(name)}>
                <Icon />
              </IconButton>
            </HoverOver>
          ))}
          <HoverOver title='VK'>
            <IconButton style={{ backgroundColor: '#1A4B78' }} onClick={() => openWith('vk')}>
              <img alt='' src={VK} />
            </IconButton>
          </HoverOver>
          <HoverOver title='Copy Link'>
            <IconButton
              style={{ backgroundColor: '#00a992' }}
              onClick={() => {
                document.getElementById(`postInput${postId}`).select();
                document.execCommand('copy');
              }}
            >
              <Link />
            </IconButton>
          </HoverOver>
        </IconContainer>
        <input
          style={{ position: 'absolute', zIndex: '-999', opacity: 0 }}
          defaultValue={`https://micple.com/${username}/timeline?post=${postId}`}
          id={`postInput${postId}`}
        />
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' color='secondary' onClick={close}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const IconContainer = styled('div')`
  display: flex;
  button {
    margin: auto;
    span {
      svg {
        font-size: 5rem;
        color: #fff;
      }
      img {
        height: 50px;
        width: auto;
      }
    }
  }
`;
