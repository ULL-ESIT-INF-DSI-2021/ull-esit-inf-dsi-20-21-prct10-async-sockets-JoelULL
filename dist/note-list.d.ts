import { Note } from './note';
/**
 * Funcion que se utilizara para eliminar los espacios del titulo de una nota
 * en caso de que el usuario escriba un titulo con espacios estos se eliminaran
 * y la nota se guardara con el nombre sin espacios seguido de .json
 * @param str titulo de la nota
 * @returns titulo de la nota sin espacios
 */
export declare function removeSpaces(str: string): string;
/**
 * Funcion que recoge el color y comprueba si es valido
 * @param color color a comprobar
 * @returns si es valido o no
 */
export declare function validateColor(color: string): boolean;
/**
 * Clase que permitirá manejar las notas de los usuarios para los diferentes
 * comandos a implementar. Para esta practica se ha modificado el contenido de
 * la clase haciendo que en los diferentes metodos que incluye se haga uso de
 * la API de node.js para la manipulación de ficheros en vez de realizar esta
 * tarea en el archivo note-app.ts de la práctica 8.
 */
export declare class NoteList {
    constructor();
    /**
     * Método que permite añadir una nota a un directorio de un usuario.
     * Si el directorio no existe, se creara. En caso de que no haya una nota
     * con ese titulo se añadirá en caso contrario no. Si el color de la nota no es
     * un color permitido no se añadirá.
     * @param userNote nota a añadir
     * @returns true si se puede añadir, false en caso contrario.
     */
    addNote(userNote: Note): boolean;
    /**
     * Método que permitirá modificar una nota en caso de que exista.
     * @param userNote nota a modificar
     * @returns true si se ha modificado correctamente false en caso contrario
     */
    modifyNote(userNote: Note): boolean;
    /**
     * Método que permitirá eliminar una nota del directorio del usuario
     * @param user usuario a buscar
     * @param title titulo de la nota a buscar
     * @returns true si se ha eliminado false en otro caso
     */
    deleteNote(user: string, title: string): boolean;
    /**
     * Método que permitirá listar las notas del directorio de un usuario
     * @param user usuario a listar sus notas
     * @returns devuelve la lista de notas del usuario en cuestion
     * en caso de que el usuario no exista, la lista estará vacia y si es
     * asi se manejará este error en el servidor.
     */
    listNotes(user: string): Note[];
    /**
     * Método que permitirá leer una nota especifica del directorio del usuario
     * @param user usuario a buscar
     * @param title titulo de la nota a leer
     * @returns true si se puede leer la nota false en otro caso
     */
    readSpecificNote(user: string, title: string): Note;
}
