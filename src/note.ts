
export class Note {

  constructor(private user : string, private title : string, private body : string, private color : string) {}

  getName(): string {
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
}