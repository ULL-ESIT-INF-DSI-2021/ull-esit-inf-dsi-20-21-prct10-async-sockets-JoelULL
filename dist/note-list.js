"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteList = exports.validateColor = exports.removeSpaces = void 0;
var fs = require("fs");
var note_1 = require("./note");
/**
 * Funcion que se utilizara para eliminar los espacios del titulo de una nota
 * en caso de que el usuario escriba un titulo con espacios estos se eliminaran
 * y la nota se guardara con el nombre sin espacios seguido de .json
 * @param str titulo de la nota
 * @returns titulo de la nota sin espacios
 */
function removeSpaces(str) {
    var result = str.replace(/\s/g, "");
    return result;
}
exports.removeSpaces = removeSpaces;
/**
 * Funcion que recoge el color y comprueba si es valido
 * @param color color a comprobar
 * @returns si es valido o no
 */
function validateColor(color) {
    var colorList = ["red", "green", "blue", "yellow"];
    var founded = false;
    for (var i = 0; i < colorList.length; i++) {
        if (color == colorList[i])
            founded = true;
    }
    return founded;
}
exports.validateColor = validateColor;
/**
 * Clase que permitirá manejar las notas de los usuarios para los diferentes
 * comandos a implementar. Para esta practica se ha modificado el contenido de
 * la clase haciendo que en los diferentes metodos que incluye se haga uso de
 * la API de node.js para la manipulación de ficheros en vez de realizar esta
 * tarea en el archivo note-app.ts de la práctica 8.
 */
var NoteList = /** @class */ (function () {
    function NoteList() {
    }
    /**
     * Método que permite añadir una nota a un directorio de un usuario.
     * Si el directorio no existe, se creara. En caso de que no haya una nota
     * con ese titulo se añadirá en caso contrario no. Si el color de la nota no es
     * un color permitido no se añadirá.
     * @param userNote nota a añadir
     * @returns true si se puede añadir, false en caso contrario.
     */
    NoteList.prototype.addNote = function (userNote) {
        var note = userNote;
        var tojson = JSON.stringify(note, null, 2);
        var dir = "../../users/" + userNote.getUser();
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
    /**
     * Método que permitirá modificar una nota en caso de que exista.
     * @param userNote nota a modificar
     * @returns true si se ha modificado correctamente false en caso contrario
     */
    NoteList.prototype.modifyNote = function (userNote) {
        var note = userNote;
        var tojson = JSON.stringify(note, null, 2);
        var dir = "../../users/" + userNote.getUser();
        var titletojson = removeSpaces(userNote.getTitle());
        var jsonote = dir + "/" + titletojson + ".json";
        if (!validateColor(userNote.getColor()))
            return false;
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
    /**
     * Método que permitirá eliminar una nota del directorio del usuario
     * @param user usuario a buscar
     * @param title titulo de la nota a buscar
     * @returns true si se ha eliminado false en otro caso
     */
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
    /**
     * Método que permitirá listar las notas del directorio de un usuario
     * @param user usuario a listar sus notas
     * @returns devuelve la lista de notas del usuario en cuestion
     * en caso de que el usuario no exista, la lista estará vacia y si es
     * asi se manejará este error en el servidor.
     */
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
    /**
     * Método que permitirá leer una nota especifica del directorio del usuario
     * @param user usuario a buscar
     * @param title titulo de la nota a leer
     * @returns true si se puede leer la nota false en otro caso
     */
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
