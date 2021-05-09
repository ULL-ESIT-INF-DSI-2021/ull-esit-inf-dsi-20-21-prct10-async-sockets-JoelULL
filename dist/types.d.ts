import { Note } from './note';
export declare type RequestType = {
    type: 'add' | 'modify' | 'remove' | 'read' | 'list';
    user: string;
    title?: string;
    body?: string;
    color?: string;
};
export declare type ResponseType = {
    type: 'add' | 'modify' | 'remove' | 'read' | 'list';
    success: boolean;
    notes?: Note[];
};
