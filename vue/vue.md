# Vue

## 源码学习方法
- 找到一条主线
    - 写上一段简单vue3代码
    - 思考如何跑起来
    - createApp
    - app.mount()
    - 数据何时变
    - 更新
        - 异步更新策略
        - patch细节
- 画一张思维导图
- 提出一个问题，去源码中找到答案
- 找一个轮子（写一个简单版的vue3）
- 费曼学习

## 搭建源码调试环境
下载
```
git clone https://github.com/vuejs/core.git
删除 puppeteer
pnpm install
npm i -g n
n lts
n

package.json: dev --sourcemap
pnpm run serve
```
起服务
```
vue/example/compostion/todomvc
```
开发者工具 source
```
cmd + p 打开todo
```
打断点 createApp + 刷新
然后 右键 Reveal in sidebar ==> 获取真实目录地址

## vue源码整体结构
### 目录结构
packages/*

主要的是：
- 编译器 compiler
- 运行时 runtime
- 入口模块 vue
- 响应式 reactivity
### 模块依赖关系
- vue
    - compiler-dom - compiler-core
    - reactivity
    - runtime-dom - runtime-core
## vue3初始化流程分析
- 主线
    - 应用程序实例创建过程 
        - createApp()
        - 问题：图和创建实例，实例长什么样 
            - renderer.createApp()
            - 实例：{use(){}, component(){}, mount(){}}
    - 挂载过程
        - app.mount()
        - 问题：挂载都做了什么？
            - 创建VNode
            - 执行render
                - 第一步生成的vnode传递给patch函数转为dom
                - 追加到宿主元素
            - 回答：传入组件数据和状态转换为dom，并追加到宿主元素
- 学习方法
    - 调试方法
        - 单步调试
        - 查看调用栈
        - 读源码

### 读源码

- scripts/dev.js 中的build({entryPoints: ...}) 找到入口文件
- packages/vue/src/index.ts 获取模版字符串，将模版字符串编译成renderer
- packages/runtime-dom/src/index.ts 找到createApp()函数，通过ensureRenderer()渲染器调用createApp()方法获取app实例，-- ensureRenderer()
- packages/runtime-core/src/renderer.ts createRenderer - baseCreateRenderer - 返回 { createApp: createAppAPI() }
- packages/runtime-core/src/apiCreateApp.ts 返回真正的createApp函数，createApp()里面声明app的实例并返回
- mount()函数 首次执行并未挂挂载 - 创建根组件的vnode - 然后执行render(函数)
- packages/runtime-core/src/renderer.ts render() 由于传入的第一个参数null，所以首次patch实际上是挂载过程，不是更新过程，vnode会被patch函数转化为dom对象，并追加到container的容器中

首次patch