import { Note } from './note';
/**
 * Tipo definido para la peticion que se le hara al servidor
 * en el se pedirá el tipo de comando y los diferentes parametros
 * que necesiten estos comandos siendo obligatorios el usuario
 * y el tipo de comando
 */
export declare type RequestType = {
    type: 'add' | 'modify' | 'remove' | 'read' | 'list';
    user: string;
    title?: string;
    body?: string;
    color?: string;
};
/**
 * Tipo definido para la respuesta que dara el servidor
 * en el se pedirá el tipo de comando, success que mostrará
 * el existo al realizar la peticición y una lista de notas
 * no obligatorias que se usará para albergar las notas del
 * usuario que se deseen listar o leer.
 */
export declare type ResponseType = {
    type: 'add' | 'modify' | 'remove' | 'read' | 'list';
    success: boolean;
    notes?: Note[];
};
