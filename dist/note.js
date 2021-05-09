"use strict";
/**
 * @enum colors Possible colors
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
var Note = /** @class */ (function () {
    function Note(user, title, body, color) {
        this.user = user;
        this.title = title;
        this.body = body;
        this.color = color;
    }
    Note.prototype.getName = function () {
        return this.user;
    };
    /**
     * Returns Note's title
     * @returns Note's title
     */
    Note.prototype.getTitle = function () {
        return this.title;
    };
    /**
     * Returns Note's body
     * @returns Note's body
     */
    Note.prototype.getBody = function () {
        return this.body;
    };
    /**
     * Returns Note's color
     * @returns Note's color
     */
    Note.prototype.getColor = function () {
        return this.color;
    };
    return Note;
}());
exports.Note = Note;
