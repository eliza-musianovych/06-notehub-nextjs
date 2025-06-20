'use client';

import css from './noteDetails.module.css'
import { fetchNoteById } from '@/lib/api'
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function NoteDetailsClient() {
    const { id } = useParams<{ id: string }>();
    const numericId = Number(id);

    const {data: note, isLoading, error} = useQuery({
        queryKey: ['notes', numericId],
        queryFn: () => fetchNoteById(numericId),
        refetchOnMount: false,
    });

    if (isLoading) return <p>Loading, please wait...</p>;

    if (error || !note) return <p>Something went wrong.</p>;

    return (
        <div className={css.container}>
	<div className={css.item}>
	  <div className={css.header}>
	    <h2>{note.title}</h2>
	    <button className={css.editBtn}>Edit note</button>
	  </div>
	  <p className={css.content}>{note.content}</p>
	  <p className={css.date}>{note.createdAt}</p>
	</div>
</div>
    )
}