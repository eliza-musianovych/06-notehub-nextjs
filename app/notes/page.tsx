import { fetchNotes } from '@/lib/api'
import NotesClient from './Notes.client';

export default async function Notes() {
    const notes = await fetchNotes();

  return (
      <NotesClient initialNotes={notes} />
  )
}
