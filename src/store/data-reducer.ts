import { Dispatch } from 'redux';

import { DataType, notesApi, NoteType } from '../data/notes-api';

type ActionsType =
  SetDataActionType
  | AddNoteActionType
  | RemoveNoteActionType
  | AddTagActionType
  | RemoveTagActionType
  | UpdateNoteActionType

type SetDataActionType = {
  type: 'SET-DATA'
  data: DataType
}
type AddNoteActionType = {
  type: 'ADD-NOTE'
  note: NoteType
}
type RemoveNoteActionType = {
  type: 'REMOVE-NOTE'
  noteId: string
}
type AddTagActionType = {
  type: 'ADD-TAG'
  tag: string
}
type RemoveTagActionType = {
  type: 'REMOVE-TAG'
  tag: string
}
type UpdateNoteActionType = {
  type: 'UPDATE-NOTE'
  noteId: string
  body: string
}

const initialState = {} as DataType;

export const dataReducer = (state: DataType = initialState, action: ActionsType): DataType => {
  switch (action.type) {
    case 'SET-DATA':
      return { ...state, notes: action.data.notes, tags: action.data.tags };
    case 'ADD-NOTE':
      return { ...state, notes: [...state.notes, action.note] };
    case 'REMOVE-NOTE':
      return { ...state, notes: state.notes.filter(note => note.id !== action.noteId) };
    case 'ADD-TAG':
      return { ...state, tags: [...state.tags, action.tag] };
    case 'REMOVE-TAG':
      return { ...state, tags: state.tags.filter(tag => tag !== action.tag) };
    case 'UPDATE-NOTE':
      return {
        ...state, notes: state.notes.map(note => note.id === action.noteId ? {
          ...note, body: action.body
        } : note)
      };
    default:
      return { ...state };
  }
};

const setDataAC = (data: DataType): SetDataActionType => {
  return { type: 'SET-DATA', data } as const;
};
const addNoteAC = (note: NoteType): AddNoteActionType => {
  return { type: 'ADD-NOTE', note } as const;
};
const removeNoteAC = (noteId: string): RemoveNoteActionType => {
  return { type: 'REMOVE-NOTE', noteId } as const;
};
const addTagAC = (tag: string): AddTagActionType => {
  return { type: 'ADD-TAG', tag } as const;
};
const removeTagAC = (tag: string): RemoveTagActionType => {
  return { type: 'REMOVE-TAG', tag } as const;
};
const updateNoteAC = (noteId: string, body: string): UpdateNoteActionType => {
  return { type: 'UPDATE-NOTE', noteId, body } as const;
};

export const fetchDataTC = () => (dispatch: Dispatch) => {
  notesApi.getData()
    .then(response => {
      dispatch(setDataAC(response));
    });
};

export const addNoteTC = (title: string) => (dispatch: Dispatch) => {
  notesApi.addNote(title)
    .then(response => {
      dispatch(addNoteAC(response));
    });
};

export const removeNoteTC = (noteId: string) => (dispatch: Dispatch) => {
  notesApi.removeNote(noteId)
    .then(response => {
      !response.resultCode && dispatch(removeNoteAC(noteId));
    });
};

export const addTagTC = (title: string) => (dispatch: Dispatch) => {
  notesApi.addTag(title)
    .then(response => {
      dispatch(addTagAC(response));
    });
};

export const removeTagTC = (tag: string) => (dispatch: Dispatch) => {
  notesApi.removeTag(tag)
    .then(response => {
      !response.resultCode && dispatch(removeTagAC(tag));
    });
};

export const updateNoteTC = (noteId: string, body: string) => (dispatch: Dispatch) => {
  notesApi.updateNote(noteId, body)
    .then(response => {
      dispatch(updateNoteAC(noteId, response));
    });
};
