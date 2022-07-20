const express = require("express");
const app = express();

// 导入Vue构造函数
const Vue = require("vue");

// createRenderer用于获取渲染器
const { createRenderer } = require("vue-server-renderer");

// 获取渲染器
const renderer = createRenderer();

app.get("/", async (req, res) => {
    // 创建一个待渲染vue实例
    const vm = new Vue({
        data: { name: "村长真棒" },
        template: `
            <div>
                <h1>{{name}}</h1>
            </div>
        `,
    });

    try {
        // renderToString将vue实例渲染为html字符串，它返回一个Promise
        const html = await renderer.renderToString(vm);
        res.send(html);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

app.listen(3000, () => {
    console.log("Listening 3000");
});
