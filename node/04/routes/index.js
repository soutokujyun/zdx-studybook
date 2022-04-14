module.export = {
    'get /': async ctx => {
        ctx.body = 'Hello World';
    }
}