"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageEventEmitterServer = void 0;
var events_1 = require("events");
var MessageEventEmitterServer = /** @class */ (function (_super) {
    __extends(MessageEventEmitterServer, _super);
    function MessageEventEmitterServer(connection) {
        var _this = _super.call(this) || this;
        var wholeData = '';
        connection.on('data', function (dataChunk) {
            wholeData += dataChunk;
            var messageLimit = wholeData.indexOf('\n');
            while (messageLimit !== -1) {
                var message = wholeData.substring(0, messageLimit);
                wholeData = wholeData.substring(messageLimit + 1);
                _this.emit('request', JSON.parse(message));
                messageLimit = wholeData.indexOf('\n');
            }
        });
        return _this;
    }
    return MessageEventEmitterServer;
}(events_1.EventEmitter));
exports.MessageEventEmitterServer = MessageEventEmitterServer;
