import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

export default async function NotePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const queryClient = new QueryClient();

  const note = await queryClient.fetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient note={note} />
    </HydrationBoundary>
  );
}
