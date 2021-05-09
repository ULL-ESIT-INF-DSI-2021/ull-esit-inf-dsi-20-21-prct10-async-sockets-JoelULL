import * as chalk from 'chalk';
import * as yargs from 'yargs';
import * as net from 'net';
import {MessageEventEmitterClient} from './eventEmitterClient';
import {RequestType} from '../types';

/**
 * La conexión se realizará con el puerto 60300
 * siguiendo el ejemplo de los apuntes de la 
 * asignatura
 */
let client = net.connect({port: 60300});
let eventemitter = new MessageEventEmitterClient(client); 
    /**
     * Se rellena por defecto la petición
     * del usuario. Utilizará RequestType
     * definida en el archivo types.ts
     */
let requestNote: RequestType = {
  type: 'add',
  user: '',
};
/**
 * Comando que permite al usuario realizar una peticion al servidor
 * para añadir una nota a su directorio.
 */
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
/**
 * Comando que permite al usuario realizar una peticion al servidor
 * para modificar una nota en su directorio.
 */
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
/**
 * Comando que permite al usuario realizar una peticion al servidor
 * para eliminar una nota de su directorio.
 */
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
/**
 * Comando que permite al usuario realizar una peticion al servidor
 * para listar las notas de su directorio.
 */
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
/**
 * Comando que permite al usuario realizar una peticion al servidor
 * para leer una nota de su directorio.
 */
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

/**
 * Se envia la peticion del cliente al servidor
 */
client.write(JSON.stringify(requestNote) + '\n', (err) => {
  if (err) 
    console.log(chalk.red("Error, cant send your request!"));
});
/**
 * En este manejador se especificara al usuario lo que ha ocurrido una vez el
 * servidor ha dado respuesta a su petición. En caso de que haya sido realizada
 * con exito o no, se mostrará un mensaje informativo al usuario.
 */
eventemitter.on('message', (request) => {
  switch (request.type) {
    case 'add':
      if (request.success) 
        console.log(chalk.bold.green("New note added!"));
      else 
        console.log(chalk.bold.red("Error couldnt add the note!"));
      break;

    case 'modify':
      if (request.success) 
        console.log(chalk.bold.green("note modified"));
      else 
        console.log(chalk.bold.red("Error note wasnt modified"));
      break;

    case 'remove':
      if (request.success) 
        console.log(chalk.bold.green("note deleted"));
      else 
        console.log(chalk.bold.red("couldnt delete that note!"));
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
        console.log(chalk.bold.red("Error, couldnt find that note!"));
      break;
    default:
      console.log(chalk.bold.red('Unknown command!'));
      break;
  }
});
/**
 * En caso de que no se pueda establecer una conexión con el
 * servidor, se mostrará un mensaje de error
 */
client.on('error', (err) => {
  console.log(chalk.bold.red("Connection error"));
});