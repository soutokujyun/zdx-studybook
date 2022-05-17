const Koa = require("koa");
const app = new Koa();
const logger = require('koa-logger')
const cors = require("koa2-cors");
const session = require('koa-session');
// const bodyParser = require("koa-bodyparser");
const koaBody = require('koa-body'); // koa2 使用koa-body解决文件上传问题

// sequelize
const sequelize = require("./config/db.js");

// routes
const indexRouter = require('./routes/index')

// session
app.keys = ['some secret hurr']; // This is requied for koa session.

const CONFIG = {
    key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 7200000,
    // autoCommit: false, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
    // secure: true, /** (boolean) secure cookie*/
    // sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
  };
  
app.use(session(CONFIG, app));

app.use(cors({
    origin: '*',
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept','X-Token'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
}));
app.use(koaBody({
  multipart: true
}));
app.use(logger());

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })

  // 调用router.allowedMethods()获得一个中间件，当发送了不符合的请求时，会返回 `405 Method Not Allowed` 或 `501 Not Implemented`
app.use(indexRouter.routes(), indexRouter.allowedMethods());

// 建立表关系
// ...
// // { alter: true } { force: true } 不建议在生产环境下使用
sequelize.sync({ alter: false }).then(async () => {
    app.listen(3000, () => {
        console.log("Listening at 3000");
    });
});
// app.listen(3000);
