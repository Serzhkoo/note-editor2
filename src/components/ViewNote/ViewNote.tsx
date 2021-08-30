import React from 'react';

import { NoteType } from '../../data/notes-api';
import { ViewModeType } from '../../App';
import styles from './ViewNote.module.scss'

type ViewNotePropsType = {
  selectedNote: NoteType
  setViewMode: (value: ViewModeType) => void
}

export const ViewNote: React.FC<ViewNotePropsType> = React.memo(({ selectedNote, setViewMode }) => {

  return (
    <div className={styles.viewNote}>
      <div className={styles.noteTitle}>{selectedNote.title}</div>
      <div>{selectedNote.body}</div>
      <div className={styles.closeButton}>
        <button onClick={() => setViewMode('none')}>Close</button>
      </div>
    </div>
  );
});