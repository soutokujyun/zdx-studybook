import React, { PureComponent } from 'react'

export default class PureComponentPage extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            flag: true,
            count: 0,
            obj: { num: 0 } // 3. 没有多级对象情况下就可以使用PureCompnent
        }
    }

    setCount = () => {
        // 1. 此时页面值不变，但是render()函数还是一直执行
        this.setState({ count: 100 })
        // 3. 但是PureComponent只能用于 >>浅比较<< ，多层对象就不起作用了
        if (this.state.flag) {
            this.setState({ obj: { num: 100 } })
        }
    }

    toggle = (e) => {
        const flag = JSON.parse(e.target.value)
        this.setState({ flag: flag })
    }

    // 3. 使用PureComponent就可以不需要以下函数钩子
    // 2. 通过shouldComponentUpdate函数来决定是否执行update生命周期函数
    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextState.count !== this.state.count
    // }

    render() {
        console.log('render');
        const { count } = this.state
        return (
            <div>
                <h3>PureComponentPage</h3>
                <div>
                    是否有多级对象
                    <input type="radio" name='toggle' value="true" onChange={(e) => this.toggle(e)} defaultChecked /> 是
                    <input type="radio" name='toggle' value="false" onChange={(e) => this.toggle(e)} /> 否
                </div>
                <button onClick={() => this.setCount()}>{count}</button>
            </div>
        )
    }
}