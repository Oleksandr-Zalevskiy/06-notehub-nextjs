'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { Note } from '@/types/note';
import css from './NoteDetails.module.css';

export default function NoteDetailsClient() {
  const params = useParams();
  const id = params?.id as string;

  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),

    refetchOnMount: false,

    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className={css.container}>
        <p className={css.message}>Loading note details...</p>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className={css.container}>
        <p className={`${css.message} ${css.error}`}>
          Error: Could not find the note you are looking for.
        </p>
      </div>
    );
  }

  return (
    <div className={css.container}>
      <article className={css.card}>
        <div className={css.header}>
          <h1 className={css.title}>{note.title}</h1>
          <span className={css.tag}>{note.tag}</span>
        </div>

        <div className={css.content}>
          <p>{note.content || 'No content provided for this note.'}</p>
        </div>

        <div className={css.footer}>
          <div className={css.dates}>
            <p>Created: {new Date(note.createdAt).toLocaleString()}</p>
            {note.updatedAt && <p>Updated: {new Date(note.updatedAt).toLocaleString()}</p>}
          </div>
        </div>
      </article>
    </div>
  );
}
