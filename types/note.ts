export type NoteTag = 'Work' | 'Personal' | 'Home' | 'Important' | 'Other';

export interface Note {
  id: string;
  title: string;
  content?: string; // Опціонально за ТЗ
  tag: NoteTag;
  createdAt: string;
  updatedAt: string; // Додано за вимогою
}

export type CreateNoteDto = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;
