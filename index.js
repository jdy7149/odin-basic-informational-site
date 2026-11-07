const http = require('node:http');
const fs = require('node:fs/promises');

const filePaths = new Map([
  ['/', 'index.html'],
  ['/about', 'about.html'],
  ['/contact-me', 'contact-me.html'],
]);

const server = http.createServer(async (req, res) => {
  let filePath = filePaths.get(req.url);
  let statusCode = 200;

  if (!filePath) {
    filePath = '404.html';
    statusCode = 404;
  }

  try {
    const data = await fs.readFile(filePath, { encoding: 'utf8' });

    res.writeHead(statusCode, { 'Content-Type': 'text/html' });
    res.end(data);
  } catch (err) {
    console.error(err);
    res.writeHead(500);
    res.end('Internal Server Error');
  }
}); 

server.listen(8080);