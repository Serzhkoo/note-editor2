import React from 'react';

import styles from './Note.module.scss';

type NotePropsType = {
  noteId: string
  noteTitle: string
  onNoteClickHandler: (noteId: string) => void
  onEditClickHandler: (noteId: string) => void
  onDeleteNoteClickHandler: (noteId: string) => void
}
export const Note: React.FC<NotePropsType> = React.memo(({
                                                           noteId,
                                                           noteTitle,
                                                           onNoteClickHandler,
                                                           onEditClickHandler,
                                                           onDeleteNoteClickHandler
                                                         }) => {

  return (
    <div>
      <span className={styles.note} onClick={() => onNoteClickHandler(noteId)}>{noteTitle}</span>
      <button onClick={() => onNoteClickHandler(noteId)}>View</button>
      <button onClick={() => onEditClickHandler(noteId)}>Edit</button>
      <button onClick={() => onDeleteNoteClickHandler(noteId)}>Delete</button>
    </div>
  );
});