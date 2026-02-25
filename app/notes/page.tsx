import { Suspense } from 'react';
import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, ''],
    queryFn: () => fetchNotes(1, ''),
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading interface...</div>}>
          <NotesClient />
        </Suspense>
      </HydrationBoundary>
    </main>
  );
}
