import * as chalk from 'chalk';
import * as yargs from 'yargs';
import * as net from 'net';
import {MessageEventEmitterClient} from './eventEmitterClient';
import {RequestType} from '../types';


let client = net.connect({port: 60300});
let eventemitter = new MessageEventEmitterClient(client); 

let requestNote: RequestType = {
  type: 'add',
  user: '',
};

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    user: {
      describe: 'Note user',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {

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

yargs.command( {
  command: 'modify',
  describe: 'Modify an exist note',
  builder: {
    user: {
      describe: 'Note user',
      demandOption: true,
      type: 'string',
    },

    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },

    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },

    color: {
      describe: 'Note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {

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

yargs.command( {
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    user: {
      describe: 'Note user',
      demandOption: true,
      type: 'string',
    },

    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
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
      describe: 'Note user',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
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
      describe: 'Note user',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
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

client.write(JSON.stringify(requestNote) + '\n', (err) => {
  if (err) console.log(chalk.red('Data couldn\'t be sended'));
});

eventemitter.on('message', (request) => {
  switch (request.type) {
    case 'add':
      if (request.success) 
        console.log(chalk.bold.green(`New note added!`));
      else 
        console.log(chalk.bold.red('Note title taken!'));
      break;

    case 'modify':
      if (request.success) 
        console.log(chalk.bold.green(`Note overwrited!`));
      else 
        console.log(chalk.bold.red('Couldn\'t overwrite!'));
      break;

    case 'remove':
      if (request.success) 
        console.log(chalk.bold.green(`Note removed!`));
      else 
        console.log(chalk.bold.red('Path note not found. Make sure that the user and the file name are correct, do not indicate the file extension .json'));
      break;

    case 'list':
      if (request.success) {
        let colorprint;
        request.notes.forEach((note) => {
            colorprint = chalk.keyword(note.color);
            console.log(colorprint(note.title));
        });
      } else 
        console.log(chalk.bold.red("No notes to list!"));
      break;

    case 'read':
      if (request.success) {
        let colorprint = chalk.keyword(request.notes[0].color);
        console.log(colorprint(request.notes[0].title) );
        console.log(colorprint(request.notes[0].body) ); 
      } else 
        console.log(chalk.bold.red('Note not found'));
      break;
    default:
      console.log(chalk.bold.red('Unknown command!'));
      break;
  }
});

client.on('error', (err) => {
  console.log(chalk.bold.red("Connection error"));
});