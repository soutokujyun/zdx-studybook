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