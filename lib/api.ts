import axios from 'axios';
import { Note, CreateNoteDto } from '@/types/note';

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
});

api.interceptors.request.use(config => {
  const token = process.env.NEXT_PUBLIC_API_TOKEN;

  if (token) {
    const cleanToken = token.replace(/['"]+/g, '').trim();
    config.headers.Authorization = `Bearer ${cleanToken}`;
  }

  return config;
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  search = '',
  page = 1,
  perPage = 6
): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params: { search, page, perPage },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: CreateNoteDto): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};

export default api;
