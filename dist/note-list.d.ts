import { Note } from './note';
export declare class NoteList {
    constructor();
    addNote(userNote: Note): boolean;
    modifyNote(userNote: Note): boolean;
    deleteNote(user: string, title: string): boolean;
    listNotes(user: string): Note[];
    readSpecificNote(user: string, title: string): Note;
}
