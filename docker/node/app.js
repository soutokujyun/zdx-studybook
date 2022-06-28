const Koa = require("koa");
const app = new Koa();

app.use((ctx) => {
    ctx.body = "Hello NodeJs";
});

app.listen(3000, () => {
    console.log("Listen at 3000");
});
