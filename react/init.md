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
### 何时用
> Redux是负责组织state的工具
引入Redux场景：
1. 有相当大量的、随时间变化的数据
2. state需要单一可靠数据来源
3. state放在顶层组件已经无法满足需要。
4. 某个组件的状态需要共享
### 安装
### 使用