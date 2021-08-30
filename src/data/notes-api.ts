import { v1 as uuidv1 } from 'uuid';

const data: DataType = require('./data.json');

export type NoteType = {
  id: string
  title: string
  body: string
}

export type DataType = {
  notes: NoteType[]
  tags: string[]
}

export const notesApi = {
  getData(): Promise<DataType> {
    return new Promise((resolve) => resolve(data));
  },
  addNote(title: string): Promise<NoteType> {
    const newNote = { id: uuidv1(), title, body: '' };
    return new Promise(resolve => resolve(newNote));
  },
  removeNote(noteId: string): Promise<{ resultCode: number }> {
    return new Promise(resolve => resolve({ resultCode: 0 }));
  },
  addTag(title: string): Promise<string> {
    return new Promise(resolve => resolve(title));
  },
  removeTag(tag: string): Promise<{ resultCode: number }> {
    return new Promise(resolve => resolve({ resultCode: 0 }));
  },
  updateNote(noteId: string, body: string): Promise<string> {
    return new Promise(resolve => resolve(body));
  }
};