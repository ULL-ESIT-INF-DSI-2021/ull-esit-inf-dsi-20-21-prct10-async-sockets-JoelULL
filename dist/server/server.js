"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var note_1 = require("../note");
var chalk = require("chalk");
var net = require("net");
var note_list_1 = require("../note-list");
var eventEmitterServer_1 = require("./eventEmitterServer");
/**
 * Se crear el servidor y se genera un objeto server.
 */
var server = net.createServer(function (connection) {
    var emitter = new eventEmitterServer_1.MessageEventEmitterServer(connection);
    console.log(chalk.bold.green('User join the server'));
    emitter.on('request', function (message) {
        var request = message;
        var userlist = new note_list_1.NoteList();
        /**
         * Se rellena por defecto la respuesta
         * del servidor. Utilizará ResponseType
         * definida en el archivo types.ts
         */
        var response = {
            type: 'add',
            success: true,
        };
        /**
         * En funcion de el tipo de comando que el usuario haya ingresado
         * el tipo de resupesta llamará a los metodos correspondientes para
         * comprobar si ha habido exito en las llamadas a estos métodos. En caso de que haya
         * exito se realizaran los cambios pertinentes del comando introducido.
         * En caso de que no se conozca el tipo de petición que se ha generado, es
         * decir el comando que ha ingresado el usuario, se mostrará un mensaje de error.
         */
        var usernote = new note_1.Note(request.user, request.title, request.body, request.color);
        switch (request.type) {
            case 'add':
                response.type = 'add';
                if (!userlist.addNote(usernote))
                    response.success = false;
                break;
            case 'modify':
                response.type = 'modify';
                if (!userlist.modifyNote(usernote))
                    response.success = false;
                break;
            case 'remove':
                response.type = 'remove';
                if (!userlist.deleteNote(request.user, request.title))
                    response.success = false;
                break;
            case 'list':
                response.type = 'list';
                var notes = userlist.listNotes(request.user);
                if (notes.length == 0)
                    response.success = false;
                else
                    response.notes = notes;
                break;
            case 'read':
                response.type = 'read';
                var note = userlist.readSpecificNote(request.user, request.title);
                if (note.getTitle() == "")
                    response.success = false;
                else
                    response.notes = [note];
                break;
            default:
                console.log(chalk.red("Error, unknown command!"));
                break;
        }
        connection.write(JSON.stringify(response), function (err) {
            if (err)
                console.log(chalk.bold.red("Error, Cannot make the request: " + err.message));
            else {
                console.log(chalk.bold.green("Request successfully done!"));
                connection.end();
            }
        });
    });
});
/**
 * El servidor escucha en el puerto 60300 siguiendo el ejemplo de los apuntes
 * de la asignatura.
 */
server.listen(60300, function () {
    console.log(chalk.bold.green("Server is working fine, waiting request..."));
});
