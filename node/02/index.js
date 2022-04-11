const Koa = require('./koa')

const app = new Koa()

app.use((req, res) => {
    res.end('Hello Koa')
})

app.listen('3000', () => {
    console.log('listen to 3000')
})