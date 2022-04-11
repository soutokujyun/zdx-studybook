const http = require('http')

class Koa {
    listen(...args) {
        // 创建服务
        const server = http.createServer((req, res) => {
            this.callback(req, res)
        })
        // 监听端口
        server.listen(...args)
    }

    use(callback) {
        this.callback = callback
    }
}