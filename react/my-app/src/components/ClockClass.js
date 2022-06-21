import React, { Component } from 'react'

export default class ClockClass extends Component {
    constructor(props) {
        super(props) // 继承父类方法
        // 存储状态
        this.state = {
            date: new Date()
        }
    }
    componentDidMount() {
        this.timer = setInterval(() => {
            // 更新state
            this.setState({
                date: new Date()
            })
        }, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    render() {
        const { date } = this.state;
        return (
            <div>
                <h3>ClassComponent</h3>
                <p>{date.toLocaleTimeString()}</p>
            </div>
        )
    }
}