import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api'
import NotesClient from './Notes.client';

type Props = {
    params: { initialQuery?: string, initialPage?: number};
}

export default async function Notes({ params}: Props) {
    const initialQuery = params.initialQuery ?? '';
    const initialPage = Number(params.initialPage ?? 1);
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['note', initialQuery, initialPage],
        queryFn: () => fetchNotes(initialQuery, initialPage)
    })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialQuery={initialQuery} initialPage={initialPage} />
    </HydrationBoundary>
  )
}
