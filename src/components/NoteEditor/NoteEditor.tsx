import React, { useCallback, useState } from 'react';

import styles from './NoteEditor.module.scss';
import { NoteType } from '../../data/notes-api';
//@ts-ignore
import { HighlightWithinTextarea } from 'react-highlight-within-textarea';

type NoteEditorPropsType = {
  selectedNote: NoteType
  updateNoteText: (noteText: string) => void
  returnWithoutChanges: () => void
  tags: string[]
}

export const NoteEditor: React.FC<NoteEditorPropsType> = React.memo(({
                                                                       selectedNote,
                                                                       updateNoteText,
                                                                       returnWithoutChanges,
                                                                       tags
                                                                     }) => {
  const [noteText, setNoteText] = useState<string>(selectedNote.body);

  const onNoteTextChange = useCallback((event: string): void => {
    setNoteText(event);
  }, []);

  const onCancelClickHandler = useCallback((): void => {
    returnWithoutChanges();
  }, [returnWithoutChanges]);

  const onSubmitClickHandler = useCallback((): void => {
    if (noteText !== selectedNote.body) updateNoteText(noteText);
    else onCancelClickHandler();
  }, [noteText, onCancelClickHandler, updateNoteText, selectedNote.body]);

  const tagsSearch: string | null = tags.length ? tags.reduce((tag, acc) => acc + `|${tag}`) : null;
  const regex: RegExp = new RegExp(`\\b(${tagsSearch})\\b`, 'gi');

  return (
    <div className={styles.noteEditor}>
      <div className={styles.title}>{selectedNote.title}</div>
      <div className={styles.textarea}>
        <HighlightWithinTextarea
          value={noteText}
          highlight={tagsSearch ? regex : null}
          onChange={onNoteTextChange}
        />
      </div>
      <div className={styles.buttons}>
        <button onClick={onSubmitClickHandler}>Save</button>
        <button onClick={onCancelClickHandler}>Cancel</button>
      </div>
    </div>
  );
});