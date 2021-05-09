/// <reference types="node" />
import { EventEmitter } from 'events';
/**
 * clase que permitirá al servidor al manejar los datos de los usuarios
 * mostrar mensajes de respuesta a las peticiones.
 */
export declare class MessageEventEmitterServer extends EventEmitter {
    constructor(connection: EventEmitter);
}
