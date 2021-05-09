"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteList = void 0;
var fs = require("fs");
var note_1 = require("./note");
function removeSpaces(str) {
    var result = str.replace(/\s/g, "");
    return result;
}
function validateColor(color) {
    var colorList = ["red", "green", "blue", "yellow"];
    var founded = false;
    for (var i = 0; i < colorList.length; i++) {
        if (color == colorList[i])
            founded = true;
    }
    return founded;
}
var NoteList = /** @class */ (function () {
    function NoteList() {
    }
    NoteList.prototype.addNote = function (userNote) {
        var note = userNote;
        var tojson = JSON.stringify(note, null, 2);
        var dir = "../../users/" + userNote.getName();
        var titletojson = removeSpaces(userNote.getTitle());
        var jsonote = dir + "/" + titletojson + ".json";
        if (!validateColor(userNote.getColor()))
            return false;
        if (fs.existsSync(dir)) {
            if (!fs.existsSync(jsonote)) {
                fs.writeFileSync(jsonote, tojson);
                return true;
            }
            return false;
        }
        else {
            fs.mkdirSync(dir);
            fs.writeFileSync(jsonote, tojson);
            return true;
        }
    };
    NoteList.prototype.modifyNote = function (userNote) {
        var note = userNote;
        var tojson = JSON.stringify(note, null, 2);
        var dir = "../../users/" + userNote.getName();
        var titletojson = removeSpaces(userNote.getTitle());
        var jsonote = dir + "/" + titletojson + ".json";
        if (fs.existsSync(dir)) {
            if (fs.existsSync(jsonote)) {
                fs.writeFileSync(jsonote, tojson);
                return true;
            }
            return false;
        }
        else {
            return false;
        }
    };
    NoteList.prototype.deleteNote = function (user, title) {
        var titletojson = removeSpaces(title);
        var dir = "../../users/" + user;
        var jsonote = dir + "/" + titletojson + ".json";
        if (fs.existsSync(dir)) {
            if (fs.existsSync(jsonote)) {
                fs.rmSync(jsonote);
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    };
    NoteList.prototype.listNotes = function (user) {
        var usernotelist = [];
        var dir = "../../users/" + user;
        if (fs.existsSync(dir)) {
            fs.readdirSync(dir).forEach(function (note) {
                var content = fs.readFileSync(dir + "/" + note);
                var userNote = JSON.parse(content.toString());
                usernotelist.push(new note_1.Note(user, userNote.title, userNote.body, userNote.color));
            });
        }
        return usernotelist;
    };
    NoteList.prototype.readSpecificNote = function (user, title) {
        var titletojson = removeSpaces(title);
        var dir = "../../users/" + user;
        var jsonote = dir + "/" + titletojson + ".json";
        var content = fs.readFileSync(jsonote);
        var userNote = JSON.parse(content.toString());
        return new note_1.Note(user, userNote.title, userNote.body, userNote.color);
    };
    return NoteList;
}());
exports.NoteList = NoteList;
