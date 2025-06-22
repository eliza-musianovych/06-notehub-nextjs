import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api'
import NotesClient from './Notes.client';

type PageProps = {
    searchParams: { initialQuery?: string, initialPage?: number};
}

export default async function Notes({ searchParams}: PageProps) {
    const initialQuery = searchParams.initialQuery ?? '';
    const initialPage = Number(searchParams.initialPage ?? 1);
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['note', initialQuery, initialPage],
        queryFn: () => fetchNotes(initialQuery, initialPage)
    })

    const notes = await fetchNotes(initialQuery, initialPage);

    const initialNotes = {
      ...notes, 
      query: initialQuery,
      page: initialPage,
    };

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialNotes={initialNotes} />
    </HydrationBoundary>
  )
}
