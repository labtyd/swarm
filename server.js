const http = require('http');

const hostname = '0.0.0.0';
const port = 8001;
const os = require('os');

var dateFormat = require('dateformat');
var now = new Date();
var fs=require('fs');

try {
    var host = fs.readFileSync('/data/hostname', 'utf8');
} catch(e) {
    var host = 'not found';
}

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.write('Container: '+os.hostname()+'\n');
  res.write('Host: '+host+'\n');
  res.write(dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT")+'\n');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
