# Koa
## 简单了解

## Koa框架
### 简单实现
首先我们把平时写的koa代码写上

index.js
```
const Koa = require('./koa')

const app = new Koa()

app.use((req, res) => {
    res.end('Hello Koa')
})

app.listen('3000', () => {
    console.log('listen to 3000')
})
```
编写koa代码
```
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

module.exports = Koa
```
### 引入上下文
我们知道在使用app.use的时候回调函数的参数应该是ctx上下文而不是（req,res）的形式。

index.js
```
app.use(ctx => ctx.body = 'hello !')
```
这时候就需要引入上下文，将req,res挂载到ctx上。

request.js
```
module.exports = {
    get url() {
        return this.req.url
    },

    get method() {
        return this.req.method.toLowerCase()
    }
}
```

response.js
```
module.exports = {
    get body() {
        return this._body
    },

    set body(val) {
        this._body = val
    }
}
```

context.js
```
module.exports = {
    get url() {
        return this.request.url
    },

    get body() {
        return this.response.body
    },

    set body(val) {
        this.response.body = val
    },

    get method() {
        return this.request.method
    }
    
}
```

koa.js
```
const http = require('http')

const context = require('./context')
const request = require('./request')
const response = require('./response')

class Koa {
    listen(...args) {
        // 创建服务
        const server = http.createServer((req, res) => {
            // 创建上下文
            const ctx = this.createContext(req, res)

            this.callback(ctx)

            res.end(ctx.body)
        })
        // 监听端口
        server.listen(...args)
    }

    use(callback) {
        this.callback = callback
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
```

### 中间件实现
在日常开发中我们需要在执行程序之前，需要做一些鉴权，日志记录，事物等一些操作，这时候就需要引入一个概念——切面编程（AOP）。

比如现在有两个app.use()，那么在正常情况下，只会执行后面一个use，前面一个use的callback会被覆盖。那么要达到前面回调函数不被覆盖，也能正常执行，我们需要将函数组合。

commpose.js
```
const add = (x, y) => x + y
const square = (x) => x * x

const compose = (...[first, ...other]) => (...args) => {
    let ret = first(...args)
    other.forEach(fn => {
        ret = fn(ret)
    })
    return ret
}

const fn = compose(add, square, square)

console.log(fn(1, 2))  // 81
```
在上面实现了一个简单的compose函数，函数会一层一层的被调用，但还没有达到洋葱圈的效果。

commpose.js
```
function compose(middlrewares) {
    return function() {
        return dispatch(0)
        function dispatch(i) {
            let fn = middlrewares[i]
            if (!fn) {
                return Promise.resolve()
            }

            return Promise.resolve(
                fn(function next() {
                    return dispatch(i + 1)
                })
            )
        }
    }
}

async function fn1(next) {
    console.log('fn1')
    await next()
    console.log('end fn1')
}

async function fn2(next) {
    console.log('fn2')
    await next()
    console.log('end fn2')
}

async function fn3(next) {
    console.log('fn3')
}

const finalFn = compose([fn1, fn2, fn3])
finalFn()
```
以上执行函数时会在next()的时候先去执行下一个函数，然后等下一个函数回调后再往下执行。

应用到koa代码中实现
index.js
```
app.use(async(ctx, next) => {
    ctx.body = '1'
    await next()
    ctx.body += '5'
})
app.use(async(ctx, next) => {
    ctx.body += '2'
    await next()
    ctx.body += '4'
})
app.use((ctx, next) => {
    ctx.body += '3'
})
```

koa.js
```
class Koa {
    constructor() {
        this.middlewares = []
    }
    listen(...args) {
        // 创建服务
        const server = http.createServer(async (req, res) => {
            // 创建上下文
            const ctx = this.createContext(req, res)

            // 中间件合成
            const fn = this.compose(this.middlewares)
            await fn(ctx)
            res.end(ctx.body)
        })
        // 监听端口
        server.listen(...args)
    }

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
    ...
}

```