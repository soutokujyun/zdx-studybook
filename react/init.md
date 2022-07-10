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

函数组件没有生命周期和state定义，这些只能在class组件使用，所以需要hook来帮助定义
#### useState
```
import React, { useState } from 'react'

export default function HookPage() {
    // 定义一个count的state变量， 初始化为0
    const [count, setCount] = useState(0)
  return (
    <div>
        <h3>HookPage</h3>
        <p>{count}</p>
        <button onClick={() => setCount(count + 1)}>add</button>
    </div>
  )
}
```
#### Effect Hook
Effect Hook 可以让你在函数组件中执行副作用操作。

数据获取，设置订阅以及手动更改React组件中的DOM都属于副作用。

```
// 与 componentdidMount componentdidUpdate类似
useEffect(() => {
    console.log('Effect')
    document.title = `点击了${count}次`
})
```
条件执行

```
const [date, setDate] = useState(new Date())
useEffect(() => {
    // 条件1: 只需要在count改变时执行
    document.title = `点击了${count}次`
    // 条件2: 只需要在didMount的时候执行就可以了
    const timer = setInterval(() => {
        setDate(new Date())
    }, 1000)
})
```
以上document.title在count不变的情况下会一直赋值，effect会一直执行。

那么要满足两个条件，只需要多个Effct分别执行他们两个
```
// 条件执行，只有满足count改变时才会执行effect
useEffect(() => {
    console.log('Effect1')
    document.title = `点击了${count}次`
}, [count])

useEffect(() => {
     console.log('Effect2')
    const timer = setInterval(() => {
        setDate(new Date())
    }, 1000)
    // 清除副作用
    return () => {
        clearInterval(timer)
    }
}, [])
```
清除副作用

在useEffect() 函数里面返回一个函数来清除函数，会在函数卸载时执行return 的函数
```
useEffect(() => {
    const timer = setInterval(() => {
        setDate(new Date())
    }, 1000)
    // 清除副作用
    return () => {
        clearInterval(timer)
    }
}, [])
```

## 自定义Hook和Hook使用规则
1. 自定义Hook
组件间重用一些状态逻辑。可以调用以use开头命名的函数（自定义Hook）,函数内部也可以调用其他Hook。
```
<p>{useClock().toLocaleTimeString()}</p>

// 抽取函数使用自定义Hook，命名要以use开头
function useClock() {
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date())
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [])

    return date
}
```
2. 使用规则
* 只能在函数最外层调用Hook， 不能在循环、条件判断、或者之函数中调用。
* 只能在React函数组件中调用会自定义Hook里。

## useMemo 和 useCallback
### useMemo
把 “创建”函数 和 依赖项数组 作为参数传入useMemo，它仅会在某个依赖项改变时才重新计算memoized值。这种优化有助于避免在每次渲染时都进行高开销的计算。（类似Vue Computed接口）

```
const [value, setValue] = useState('')
const [count, setCount] = useState(0)
// 未优化时，value改变时，expensive函数也会执行
const expensive = () => {
    console.log('compute')
    let sum = 0;
    for(let i = 0; i < count; i++) {
        sum += i
    }
    return sum
}
...
<p>expensive: {expensive()}</p>
<input value={value} onChange={(e) => setValue(e.target.value)} />
```
优化
```
const expensive = useMemo(() => {
    console.log('compute')
    let sum = 0;
    for(let i = 0; i < count; i++) {
        sum += i
    }
    return sum
    // 只有count改变时，当前函数才会重新执行
}, [count])
```
## useCallback
把内联函数及依赖项数组作为参数传入useCallback，它将返回该回调函数的memoized版本，
该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化并使用引用相等性去避免非必要渲染（例如shouldComponentUpdate）的子组件时，它将非常有用。

```
export default function UseCallbackPage() {
    const [value, setValue] = useState('')
    const [count, setCount] = useState(0)

    const addClick = () => {
        let sum = 0;
        for (let i = 0; i < count; i++) {
            sum += i
        }
        return sum
    }

    return (
        <div>
            <h3>UseCallbackPage</h3>
            <p>count: {count}</p>
            <button onClick={() => setCount(count + 1)}>add</button>
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <Child addClick={addClick} />
        </div>
    )
}

class Child extends Component {
    render() {
        const { addClick } = this.props
        // input框更新时此时Child组件redner函数还是会执行
        console.log('child render')
        return (
            <div>
                <h4>Child</h4>
                <button onClick={() => console.log(addClick())}>add</button>
            </div>
        )
    }
}
```
在更新input时，没有必要每次都去更新addClick的函数

优化
```
export default function UseCallbackPage() {
    // 返回的是函数执行后的值的记录版本
    const addClick = useCallback(() => {
        ...
    }, [count])
    return (
        <div>
            ...
            <Child addClick={addClick} />
        </div>
    )
}

// 改为PureComponent
class Child extends PureComponent {
    ...
}
```
> useCallback(fn, deps) 相当于 useMemo(() => fn, deps)

## 弹窗类组件设计与实现
### 传送门 createPortal
把将要渲染的DOM放到DOM树的另一个角落

Dialog.js
```
import React, { Component } from 'react'
import { createPortal } from 'react-dom'

export default class Dialog extends Component {
    constructor(props) {
        super(props)
        const doc = window.document
        this.node = doc.createElement('div')
        doc.body.appendChild(this.node)
    }

    componentWillUnmount() {
        if (this.node) {
            // this.node.remove()
            window.document.body.removeChild(this.node)
        }
    }

    render() {
        return createPortal(
            <div className='dialog'>
                <h3>Dialog</h3>
            </div>,
            this.node
        )
    }
}
```
## 高阶组件-HOC
定义：高阶组件是参数为组件，返回值为新组件的函数。
```
const foo = Comp => props => {
    return (<div>
        <Comp {...props} />
    </div>)
}
function Child(props) {
    return <div>Child</div>
}
// 不要在render方法里定义
const Foo = foo(Child)
export default function HocPage() {
  return (
    <div>
       <h3>HocPage</h3>
       <Foo />
    </div>
  )
}
```
### 链式调用
```
const Foo = foo(foo(Child))
```
### 装饰器写法
```
@foo
class ClassChild extends Component {
    render() {
        return (
            <div>ClassChild</div>
        )
    }
}

<ClassChild /> 
```
#### 配置方法
1. 使用eject
```
$ npm run eject
$ npm i -D @babel/plugin-proposal-decorators
```
修改package.json文件，添加babel配置
```
"babel": {
    "plugins": [
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ]
    ],
    "presets": [
      "react-app"
    ]
  }
```

文件-> 首选项 -> 搜索 ExperimentalDecorators 打开vscode支持装饰器

2. react-app-rewrited
```
npm i react-app-rewired customize-cra --save-dev
npm i -D @babel/plugin-proposal-decorators
```
修改package.json 的scripts
```
  "scripts": {
    "r:start": "react-app-rewired start",
    "r:build": "react-app-rewired build",
    "r:test": "react-app-rewired test",
    "r:eject": "react-app-rewired eject"
  },
```
新建config-overrides.js
```
const {
  override,
  addDecoratorsLegacy
} = require('customize-cra')

module.exports = override(
  // enable legacy decorators babel plugin
  addDecoratorsLegacy(),
)
```
添加less
```
$ npm i less less-loader --save-dev
```
修改config-overrides.js
```
const {
  override,
  addLessLoader,
  addDecoratorsLegacy
} = require('customize-cra')

module.exports = override(
  // enable legacy decorators babel plugin
  addDecoratorsLegacy(),
  // less
  addLessLoader()
)
```

3. craco

