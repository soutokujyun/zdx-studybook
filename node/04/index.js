const app = new (require('koa'))();
const { initRouter } = require('./egg-loader');

app.use(initRouter().routes());

app.listen(3000);