// 语法转换用 presets
// presets-env 原生JS的语法转换
// presets-flow
// presets-react 处理JSX
// presets-typescript 处理TS
// 新特性转换用 polyfill

// 使用polyfill 直接引用 // 配置 useBuiltIns: "usage" 就不需要收到引入 import "@babel/polyfill";
// import "@babel/polyfill";

const arr = [new Promise(() => {}), new Promise(() => {})];
arr.map((item) => {
    console.log(item);
});
