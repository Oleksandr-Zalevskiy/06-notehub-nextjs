'use client';

import { Note } from '@/types/note';
import css from './NoteDetails.module.css';

interface Props {
  note: Note;
}

export default function NoteDetailsClient({ note }: { note: Note }) {
  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{new Date(note.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
