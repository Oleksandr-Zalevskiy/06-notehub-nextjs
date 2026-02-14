'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './NotesPage.module.css';

export default function NotesClient() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading } = useQuery({
    queryKey: ['notes', debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page),
    placeholderData: previousData => previousData,
  });

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className={css.container}>
      <div className={css.headerActions}>
        <SearchBox
          value={search}
          onChange={val => {
            setSearch(val);
            setPage(1);
          }}
        />
        <button className={css.addButton} onClick={() => setIsModalOpen(true)}>
          Add Note
        </button>
      </div>

      {isLoading ? (
        <div className={css.loader}>Loading...</div>
      ) : (
        <>
          <NoteList notes={notes} />

          {totalPages > 1 && (
            <div className={css.paginationWrapper}>
              <Pagination
                total={totalPages}
                current={page - 1}
                onChange={selected => setPage(selected + 1)}
              />
            </div>
          )}
        </>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onSuccess={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
