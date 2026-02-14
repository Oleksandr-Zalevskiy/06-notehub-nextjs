import axios from 'axios';
import { Note, CreateNoteDto } from '../types/note';

const api = axios.create({
  baseURL: 'https://6709409faf1a1997aaee399e.mockapi.io',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export const fetchNotes = async (): Promise<Note[]> => {
  const { data } = await api.get('/notes');
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get(`/notes/${id}`);
  return data;
};

export const createNote = async (note: CreateNoteDto): Promise<Note> => {
  const { data } = await api.post('/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};
