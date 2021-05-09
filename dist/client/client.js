"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yargs = require("yargs");
var net = require("net");
var chalk = require("chalk");
var eventEmitterClient_1 = require("./eventEmitterClient");
/**
 * Para ejecutar abra dos terminales, primeramente en una deberá introducir `node dist/server.js`, para activar el servidor,
 * y en el otro `node dist/client.js add --user="daniel" --title="Red note" --body="This is a red note" --color="red"`, que mandará un mensaje desde el cliente al servidor.
 * Existen otros comandos: modify, remove, list y read.
 */
var client = net.connect({ port: 60300 });
var eventemitter = new eventEmitterClient_1.MessageEventEmitterClient(client);
var requestNote = {
    type: 'add',
    user: '',
};
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        user: {
            describe: 'Username',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Notes\' title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Body\'s title',
            demandOption: true,
            type: 'string',
        },
        color: {
            describe: 'Color\'s note. Blue on unknown color.\nOnly red, green, blue and yellow available',
            demandOption: true,
            type: 'string',
            default: 'blue',
        },
    },
    handler: function (argv) {
        if (typeof argv.user === 'string' && typeof argv.color === 'string' &&
            typeof argv.body === 'string' && typeof argv.title === 'string') {
            requestNote = {
                type: 'add',
                user: argv.user,
                title: argv.title,
                body: argv.body,
                color: argv.color,
            };
        }
    },
});
yargs.command({
    command: 'modify',
    describe: 'Modify an exist note',
    builder: {
        user: {
            describe: 'Username',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Notes\' title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Body\'s title',
            demandOption: true,
            type: 'string',
        },
        color: {
            describe: 'Color\'s note. Blue on unknown color.',
            demandOption: true,
            type: 'string',
        },
    },
    handler: function (argv) {
        if (typeof argv.user === 'string' && typeof argv.title === 'string' &&
            typeof argv.color === 'string' && typeof argv.body === 'string') {
            requestNote = {
                type: 'modify',
                user: argv.user,
                title: argv.title,
                body: argv.body,
                color: argv.color,
            };
        }
    },
});
yargs.command({
    command: 'remove',
    describe: 'Remove an existing note',
    builder: {
        user: {
            describe: 'Username',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Notes\' title',
            demandOption: true,
            type: 'string',
        },
    },
    handler: function (argv) {
        if (typeof argv.user === 'string' && typeof argv.title === 'string') {
            requestNote = {
                type: 'remove',
                user: argv.user,
                title: argv.title,
            };
        }
    },
});
yargs.command({
    command: 'list',
    describe: 'List notes from a user',
    builder: {
        user: {
            describe: 'Username',
            demandOption: true,
            type: 'string',
        },
    },
    handler: function (argv) {
        if (typeof argv.user === 'string') {
            requestNote = {
                type: 'list',
                user: argv.user,
            };
        }
    },
});
yargs.command({
    command: 'read',
    describe: 'read an existing note',
    builder: {
        user: {
            describe: 'Username',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Notes\' title',
            demandOption: true,
            type: 'string',
        },
    },
    handler: function (argv) {
        if (typeof argv.user === 'string' && typeof argv.title === 'string') {
            requestNote = {
                type: 'read',
                user: argv.user,
                title: argv.title,
            };
        }
    },
});
yargs.parse();
client.write(JSON.stringify(requestNote) + '\n', function (err) {
    if (err)
        console.log(chalk.red('Data couldn\'t be sended'));
});
eventemitter.on('message', function (request) {
    switch (request.type) {
        case 'add':
            if (request.success)
                console.log(chalk.bold.green("New note added!"));
            else
                console.log(chalk.bold.red('Note title taken!'));
            break;
        case 'modify':
            if (request.success)
                console.log(chalk.bold.green("Note overwrited!"));
            else
                console.log(chalk.bold.red('Couldn\'t overwrite!'));
            break;
        case 'remove':
            if (request.success)
                console.log(chalk.bold.green("Note removed!"));
            else
                console.log(chalk.bold.red('Path note not found. Make sure that the user and the file name are correct, do not indicate the file extension .json'));
            break;
        case 'list':
            if (request.success) {
                var colorprint_1;
                request.notes.forEach(function (note) {
                    colorprint_1 = chalk.keyword(note.color);
                    console.log(colorprint_1(note.title));
                });
            }
            else
                console.log(chalk.bold.red("No notes to list!"));
            break;
        case 'read':
            if (request.success) {
                var colorprint = chalk.keyword(request.notes[0].color);
                console.log(colorprint(request.notes[0].title));
                console.log(colorprint(request.notes[0].body));
            }
            else
                console.log(chalk.bold.red('Note not found'));
            break;
        default:
            console.log(chalk.bold.red('Unknown command!'));
            break;
    }
});
client.on('error', function (err) {
    console.log(chalk.bold.red("Connection error"));
});
