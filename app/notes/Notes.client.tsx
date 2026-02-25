'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNotes, deleteNote } from '@/lib/api';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import Pagination from '@/components/Pagination/Pagination';

import css from './Notes.module.css';

export default function NotesClient() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';

  const [isOpen, setIsOpen] = useState(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('search', value);
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  }, 500);

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes(page, search),
    retry: 1,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (error) return <p className={css.error}>Something went wrong.</p>;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={(value: string) => debouncedSearch(value)} />

        <div className={css.paginationWrapper}>
          {data && data.totalPages > 1 && <Pagination totalPages={data.totalPages} />}
        </div>

        <button className={css.createButton} onClick={() => setIsOpen(true)}>
          Create note +
        </button>
      </header>

      <main>
        {isLoading ? (
          <p className={css.loader}>Loading notes...</p>
        ) : (
          data?.notes && <NoteList notes={data.notes} onDelete={handleDelete} />
        )}
      </main>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
