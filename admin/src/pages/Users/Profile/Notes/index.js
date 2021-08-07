import React, { useState } from 'react';
import { Container, Grid, IconButton } from '@material-ui/core';
import { Public, People, Lock } from '@material-ui/icons';

import { Spinner } from '../../../../shared';
import { getNotes } from '../Hooks';
import { NoItem } from '../style';
import ReadNote from './ReadNote';
import Header from '../Header';
import './userNotesStyle.scss';

import NoteImg from './mynotes.png';

const Notes = ({ username, name, privacy }) => {
  document.title = `Notes | ${name?.join(' ')}`;
  const [noteModal, setNoteModal] = useState(false);
  const [readId, setReadId] = useState('');
  const { notes, counts, working } = getNotes(username);
  return (
    <>
      <Header title='Notes' counts={counts} privacy={privacy} />
      <Container>
        {working && <Spinner height={10} />}
        {!working && notes.length < 1 && (
          <NoItem>
            <span>No notes.</span>
          </NoItem>
        )}
        <Grid container spacing={3}>
          <ReadNote
            open={noteModal}
            close={() => {
              setReadId(null);
              setNoteModal(false);
            }}
            id={readId}
            username={username}
          />
          {notes.map((note) => (
            <Grid key={note.id} className='col1' item xs={12} sm={4} lg={3} xl={3} md={3}>
              <div className='video-card'>
                <div
                  onClick={() => {
                    setReadId(note.id);
                    setNoteModal(true);
                  }}
                >
                  <img src={NoteImg} alt='img' className='notes-img-a1' />
                  <div onClick={() => setNoteModal(true)} className='caption-div-a6'>
                    <p className='caption-tag-video-a4'>{note.title}</p>
                  </div>
                </div>

                <div style={{ height: '40px', padding: '0px', display: 'flex' }}>
                  <div className='privacy-btn-abs'>
                    <IconButton disabled>{note.privacy === 'public' ? <Public /> : note.privacy === 'friends' ? <People /> : <Lock />}</IconButton>
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Notes;
