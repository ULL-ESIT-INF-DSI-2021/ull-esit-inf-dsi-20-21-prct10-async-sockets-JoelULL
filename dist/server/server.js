"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var note_1 = require("../note");
var chalk = require("chalk");
var net = require("net");
var note_list_1 = require("../note-list");
var eventEmitterServer_1 = require("./eventEmitterServer");
var server = net.createServer(function (connection) {
    var emitter = new eventEmitterServer_1.MessageEventEmitterServer(connection);
    console.log(chalk.bold.green('User join the server'));
    emitter.on('request', function (message) {
        var request = message;
        var userlist = new note_list_1.NoteList();
        var response = {
            type: 'add',
            success: true,
        };
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
server.listen(60300, function () {
    console.log(chalk.bold.green("Server is working fine, waiting request..."));
});
