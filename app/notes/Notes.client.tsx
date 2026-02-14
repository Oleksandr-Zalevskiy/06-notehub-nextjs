'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import css from './NotesPage.module.css';

export default function NotesClient() {
  const [search, setSearch] = useState('');
  const { data: notes, isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  const filteredNotes =
    notes?.filter(
      note =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.tag.toLowerCase().includes(search.toLowerCase())
    ) || [];

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={css.container}>
      <NoteForm />
      <SearchBox value={search} onChange={setSearch} />
      <NoteList notes={filteredNotes} />
    </div>
  );
}
