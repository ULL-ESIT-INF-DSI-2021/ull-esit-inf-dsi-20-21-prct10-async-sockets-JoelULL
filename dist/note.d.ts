/**
 * Clase note permite definir una nota para el usuario
 */
export declare class Note {
    private user;
    private title;
    private body;
    private color;
    /**
     * Constructor que permite crear una nota
     * @param user usuario dueño de la nota
     * @param title titulo de la nota
     * @param body cuerpo de la nota
     * @param color color de la nota
     */
    constructor(user: string, title: string, body: string, color: string);
    /**
     * Método getter que devuelve al usuario
     * @returns usuario dueño de la nota
     */
    getUser(): string;
    /**
     * Método getter que devuelve el titulo de la nota
     * @returns titulo de la nota
     */
    getTitle(): string;
    /**
     * Método getter que devuelve el cuerpo de la nota
     * @returns cuerpo de la nota
     */
    getBody(): string;
    /**
      * Método getter que devuelve el color de la nota
      * @returns color de la nota
      */
    getColor(): string;
    /**
     * Método setter para añadir un nuevo usuario
     * @param newUser nuevo usuario
    */
    setUser(newUser: string): void;
    /**
      * Método setter para añadir un nuevo titulo
      * @param newTitle nuevo titulo
    */
    setTitle(newTitle: string): void;
    /**
      * Método setter para añadir un nuevo body
      * @param newBody cuerpo
    */
    setBody(newBody: string): void;
    /**
      * Método setter para añadir un nuevo color
      * @param newColor nuevo color
    */
    setColor(newColor: string): void;
}
