/**
 * Clase note permite definir una nota para el usuario
 */
export class Note {
    /**
     * Constructor que permite crear una nota
     * @param user usuario dueño de la nota
     * @param title titulo de la nota
     * @param body cuerpo de la nota
     * @param color color de la nota
     */
  constructor(private user : string, private title : string, private body : string, 
    private color : string) { 
  }
    /**
     * Método getter que devuelve al usuario
     * @returns usuario dueño de la nota
     */
  getUser(): string {
    return this.user;
  }
    /**
     * Método getter que devuelve el titulo de la nota
     * @returns titulo de la nota
     */
  getTitle(): string {
    return this.title;
  }
    /**
     * Método getter que devuelve el cuerpo de la nota
     * @returns cuerpo de la nota
     */
  getBody(): string {
    return this.body;
  }
   /**
     * Método getter que devuelve el color de la nota
     * @returns color de la nota
     */
  getColor(): string {
    return this.color;
  }
/**
 * Método setter para añadir un nuevo usuario
 * @param newUser nuevo usuario
*/
  setUser(newUser : string) {
    this.user = newUser;
  }
  /**
    * Método setter para añadir un nuevo titulo
    * @param newTitle nuevo titulo
  */
  setTitle(newTitle : string) {
      this.title = newTitle;
  }
  /**
    * Método setter para añadir un nuevo body
    * @param newBody cuerpo
  */
  setBody(newBody : string) {
    this.body = newBody;
  } 
  /**
    * Método setter para añadir un nuevo color
    * @param newColor nuevo color
  */
  setColor(newColor : string) {
    this.color = newColor;
  }
}