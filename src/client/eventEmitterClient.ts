import {EventEmitter} from 'events';

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