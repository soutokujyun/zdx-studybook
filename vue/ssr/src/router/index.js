import Vue from "Vue";
import Router from "vue-router";

Vue.use(Router);

// 路由配置
const routes = [
    { path: "/", component: { render: (h) => h("div", "index page") } },
    { path: "/detail", component: { render: (h) => h("div", "detail page") } },
];

// 不同之处，创建路由器的工程函数
export function createRouter() {
    return new Router({
        mode: "history",
        routes,
    });
}

// 导出工厂函数
// export function createRouter() {
//     return new Router({
//         mode: 'history',
//         routes: [
//             { path: '/', component: { render: h => h('div', 'index page') }},
//             { path: '/detail', component: { render: h => h('div', 'detail page')}}
//         ]
//     });
// }
