import React, { Component } from 'react'
import TopBar from './TopBar'
import BottomBar from './BottomBar'
export default class Layout extends Component {
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
                {/* {this.props.children} */}
                {children.title}
                {children.content}
                <button onClick={children.btnClick}>绑定父级传下来的事件</button>
                {showBottomBar && <BottomBar />}
            </div>
        )
    }
}
