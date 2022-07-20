const express = require("express");
const app = express();

// 导入Vue构造函数
const Vue = require("vue");
const Router = require("vue-router");
Vue.use(Router);

// createRenderer用于获取渲染器
const { createRenderer } = require("vue-server-renderer");

// 获取渲染器
const renderer = createRenderer();

app.get("*", async (req, res) => {
    // 每次创建一个路由实例
    const router = new Router({
        routes: [
            { path: '/', component: {template:'<div>index page</div>'}},
            { path: '/detail', component: {template:'<div>detail page</div>'}}
        ]
    })


    // 创建一个待渲染vue实例
    const vm = new Vue({
        data: {name: "村长真棒"},
        template: `
            <div>
                <router-link to="/">index</router-link>
                <router-link to="/detail">detail</router-link>
                <router-view></router-view>
            </div>
        `,
        router //挂载
    });

    try {
        // 跳转至对应路由
        console.log(req.url);
        router.push(req.url);
        const html = await renderer.renderToString(vm);
        res.send(html)
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

app.listen(3000,()=>{
    console.log("Listening 3000");
});