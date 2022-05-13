var http = require('http');
var fs = require('fs');
var server = http.createServer(function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  const fileLines = fs.readFileSync('input.txt', 'utf-8');
  let output = [];
  let directory = [];
  fileLines.split(/\r?\n/).forEach(line =>  {
    if (line) {
      const response = executeCommand(line, directory);
      directory=response.directory
      output.push(response.res)
    }
  });
  output.map(d => res.write(d + '\n'));
  res.end();
});


server.listen(8000, function(req, res) {
  console.log('server listening to localhost 8000');
});

const executeCommand = (command, dir =[]) => {
  let res;
  console.log(dir);

  const line = command.split(' ');
  const cmd = line[0];
  switch (cmd) {
    case 'CREATE':
      const folders = line[1].split('/');
      directory = [...dir, folders[0]];
      // if (folders[1])
      // directory = [...dir, folders[0]];

      res = command;
      break;
    case 'DELETE':
      directory = [...dir, line[1]] 
      break;
    case 'MOVE':
    
      break;
    case 'LIST':
      res = dir;
      break;
    default:
      break;
  }
  // console.log(cmd);
  return {res, directory};
}
