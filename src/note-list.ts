import * as fs from 'fs';
import {Note} from './note';

export function removeSpaces(str : string) : string {
    let result : string = str.replace(/\s/g,"");
    return result;
}
export function validateColor(color : string) : boolean {
    let colorList : string[] = ["red","green","blue","yellow"];
    let founded : boolean = false
    for (let i = 0; i < colorList.length; i++) {
        if (color == colorList[i])
        founded = true;
    }
    return founded;
}

export class NoteList {

  constructor() {}

  addNote(userNote: Note): boolean {
    let note : Note = userNote;
    let tojson = JSON.stringify(note, null, 2);
    let dir : string = "../../users/" + userNote.getUser();
    let titletojson = removeSpaces(userNote.getTitle());
    let jsonote : string = dir + "/" + titletojson + ".json";

    if (!validateColor(userNote.getColor()) )
        return false;

    if (fs.existsSync(dir)) {
      if (!fs.existsSync(jsonote)) {
        fs.writeFileSync(jsonote, tojson);
        return true;
      }
      return false;
    } else {
        fs.mkdirSync(dir);
        fs.writeFileSync(jsonote, tojson);
        return true;
    }
  }

  modifyNote(userNote: Note): boolean {
    let note : Note = userNote;
    let tojson = JSON.stringify(note, null, 2);
    let dir : string = "../../users/" + userNote.getUser();
    let titletojson = removeSpaces(userNote.getTitle());
    let jsonote : string = dir + "/" + titletojson + ".json";

    if (fs.existsSync(dir)) {
        if (fs.existsSync(jsonote)) {
            fs.writeFileSync(jsonote, tojson);
            return true;
      }
      return false;
    } else {
        return false;
    }
  }

  deleteNote(user: string, title: string): boolean {
    let titletojson = removeSpaces(title);
    let dir : string = "../../users/" + user;
    let jsonote : string = dir + "/" + titletojson + ".json";
    if (fs.existsSync(dir)) {
        if (fs.existsSync(jsonote)) {
            fs.rmSync(jsonote);
            return true;
        } else {
            return false;
        }
    }
    return false;
  }

  listNotes(user: string): Note[] {
    let usernotelist : Note[] = [];
    let dir : string = "../../users/" + user;
    if (fs.existsSync(dir)) {
      fs.readdirSync(dir).forEach((note) => {
        let content = fs.readFileSync(dir + "/" + note);
        let userNote = JSON.parse(content.toString());
        usernotelist.push(new Note(user, userNote.title, userNote.body, userNote.color));
      });
    }
    return usernotelist;
  }

  readSpecificNote(user: string, title: string): Note {
    let titletojson = removeSpaces(title);
    let dir : string = "../../users/" + user;
    let jsonote : string = dir + "/" + titletojson + ".json";
    let content = fs.readFileSync(jsonote);
    let userNote = JSON.parse(content.toString());

    return new Note(user, userNote.title, userNote.body, userNote.color);
  }
}