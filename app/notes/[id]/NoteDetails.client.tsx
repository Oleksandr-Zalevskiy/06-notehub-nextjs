'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.module.css';

export default function NoteDetailsClient() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <div className={css.loader}>Loading note...</div>;
  if (isError || !note) return <div className={css.error}>Note not found</div>;

  return (
    <div className={css.container}>
      <button className={css.backButton} onClick={() => router.back()}>
        ← Back
      </button>

      <article className={css.noteCard}>
        <header className={css.header}>
          <h1 className={css.title}>{note.title}</h1>
          <span className={css.tag}>{note.tag}</span>
        </header>

        <div className={css.content}>
          <p>{note.content}</p>
        </div>

        <footer className={css.footer}>
          <span className={css.date}>Created: {new Date(note.createdAt).toLocaleDateString()}</span>
        </footer>
      </article>
    </div>
  );
}
