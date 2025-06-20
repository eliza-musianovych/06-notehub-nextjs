'use client';

import css from './App.module.css'
import NoteList from '@/components/NoteList/NoteList'
import NoteModal from '@/components/NoteModal/NoteModal'
import Pagination from '@/components/Pagination/Pagination'
import SearchBox from '@/components/SearchBox/SearchBox'
import { useState } from 'react'
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export default function NotesClient() {
    const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isCreateNote, setIsCreateNote] =useState<boolean>(false);

  const updateQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        setPage(1);
    };
    
    const [debouncedQuery] = useDebounce(query, 300);

     const {data, isSuccess} = useQuery({
    queryKey: ['notes', debouncedQuery, page],
    queryFn: () => fetchNotes(debouncedQuery, page),
    placeholderData: keepPreviousData,
  })

  const handleClick = () => setIsCreateNote(true);
  const handleClose = () => setIsCreateNote(false)

    return (
        <div className={css.app}>
	      <header className={css.toolbar}>
          <SearchBox query={query} updateQuery={updateQuery}/>
          {data?.totalPages && 
          data.totalPages > 1 && 
          <Pagination 
          page={page} 
          totalPages={data?.totalPages}
          onPageChange={setPage}
          />}
          <button onClick={handleClick} className={css.button}>Create note +</button>
        </header>
        {isSuccess && 
        data.notes.length > 0 && 
        <NoteList notes={data.notes} />}
        {isCreateNote &&
        <NoteModal onClose={handleClose}/>}
    </div>
    )
}