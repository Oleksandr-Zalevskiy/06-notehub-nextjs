'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { CreateNoteDto } from '@/types/note';
import css from './NoteForm.module.css';

const NoteForm = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newNote: CreateNoteDto) => createNote(newNote),
    onSuccess: () => {
      // Оновлюємо кеш, щоб нова нотатка з'явилася в списку
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const noteData: CreateNoteDto = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as string,
    };

    mutation.mutate(noteData);
    e.currentTarget.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" required className={css.input} />
      <input name="tag" placeholder="Tag" required className={css.input} />
      <textarea name="content" placeholder="Content" required className={css.textarea} />
      <button type="submit" disabled={mutation.isPending} className={css.button}>
        {mutation.isPending ? 'Adding...' : 'Add Note'}
      </button>
    </form>
  );
};

export default NoteForm;
