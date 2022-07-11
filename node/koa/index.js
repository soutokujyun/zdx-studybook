const Koa = require('./koa')

const app = new Koa()

// app.use((req, res) => {
//     res.end('123')
// })

// app.use(ctx => ctx.body = 'hello !!!')

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



app.listen('3000', () => {
    console.log('listen to 3000')
})