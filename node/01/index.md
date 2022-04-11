# http服务
## 简单的http服务
使用http启动服务
```
const http = require('http')

http.createServer((req, res) => {
    // const { url, method } = req
    res.statusCode = 200;
    res.end('Hello world!!')
})
// 监听端口号
.listen('3000',() => {
    console.log('listen to 3000');
})
```

## 通过http返回html
html通过fs文件服务读取文件以buffer的形式输出到http服务返回给浏览器
```
const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
    const { url, method } = req
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
    }
    
})
.listen('3000',() => {
    console.log('listen to 3000');
})
```

## 404 页面返回 
当url找不到时 我们应该返回404
```
else {
    res.statusCode = 404
    res.setHeader('Content-Type','text/plain;charset=utf-8;');
    res.end('404 页面没有找到')
}
```

## 传递JOSN数据
这里需要设置内容类型为application/json, 可以让浏览器以正确的编码方式读取json字符串
```
if (url === '/users' && method === 'GET') {
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({ username: 'wang xiao er', age: '30' }))
}
```

## 传递图片
传递图片需要通过浏览器请求可接收内容类型属性accept来统一返回图片。

读取图片时可以通过流的方式传递图片数据。之所以用流的方式，是因为文件大小有可能是几个G的大小，而使用普通读取方式转成Buffer会占用内存，普通服务器的内存大小达不到几个G。

index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello</title>
</head>
<body>
    <div>Hello World</div>
    <img src="image.jpg" alt="">
</body>
</html>
```
通过访问image.jpg浏览器会默认转成 http://localhost:3000/image.jpg (域名 + 根目录 + 文件名)的形式，到后端接收到url```/image.jpg```。

index.js
```
const { url, method, headers } = req
if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
    fs.createReadStream('.' + url).pipe(res)
}
```

## 最后整体代码
```
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
```