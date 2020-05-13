const http = require('http')
const server = http.createServer((req, res) => {
    console.log('request')
    console.log(req.headers)
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ok');
})
server.listen(8080)
console.log('server listen 8080')