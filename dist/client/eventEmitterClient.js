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
exports.MessageEventEmitterClient = void 0;
var events_1 = require("events");
var MessageEventEmitterClient = /** @class */ (function (_super) {
    __extends(MessageEventEmitterClient, _super);
    function MessageEventEmitterClient(connection) {
        var _this = _super.call(this) || this;
        var wholeData = '';
        connection.on('data', function (chunks) {
            wholeData += chunks;
        }),
            connection.on('end', function () {
                var request = JSON.parse(wholeData);
                _this.emit('message', request);
            });
        return _this;
    }
    return MessageEventEmitterClient;
}(events_1.EventEmitter));
exports.MessageEventEmitterClient = MessageEventEmitterClient;
