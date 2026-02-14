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

export default function NotesClient() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['notes', debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page),
    placeholderData: previousData => previousData,
  });

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Add Note</button>
      <SearchBox value={search} onChange={handleSearchChange} />

      {isLoading ? <p>Loading...</p> : <NoteList notes={data?.notes || []} />}

      <Pagination
        total={data?.totalPages || 1}
        current={page - 1}
        onChange={selected => setPage(selected + 1)}
      />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onCancel={() => setIsModalOpen(false)}
            onSubmit={values => {
              console.log(values);
              setIsModalOpen(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}
