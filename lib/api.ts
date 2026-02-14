import axios from 'axios';
import { Note, CreateNoteDto } from '../types/note';

const api = axios.create({
  baseURL: 'https://6709409faf1a1997aaee399e.mockapi.io',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  search: string = '',
  page: number = 1
): Promise<FetchNotesResponse> => {
  // MockAPI зазвичай повертає масив.totalPages вираховуємо або беремо з заголовків
  const { data } = await api.get<Note[]>(`/notes`, {
    params: { title: search, page, limit: 10 },
  });
  return { notes: data, totalPages: 5 }; // На MockAPI totalPages зазвичай фіксований або через X-Total-Count
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: CreateNoteDto): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes`, { params: note }); // Або post, залежить від MockAPI
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};
