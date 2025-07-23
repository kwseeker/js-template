const { readFile } = require('node:fs');
const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  console.log("req url: ---------> \n", req.url);
  // const myURL = new URL(req.url, 'https://example.org/');
  // console.log("URL: ", myURL);
  // const pathname = myURL.pathname
  // console.log("pathname: ", pathname)

  let pathname = req.url;

  if (req.method === 'GET') {
    if (pathname.endsWith(".html")) {
      readFile(pathname.substring(1), (err, data) => {
        if (err) throw err;
        console.log('response content: ---------> \n', data.toString());
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      });
      return;
    }

    if (pathname.endsWith(".js")) {
      readFile(pathname.substring(1), (err, data) => {
        if (err) throw err;
        console.log('response content: ---------> \n', data.toString());
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/javascript');
        res.end(data);
      });
      return;
    }

    if (pathname.endsWith(".svg")) {
      readFile(pathname.substring(1), (err, data) => {
        if (err) throw err;
        console.log('response content: ---------> \n', data.toString());
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/svg+xml');
        res.end(data);
      });
      return;
    }
  }

  readFile('index.html', (err, data) => {
    if (err) throw err;
    console.log('response content: ---------> \n', data.toString());
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(data);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
