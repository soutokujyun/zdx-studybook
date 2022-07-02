## 起步
1. 创建项目： npx create-react-app my-app
2. 启动： npm start
3. 暴露配置项： npm run eject

## State
### 正确使用setState
setState(partialState, callback)
1. partialState: Object|function 用于产生与当前state合并的子集
```
this.setState((state)=> {
    return {
        counter: state.counter + v
    }
})
```
2. callback: function state更新后被调用

### 关于setState的三件事
1. 不要直接修改state
2. state的更新可能是异步的
    1. 同步情况 更新时放在setTimeout里面，或者使用原生事件调用更新事件，或者在setState(..., callback) callback事件中调用
    2. 异步情况 在合成事件和生命周期中是异步的，这里说的异步其实是批量更新，达到优化性能的目的
3. state的更新会被合并
    ```
    // 只会执行 +2的步骤 覆盖 +1
    this.setState({counter: this.state.counter + 1})
    this.setState({counter: this.state.counter + 2})

    // 如果既要加1 也要+2 那么需要把setState第一个参数改为函数
    this.setState((state) => {
        return {
            counter: state.counter + 1
        }
    })
    this.setState((state) => {
        return {
            counter: state.counter + 2
        }
    })
    ```

## 组件复合
### 简单
HomePage.js
```
<Layout>
    <div>HomePage</div>
</Layout>
```
Layout.js
```
<div>
    <TopBar />
    {
        this.props.children
    }
    <ButtomBar />
</div>
```
### 条件渲染
HomePage.js
```
<Layout showTopBar={false} showBottomBar={true}>
    <div>HomePage</div>
</Layout>
```
Layout.js
```
 const { children, showTopBar, showBottomBar } = this.props
    return (
      <div>
          {showTopBar && <TopBar />}
          {this.props.children}
          {showBottomBar && <BottomBar />}
      </div>
    )
```
### 组件 children
HomePage.js
```
        <Layout showTopBar={false} showBottomBar={true} title="商城首页">
            {
              {
                content: (
                  <div>具名插槽</div>
                ),
                title: "这是个文本",
                btnClick: () => {console.log('这是一个事件')}
              }
            }
        </Layout>
```
Layout.js
```
    componentDidMount() {
        const { title = '商城' } = this.props
        document.title = title
    }
    render() {
        const { children, showTopBar, showBottomBar } = this.props
        console.log(children);
        return (
            <div>
                {showTopBar && <TopBar />}
                {children.title}
                {children.content}
                <button onClick={children.btnClick}>绑定父级传下来的事件</button>
                {showBottomBar && <BottomBar />}
            </div>
        )
    }
```
## redux
### 是什么
redux是JavaScript应用的状态容器，提供可预测化的状态管理。它保证程序行为一致性且易于测试。
### 何时用
> Redux是负责组织state的工具
引入Redux场景：
1. 有相当大量的、随时间变化的数据
2. state需要单一可靠数据来源
3. state放在顶层组件已经无法满足需要。
4. 某个组件的状态需要共享
### 安装
```
$ npm install redux --save
```
### 使用
1. 需要一个store存储数据
新建 ./store/index.js
```
import { createStore } from "redux"

// 定义state初始化和修改规则
function counterReducer(state = 0, action) {
    switch (action.type) {
        case 'ADD': return state + 1;
        case 'MIUNS': return state + 1;
        default: return state;
    }
}
const store = createStore(counterReducer)

export default store;
```

pages/ReduxStore.js
```
import React, { Component } from 'react'
import store from '../store'
export default class ReduxPage extends Component {
    componentDidMount() {
        store.subscribe(() => {
            this.forceUpdate();
        })
    }
    render() {
        console.log('store', store)
        return (
            <div>
                <h3>ReduxPage</h3>
                <p>{store.getState()}</p>
                <button onClick={() => store.dispatch({ type: "ADD" })}>ADD</button>
            </div>
        )
    }
}
```
## react-redux
### 按照
```
npm install react-redux --save
```
### 使用
react-redux提供两种API:
1. Provider 为后代组件提供store
2. connect为组件提供数据和变更方法
创建ReactReduxPage.js
```
import store from '../store'
import { Provider } from 'react-redux'
export default class ReactReduxPage extends Component {
  render() {
    return (
        <Provider store={store}>
            <div>ReactReduxPage</div>
            <RrpComponent />
        </Provider>
    )
  }
}
```
创建RrpComponent.js
```
import { connect } from 'react-redux'

export default connect(
    // mapStateToProps 把state映射到props上
    state => ({ num: state }),
    // 默认情况下：mapDispatchToProps 就已经把dispatch映射到props
    // 当然也可以把dispatch结构成多个执行方法
    //{
    //    add: () => ({ type: 'ADD' })
    //}
)(class RrpComponent extends Component {
  render() {

    const { num, dispatch } = this.props
    // const { num, add } = this.props
    console.log(this.props)
    return (
    <div>
        <h3>RrpComponent</h3>
        <p>{ num }</p>
        <button onClick={() => dispatch({ type: "ADD" })}>ADD</button>
        {/* <button onClick={add}>ADD</button> */}
    </div>
    )
  }
})
```

## react-router
### 是什么
包含三个库：react-router、react-router-dom和react-router-native。

react-router-dom和react-router-native都依赖react-router。在安装时也会自动安装。

### 安装
```
npm install --save react-router-dom
```
### 基本使用
react-router中奉行一切皆组件的思想:
1. 链接  ```<Link to="/">``` 普通a标签链接
2. 导航链接 ```<NavLink to="/message" className={({isActive}) => {}}  style={({isActive}) => {} } />``` 可以知道当前链接活动状态。
3. 导航 ```<Navigate to="/dashboard" replace={true}>``` 如果使用replace: true，导航将替换历史堆栈中的当前条目，而不是添加新条目。
4. 出口 ```<Outlet>``` 渲染子路由组件
5. 路由 ```<Routes><Route path="/message" element={<Page />}></Route></Routes>``` 两个是搭配使用的作为渲染组件路由。

```
<BrowserRouter>
    <Link to="/">首页</Link> | 
    <Link to="/redux">Redux</Link> | 
    <Link to="/redux/react">ReactRedux</Link> | 
    <Link to="/pure">PureComponent</Link>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/redux" element={<Redux />}>
            <Route index element={<ReduxPage/>} />
            <Route path="react" element={<ReactReduxPage/>} />
        </Route>
        <Route path="/pure" element={<PureComponentPage/>} />
    </Routes>
</BrowserRouter>
```
## PureCompnent
```
export default class PureComponentPage extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }
    setCount = () => {
        this.setState({ count: 100 })
    }

    render() {
        console.log('render');
        const { count } = this.state
        return (
            <div>
                <h3>PureComponentPage</h3>
                <button onClick={() => this.setCount()}>{count}</button>
            </div>
        )
    }
}
```
以上这种情况点击按钮触发setCount函数时，在state值不改变的情况下，render函数还是会执行，这样就造成性能问题，解决办法就是使用shouldComponentUpdate生命周期钩子来决定是否执行update生命周期函数。
```
shouldComponentUpdate(nextProps, nextState) {
    return nextState.count !== this.state.count
}
```
也可以使用PureComponent来对比state值
```
export default class PureComponentPage extends PureComponent {
}
```
当然PureComponent也有缺点，就是只能用于Class组件且只适用于浅比较，如果多级对象就无效。
```
setCount = () => {
    // PureComponent只能用于 >>浅比较<< ，多级对象就不起作用了，render函数还是会执行
    this.setState({ obj: { num: 100 } })
}
```

## Hook
### 认识Hook
Hook是一个特殊的函数，它可以“钩入”React的特性。例如，useState是允许你在React函数组件中添加state的Hook。

#### useState
```

```
