import {EventEmitter} from 'events';
/**
 * clase que permitirá al servidor al manejar los datos de los usuarios
 * mostrar mensajes de respuesta a las peticiones.
 */
export class MessageEventEmitterServer extends EventEmitter {

  constructor(connection: EventEmitter) {
    super();
    let wholeData = '';

    connection.on('data', (dataChunk) => {
      wholeData += dataChunk;

      let messageLimit = wholeData.indexOf('\n');
      while (messageLimit !== -1) {
        const message = wholeData.substring(0, messageLimit);
        wholeData = wholeData.substring(messageLimit + 1);
        this.emit('request', JSON.parse(message)); 
        messageLimit = wholeData.indexOf('\n');
      }
    });
  }
}