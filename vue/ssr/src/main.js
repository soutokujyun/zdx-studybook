import Vue from "vue";
import App from "./App.vue";
import { createRouter } from "./router";

Vue.config.productionTip = false;

// 导出Vue实例工厂函数，为每次请求创建独立实例
// 此方法未来调用者会是renderer
// context是renderer传递的参数
export function createApp(context) {
    // 创建路由器实例
    const router = createRouter();

    const app = new Vue({
        router,
        context,
        render: (h) => h(App),
    });

    return { app, router };
}

// 原始
// Vue.config.productionTip = false;

// new Vue({
//     router, // 可以在插件中访问到Router实例
//     store,
//     render: (h) => h(App),
// }).$mount("#app");
