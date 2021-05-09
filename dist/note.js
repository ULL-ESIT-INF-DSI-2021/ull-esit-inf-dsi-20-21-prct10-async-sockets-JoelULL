"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
/**
 * Clase note permite definir una nota para el usuario
 */
var Note = /** @class */ (function () {
    /**
     * Constructor que permite crear una nota
     * @param user usuario dueño de la nota
     * @param title titulo de la nota
     * @param body cuerpo de la nota
     * @param color color de la nota
     */
    function Note(user, title, body, color) {
        this.user = user;
        this.title = title;
        this.body = body;
        this.color = color;
    }
    /**
     * Método getter que devuelve al usuario
     * @returns usuario dueño de la nota
     */
    Note.prototype.getUser = function () {
        return this.user;
    };
    /**
     * Método getter que devuelve el titulo de la nota
     * @returns titulo de la nota
     */
    Note.prototype.getTitle = function () {
        return this.title;
    };
    /**
     * Método getter que devuelve el cuerpo de la nota
     * @returns cuerpo de la nota
     */
    Note.prototype.getBody = function () {
        return this.body;
    };
    /**
      * Método getter que devuelve el color de la nota
      * @returns color de la nota
      */
    Note.prototype.getColor = function () {
        return this.color;
    };
    /**
     * Método setter para añadir un nuevo usuario
     * @param newUser nuevo usuario
    */
    Note.prototype.setUser = function (newUser) {
        this.user = newUser;
    };
    /**
      * Método setter para añadir un nuevo titulo
      * @param newTitle nuevo titulo
    */
    Note.prototype.setTitle = function (newTitle) {
        this.title = newTitle;
    };
    /**
      * Método setter para añadir un nuevo body
      * @param newBody cuerpo
    */
    Note.prototype.setBody = function (newBody) {
        this.body = newBody;
    };
    /**
      * Método setter para añadir un nuevo color
      * @param newColor nuevo color
    */
    Note.prototype.setColor = function (newColor) {
        this.color = newColor;
    };
    return Note;
}());
exports.Note = Note;
