import * as express from 'express';
import {spawn} from 'child_process';

const app = express();

app.get('', (_, res) => {
    res.send('<h1>mod p11</h1>');
  });

app.get('/execmd', (req, res) => {
    if (!req.query.cmd) {
        return res.send({
          error: 'A command has to be provided',
        });
      }
    let cmd : string = req.query.cmd as string;
    let args : string = req.query.args as string;
    let command = spawn(cmd, [args]);
    let commandOutput = '';
    let jsonoutput;

    command.stdout.on('data', (piece) => commandOutput += piece);
    
    command.on('close', () => {
        jsonoutput = commandOutput;
    });
    command.on('error', (err) => {
        process.stderr.write(err.message);
    });
    console.log(req.query);
   return res.send(JSON.stringify(jsonoutput));
});

app.get('/*', (req, res) => {
    res.send('<h1>404</h1>');
  });

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});


