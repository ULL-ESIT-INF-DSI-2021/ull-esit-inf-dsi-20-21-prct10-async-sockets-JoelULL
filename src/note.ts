
export class Note {

  constructor(private user : string, private title : string, private body : string, 
    private color : string) { 
  }

  getUser(): string {
    return this.user;
  }

  getTitle(): string {
    return this.title;
  }

  getBody(): string {
    return this.body;
  }

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