"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var child_process_1 = require("child_process");
var app = express();
app.get('', function (_, res) {
    res.send('<h1>mod p11</h1>');
});
app.get('/execmd', function (req, res) {
    if (!req.query.cmd) {
        return res.send({
            error: 'A command has to be provided',
        });
    }
    var cmd = req.query.cmd;
    var args = req.query.args;
    var command = child_process_1.spawn(cmd, [args]);
    var commandOutput = '';
    var jsonoutput;
    command.stdout.on('data', function (piece) { return commandOutput += piece; });
    command.on('close', function () {
        jsonoutput = commandOutput;
    });
    command.on('error', function (err) {
        process.stderr.write(err.message);
    });
    console.log(req.query);
    return res.send(JSON.stringify(jsonoutput));
});
app.get('/*', function (req, res) {
    res.send('<h1>404</h1>');
});
app.listen(3000, function () {
    console.log('Server is up on port 3000');
});
