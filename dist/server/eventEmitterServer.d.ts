/// <reference types="node" />
import { EventEmitter } from 'events';
export declare class MessageEventEmitterServer extends EventEmitter {
    constructor(connection: EventEmitter);
}
