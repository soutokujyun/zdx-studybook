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
mount() -> render() -> patch() -> processElement() / proceComponent()/等 -> mountComponent() -> setupRenderEffect() -> patch() -> processElement() -> mountElement() ->? mountChildren() -> patch() -> 直到把树遍历完整

## 思考 - vue3 和 vue2 初始化方式的变化及原因
```
<div id="app">
    <h1>Vue3 init</h1>
    <comp></comp>
</div>
<script src="../dist/vue.global.js"></script>
<script>
    // 变化1: 函数式的创建实例
    // 动机： 对TS强类型的支持
    // vue2 : new Vue({})
    const app = Vue.createApp({
        render() {
            return Vue.h('div', {
                // vue2: attrs:{} props:{} 
                // vue3: 增强一致性 -- 扁平化
                title: '1', myprop: '1', onClick:()=>{}
            })
        }
    })
    // 变化2: 实例方法
    // vue2: Vue.component('',{}) // 直接挂载到构造函数中会造成全局污染
    app.component('comp', {
        template: '<div>comp</div>'
    })
    // 变化3: 挂载方法 
    // -- API简化、一致性
    // vue2: app.$mount('#app') 或者 el：‘#app’
    app.mount('#app')
</script>
```
## vue3更新流程分析
### 整体思路
- setupRenderEffect 建立更新机制
- 当前组件响应式数据发生变化，就会执行更新函数
- 内部会调用patch
### 学习方法
- 调用栈信息
- 单步调试
- 看源码
    - setupRenderEffect()
    - queueJob()
    - queueFlush()
    - --- async --- 会执行异步任务
    - flushJobs
    - effect.run() - class ReactiveEffect{ run(){} }
    - fn()
    - componentUpdateFn()
    - patch()
### 整体流程
- 更新机制的建立
    - mountComponent() -> setupRenderEffect() -> effect = new ReactiveEffect(fn, scheduler)
- 更新过程
    - anonymous() -> 拦截函数的set() -> trigger() -> triggerEffect() 触发和当前数据相关的所有函数 -> effect.scheduler() -> queueJob() 排队 -> queueFlush() 准备刷新
    - ---async---
    - flushJobs() -> effect.run() => effect.fn() => componentUpdateFn() -> patch() -> 界面就更新

## Composition API 
- setup
- 生命周期钩子
- getCurrentInstance 获取组件实例
- provide / inject

- 可维护性
- 逻辑复用
- 消灭this

- 结合reactivity
- 生命周期钩子
- 属性和上下文
```
const app = Vue.createApp({
    // data() {
    //     return {
    //         counter: 1
    //     }
    // },
    // mounted () {
    //     setInterval(() => {
    //         this.counter++
    //     }, 1000);
    // },
    // props需要声明
    setup(props, ctx) {
        // props.xxx 使用
        // ctx = { emit, slots, attrs, expose }
        const counter = Vue.ref(0)
        Vue.onMounted(() => {
            setInterval(()=> {
                counter.value++
            }, 1000)
        })
        return { counter }
        // setup可以返回渲染函数
        // return () => Vue.h('div')
    }
})
app.mount('#app')
```
### 探究
- setup执行的时刻？setup函数中没有created钩子？
    - setup返回的是方法时，返回的应该是一个渲染函数
    - processComponent
    - mountComponent 
        - 创建组件实例
        - 组件实例的初始化 setupComponent(instance)
    - 回答： 执行时刻早于beforeCreate和created之类的传统声明周期钩子。实际上在setup函数执行时，组件的实例已经创建了，所以在setup中去处理beforeCreate和created是没有意义的
- 传入setup参数中，是props ctx， 他们是什么 从何而来
- 如果和options api中的data()这些数据发生冲突，他们能共存吗，Vue3处理是的行为？
    - setup优先级更高
    - 两者是可共存
    - Vue3的处理行为： 对组件实例上下文instance.ctx做代理，在PublicInstanceProxyHandlers的get中会做逻辑判断，优先从setupState中获取，然后data,最后props
- 声明周期钩子是如何工作的
