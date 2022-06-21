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

