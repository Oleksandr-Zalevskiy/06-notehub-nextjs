import axios from 'axios';
import { Note } from '@/types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (page: number, search = ''): Promise<FetchNotesResponse> => {
  const { data } = await instance.get('/notes', {
    params: { page, perPage: 12, search },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await instance.get(`/notes/${id}`);
  return data;
};

export const createNote = async (note: Omit<Note, 'id' | 'createdAt'>) => {
  const { data } = await instance.post('/notes', note);
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await instance.delete(`/notes/${id}`);
  return data;
};
