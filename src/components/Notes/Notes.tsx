import React from 'react';

import { NoteType } from '../../data/notes-api';
import styles from './Notes.module.scss';
import { Note } from './Note/Note';

type NotesPropsType = {
  filteredNotes: NoteType[]
  onNoteClickHandler: (noteId: string) => void
  onEditClickHandler: (noteId: string) => void
  onDeleteNoteClickHandler: (noteId: string) => void
}

export const Notes: React.FC<NotesPropsType> = ({
                                                  filteredNotes,
                                                  onNoteClickHandler,
                                                  onEditClickHandler,
                                                  onDeleteNoteClickHandler
                                                }) => {

  return (
    <div className={styles.notes}>
      {filteredNotes.length
        ? filteredNotes.map(note =>
          <Note
            key={note.id}
            noteId={note.id}
            noteTitle={note.title}
            onNoteClickHandler={onNoteClickHandler}
            onEditClickHandler={onEditClickHandler}
            onDeleteNoteClickHandler={onDeleteNoteClickHandler}
          />)
        : <div>No notes found</div>}
    </div>
  );
};