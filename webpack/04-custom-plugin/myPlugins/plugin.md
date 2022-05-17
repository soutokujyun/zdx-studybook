# Plugin

## 如何实现一个 plugin

webpack 在编译代码过程中 生命周期概念 对应不同的打包阶段
打包阶段

-   module
-   Assets
    plugin 本质上是一个类

*   它是如何注册 webpack 的对应阶段

webpack 打包流程

1. 拿到配置，做初始化工作，得到最终配置
2. 实例化一个 compier 类， 注册插件，对应的生命周期绑定响应的时间
3. 执行编译，compier.run
4. compiler(构建阶段)->compilation(第 N 个阶段，bundle 资源被加工成什么样子)
5. 递归处理所有依赖模块 生成 chunk
6. 把 chunk 输出到 output 文件中
