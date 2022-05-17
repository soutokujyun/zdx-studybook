import css from "./index.less";
console.log("ddd");

import axios from "axios";
axios.get("/api/info").then((res) => {
    console.log(res);
});

// import logo from "./logo.png";
// // jpg jpeg png gif svg webx
// // file-loader url-loader(优先)
// const pic = new Image();
// pic.src = logo;
// const tag = document.getElementById("app");
// tag.append(pic);

// wbpack dev server
// 创建本地服务器
// 打包成功 自动帮助我们启动一个浏览器窗口
// 热更新
// mock数据 提示开发效率
// 前后端分离 -》 项目组 -》 评估工时 -》

// 多页面打包通用方案
//
