import {EventEmitter} from 'events';
/**
 * Clase que permitirá al cliente comunicarse con el servidor a
 * traves de eventos de la clase EventEmitter.
 */
export class MessageEventEmitterClient extends EventEmitter {

  constructor(connection: EventEmitter) {
    super();
    let wholeData = '';

    connection.on('data', (chunks) => {
      wholeData += chunks;
    }),

    connection.on('end', () => {
      const request = JSON.parse(wholeData);
      this.emit('message', request);
    });
  }
}