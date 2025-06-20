import { QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api'
import NotesClient from './Notes.client';

type Props = {
    params: Promise<{ query: string, page: number}>;
}

export default async function Notes({ params}: Props) {
    const { query } = await params;
    const { page } = await params;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['note'],
        queryFn: () => fetchNotes(query, page)
    })
  return (
    <NotesClient />
  )
}
