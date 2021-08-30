import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StateType } from './store/store';
import { DataType, NoteType } from './data/notes-api';
import {
  addNoteTC,
  addTagTC,
  fetchDataTC,
  removeNoteTC,
  removeTagTC,
  updateNoteTC
} from './store/data-reducer';
import { AddItemForm } from './components/AddItemForm/AddItemForm';
import { NoteEditor } from './components/NoteEditor/NoteEditor';
import { ViewNote } from './components/ViewNote/ViewNote';
import { Tags } from './components/Tags/Tags';
import styles from './App.module.scss';
import { Notes } from './components/Notes/Notes';

export type ViewModeType = 'none' | 'read' | 'edit';

export function App() {
  const dispatch = useDispatch();
  const data = useSelector<StateType, DataType>(state => state.data);
  const [viewMode, setViewMode] = useState<ViewModeType>('none');
  const [selectedNoteId, setSelectedNoteId] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');

  useEffect(() => {
    dispatch(fetchDataTC());
  }, [dispatch]);

  const onNoteClickHandler = useCallback((noteId: string): void => {
    setSelectedNoteId(noteId);
    setViewMode('read');
  }, []);

  const onEditClickHandler = useCallback((noteId: string): void => {
    setSelectedNoteId(noteId);
    setViewMode('edit');
  }, []);

  const addNote = useCallback((title: string): void => {
    dispatch(addNoteTC(title));
  }, [dispatch]);

  const addTag = useCallback((title: string): void => {
    const isTagUnique: boolean = data.tags.every(tag => tag !== title.toLowerCase());
    isTagUnique && dispatch(addTagTC(title));
  }, [dispatch, data.tags]);

  const onDeleteNoteClickHandler = useCallback((noteId: string): void => {
    dispatch(removeNoteTC(noteId));
  }, [dispatch]);

  const onDeleteTagClickHandler = useCallback((tag: string): void => {
    dispatch(removeTagTC(tag));
  }, [dispatch]);

  const updateNoteText = useCallback((noteText: string): void => {
    const regex1: RegExp = /(?<=#)\b\w*\b/gi;
    const found: RegExpMatchArray | null = noteText.match(regex1);
    found && found.forEach(tag => addTag(tag));
    const regex2: RegExp = /#(?=\w)/gi;
    const noteTextWithoutHash: string = noteText.replace(regex2, '');
    dispatch(updateNoteTC(selectedNoteId, noteTextWithoutHash));
    setViewMode('none');
  }, [dispatch, addTag, selectedNoteId]);

  const returnWithoutChanges = useCallback((): void => {
    setViewMode('none');
  }, []);

  const onTagClick = useCallback((tag: string): void => {
    setSelectedTag(tag);
  }, []);

  const onResetClickHandler = useCallback((): void => {
    setSelectedTag('');
  }, []);

  if (!data.notes && !data.tags) {
    return (
      <div>Loading</div>
    );
  }

  const selectedNote: NoteType = data.notes.filter(note => note.id === selectedNoteId)[0];
  const filteredNotes: NoteType[] = data.notes.filter(note => {
    if (selectedTag === '') return true;
    const regex: RegExp = new RegExp(`\\b${selectedTag}\\b`, 'i');
    return regex.test(note.body);
  });

  return (
    <div className={styles.app}>
      {viewMode !== 'edit'
        ? <div className={styles.notesAndTags}>
          <AddItemForm addItem={addNote} name={'note title'}/>
          <Notes
            filteredNotes={filteredNotes}
            onNoteClickHandler={onNoteClickHandler}
            onEditClickHandler={onEditClickHandler}
            onDeleteNoteClickHandler={onDeleteNoteClickHandler}
          />
          <AddItemForm addItem={addTag} name={'tag name'}/>
          <Tags
            tags={data.tags}
            onTagClick={onTagClick}
            onDeleteTagClickHandler={onDeleteTagClickHandler}
            onResetClickHandler={onResetClickHandler}
          />
          {viewMode === 'read' &&
          <ViewNote selectedNote={selectedNote} setViewMode={setViewMode}/>}
        </div>
        : <NoteEditor
          selectedNote={selectedNote}
          updateNoteText={updateNoteText}
          returnWithoutChanges={returnWithoutChanges}
          tags={data.tags}
        />}
    </div>
  );
}

