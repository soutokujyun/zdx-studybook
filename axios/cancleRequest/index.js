const http = require('http');
const fs = require('fs');
const server = http.createServer((request, response) => {
    const {url, method} = request;
    if (url === '/' && method === 'GET') {
        fs.readFile("index.html", (err, data) => {
            if (err) {
                response.writeHead(500, {'Content-type': 'text/plain;charset=utf-8'})
                response.end("500 服务器错误");
            } else {
                response.statusCode = 200;
                response.setHeader('Content-type', 'text/html')
                response.end(data);
            }
        })
    } else if (url === '/a.json' && method === 'GET') {
        fs.readFile("a.json", (err, data) => {
            if (err) {
                response.writeHead(500, {'Content-type': 'text/plain;charset=utf-8'})
                response.end("500 服务器错误");
            } else {
                response.writeHead(200, {'Content-type': 'application/json'});
                response.end(data.toString());
            }
        });
    } else if (url === '/users' && method === 'GET') {
        response.writeHead(200, {'Content-type': 'application/json'});
        
        setTimeout(() => {
            response.end('{"name":"zhangsan","age":18}');
        }, 2000)
    } else if(url === '/product' && method === 'GET') {
        response.writeHead(200, {'Content-type': 'application/json'});
        
        setTimeout(() => {
            response.end('{"name":"zhangsan","age":18}');
        }, 4000)
    } else {
        response.statusCode = 404;
        response.setHeader('Content-type', 'text/html')
        response.end("404 no page");
    }
})
server.listen(3000, () => {
    console.log('server is running at port 3000');
});