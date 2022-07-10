import React, { Component } from 'react'

// hoc
// 是一个函数，参数是组件, 返回新的组件
const foo = Comp => props => {
    return (<div className='border-1'>
        <Comp {...props} />
    </div>)
}

function Child(props) {
    return <div>Child</div>
}

class ClassChild extends Component {
    render() {
        return (
            <div>ClassChild</div>
        )
    }
}

const Foo = foo(foo(Child))


export default function HocPage() {
  return (
    <div>
       <h3>HocPage</h3>
       <Foo />
       <ClassChild /> 
    </div>
  )
}
