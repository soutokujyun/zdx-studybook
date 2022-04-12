const http = require('http')

const context = require('./context')
const request = require('./request')
const response = require('./response')

class Koa {
    constructor() {
        this.middlewares = []
    }
    listen(...args) {
        // 创建服务
        const server = http.createServer(async (req, res) => {
            // 创建上下文
            const ctx = this.createContext(req, res)

            // this.callback(ctx)
            // 中间件合成
            const fn = this.compose(this.middlewares)
            await fn(ctx)
            res.end(ctx.body)
        })
        // 监听端口
        server.listen(...args)
    }

    // use(callback) {
    //     this.callback = callback
    // }

    use(middleware) {
        this.middlewares.push(middleware)
    }

    // 合成函数
    compose(middlrewares) {
        return function(ctx) {
            return dispatch(0)
            function dispatch(i) {
                let fn = middlrewares[i]
                if (!fn) {
                    return Promise.resolve()
                }
    
                return Promise.resolve(
                    fn(ctx, function next() {
                        return dispatch(i + 1)
                    })
                )
            }
        }
    }

    createContext(req, res) {
        const ctx = Object.create(context)
        ctx.request = Object.create(request)
        ctx.response = Object.create(response)

        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res
        return ctx
    }
}

module.exports = Koa