import axios from "axios";
import type { Note } from "@/types/note";
import type { NewNote } from "@/types/note";

interface NotesHttpResponse {
    notes: Note[];
    totalPages: number;
}

const URL = 'https://notehub-public.goit.study/api/notes';

export const fetchNotes = async(query?: string, page: number = 1): Promise<NotesHttpResponse> => { 
    const parameters = new URLSearchParams({
        ...(query !=='' ? {search: query}:{}),
        page: page.toString() ,
    })
    const response = await axios.get<NotesHttpResponse>(
        `${URL}?${parameters}`, {
        headers: {
            Authorization: process.env.NEXT_PUBLIC_NOTEHUB_TOKEN,
        },
});
    return response.data;
};

export const createNote = async(newNote: NewNote): Promise<Note> => {
    const response = await axios.post<Note>(
        `${URL}`, 
        newNote, {
        headers: {
            Authorization: process.env.NEXT_PUBLIC_NOTEHUB_TOKEN,
        },
});
    return response.data;
};

export const deleteNote = async(id: number): Promise<Note> => {
    const response = await axios.delete<Note>(
        `${URL}/${id}`, {
        headers: {
            Authorization: process.env.NEXT_PUBLIC_NOTEHUB_TOKEN,
        },
});
    return response.data;
};

export const fetchNoteById = async(id: number): Promise<Note> => {
    const response = await axios.get<Note>(
        `${URL}/${id}`, {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_NOTEHUB_TOKEN,
        },  
});
return  response.data;
}