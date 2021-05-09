
/**
 * @enum colors Possible colors
 */



export class Note {

  constructor(private user : string, private title : string, private body : string, private color : string) {}

  getName(): string {
    return this.user;
  }
  /**
   * Returns Note's title
   * @returns Note's title
   */
  getTitle(): string {
    return this.title;
  }
  /**
   * Returns Note's body
   * @returns Note's body
   */
  getBody(): string {
    return this.body;
  }
  /**
   * Returns Note's color
   * @returns Note's color
   */
  getColor(): string {
    return this.color;
  }
}