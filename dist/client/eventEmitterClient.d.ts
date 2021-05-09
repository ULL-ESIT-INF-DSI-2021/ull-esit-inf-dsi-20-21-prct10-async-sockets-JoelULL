/// <reference types="node" />
import { EventEmitter } from 'events';
export declare class MessageEventEmitterClient extends EventEmitter {
    constructor(connection: EventEmitter);
}
