import {Note} from '../note';
import {ResponseType} from '../types';
import * as chalk from 'chalk';
import * as net from 'net';
import {NoteList} from '../note-list';
import {MessageEventEmitterServer} from './eventEmitterServer';
/**
 * Se crear el servidor y se genera un objeto server.
 */
let server = net.createServer((connection) => {
  let emitter = new MessageEventEmitterServer(connection); 

  console.log(chalk.bold.green('User join the server'));

  emitter.on('request', (message) => {
    let request = message;
    let userlist = new NoteList(); 
    /**
     * Se rellena por defecto la respuesta
     * del servidor. Utilizará ResponseType
     * definida en el archivo types.ts
     */
    let response: ResponseType = {
      type: 'add',
      success: true,
    };
    /**
     * En funcion de el tipo de comando que el usuario haya ingresado (request.type)
     * se llamará a los metodos correspondientes para realizar los cambios pertinentes del comando introducido.
     * En caso de que no se conozca el tipo de petición que se ha generado, es
     * decir el comando que ha ingresado el usuario, se mostrará un mensaje de error.
     */
    let usernote = new Note(request.user, request.title, request.body, request.color);
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
        let notes = userlist.listNotes(request.user);
        if (notes.length == 0) 
          response.success = false;
        else 
          response.notes = notes;
        break;
      case 'read':
        response.type = 'read';
        let note = userlist.readSpecificNote(request.user, request.title);
        if (note.getTitle() == "") 
          response.success = false;
        else 
          response.notes = [note];
        break;

      default:
        console.log(chalk.red("Error, unknown command!"));
        break;
    }
    /**
    * Se envía el json
    */
    connection.write(JSON.stringify(response), (err) => {
      if (err) 
        console.log(chalk.bold.red(`Error, Cannot make the request: ${err.message}`));
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
server.listen(60300, () => {
  console.log(chalk.bold.green("Server is working fine, waiting request..."));
});
