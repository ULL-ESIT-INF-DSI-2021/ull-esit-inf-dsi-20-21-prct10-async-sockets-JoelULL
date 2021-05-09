/// <reference types="node" />
import { EventEmitter } from 'events';
/**
 * Clase que permitirá al cliente comunicarse con el servidor a
 * traves de eventos de la clase EventEmitter.
 */
export declare class MessageEventEmitterClient extends EventEmitter {
    constructor(connection: EventEmitter);
}
