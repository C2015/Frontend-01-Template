const http = require('http')
const html = `<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
        #container {
            width: 500px;
            height: 300px;
            display: flex;
        }

        #container #myid {
            width: 200px;
        }

        #container .c1 {
            flex: 1
        }
    </style>
</head>

<body>
    <div id="container">
        <div id="myid"></div>
        <div class="c1"></div>
    </div>
</body>

</html>
`
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(html);
})
server.listen(8080)
console.log('server listen 8080')