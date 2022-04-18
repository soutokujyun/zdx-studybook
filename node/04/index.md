# egg

## 约定路由

### 基础配置

创建路由 ./routes/index.js

```
module.exports = {
    'get /': async ctx => {
        ctx.body = 'Hello World';
    }
}
```

创建 index.js

```
const app = new (require('koa'))();
const { initRouter } = require('./egg-loader');

app.use(initRouter().routes());

app.listen(3000);

```

### 配置路由

创建 ./egg-load.js

> 因为要做约定路由，所以在服务启动时需要到./routes/index.js 自动加载路由配置

首先创建一个加载文件内容的函数

```
function load(dir, cb) {
    const url = path.resolve(__dirname, dir);
    const files = fs.readdirSync(url);
    files.forEach(filename => {
        filename = filename.replace('.js', '');
        const file = require(url + '/' + filename);
        cb(filename, file);
    })
}
```

然后通过加载的路由配置，初始化路由

```
function initRouter() {
    const router = new Router();
    load('routes', (filename, routes) => {
        // index => /
        // user => /user
        const prefix = filename === 'index' ? '' : `/${filename}`;
        Object.keys(routes).forEach(key => {
            const [method, path] = key.split(' ');
            console.log(`${method} ${prefix}${path}`);
            router[method](prefix + path, routes[key]);
        })
    })

    return router;
}
```

最后通过./index.js 调用，去加载./routes 文件夹下的路由配置

完整代码

```
// 读取文件夹下的模块
const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

function load(dir, cb) {
    const url = path.resolve(__dirname, dir);
    const files = fs.readdirSync(url);
    files.forEach(filename => {
        filename = filename.replace('.js', '');
        const file = require(url + '/' + filename);
        cb(filename, file);
    })
}

// 加载路由
function initRouter() {
    const router = new Router();
    load('routes', (filename, routes) => {
        // 加载路由的时候，文件名称是路由的前缀，可能会有index，需要把index去掉改成 /
        // index => /
        // user => /user
        const prefix = filename === 'index' ? '' : `/${filename}`;
        Object.keys(routes).forEach(key => {
            const [method, path] = key.split(' ');
            console.log(`${method} ${prefix}${path}`);
            router[method](prefix + path, routes[key]);
        })
    })

    return router;
}

module.exports = { initRouter };
```
