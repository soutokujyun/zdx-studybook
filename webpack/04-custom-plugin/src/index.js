import css from "./index.less";

// 1.
// var btn = document.createElement("button");
// btn.innerHTML = "新增";
// document.body.appendChild(btn);
// btn.onclick = function () {
//     var div = document.createElement("div");
//     div.innerHTML = "item";
//     document.body.appendChild(div);
// };

// 2.
// import counter from "./counter";
// import number from "./number";
// counter();
// number();

// // 因为开启了hotOnly 阻止浏览器刷新，即便改了js的代码也不会替换到浏览器上
// // 所以需要通过module.hot.accept 监听 从而操作document元素，到达更新效果。
// // 可以用vue-loader配置
// if (module.hot) {
//     module.hot.accept("./number.js", () => {
//         // console.log(
//         //     "hello.---------------------------------------------------"
//         // );
//         document.body.removeChild(document.getElementById("number"));
//         number();
//     });
// }

// 3. BABEL
import "./babel";

// 4. React
// import "./babelreact";

// 5. plugin
