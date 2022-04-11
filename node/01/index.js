const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
    const { url, method, headers } = req
    if (url === '/' && method === 'GET') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                // 设置编码
                res.writeHead(500, {'Content-Type': 'text/plain;charset=utf-8;'});
                res.end('500 服务器出错')
                return
            }

            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            res.end(data)
        })
    } else if (url === '/users' && method === 'GET') {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({ username: 'wang xiao er', age: '30' }))
    } else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
        fs.createReadStream('.' + url).pipe(res)
    } else {
        res.statusCode = 404
        res.setHeader('Content-Type','text/plain;charset=utf-8;');
        res.end('404 页面没有找到')
    }
})
.listen('3000',() => {
    console.log('listen to 3000');
})