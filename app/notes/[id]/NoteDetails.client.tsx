'use client';

import { useRouter } from 'next/navigation';
import css from './NoteDetails.module.css';

interface Note {
  id: string;
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
  createdAt: string;
}

interface Props {
  note: Note;
}

export default function NoteDetailsClient({ note }: Props) {
  const router = useRouter();

  if (!note) return null;

  return (
    <div className={css.container}>
      <button className={css.backButton} onClick={() => router.back()}>
        Back to notes
      </button>

      <div className={css.card}>
        <div className={css.header}>
          <h1 className={css.title}>{note.title}</h1>
          <span className={css.tag}>{note.tag}</span>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>Created: {new Date(note.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
