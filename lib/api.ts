import axios from 'axios';
import { Note } from '@/types/note';

const instance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
});

instance.interceptors.request.use(config => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface FetchNotesResponse {
  notes: Note[];
  totalNotes: number;
  totalPages: number;
}

export const fetchNotes = async (page: number, search: string): Promise<FetchNotesResponse> => {
  const { data } = await instance.get<FetchNotesResponse>('/notes', {
    params: { page, search, perPage: 12 },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await instance.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (
  note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Note> => {
  const { data } = await instance.post<Note>('/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await instance.delete<void>(`/notes/${id}`);
};
