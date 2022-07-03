import React, { PureComponent, useCallback, useState } from 'react'

export default function UseCallbackPage() {
    const [value, setValue] = useState('')
    const [count, setCount] = useState(0)

    // 返回的是函数执行后的值的记录版本
    const addClick = useCallback(() => {
        let sum = 0;
        for (let i = 0; i < count; i++) {
            sum += i
        }
        return sum
    }, [count])

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

class Child extends PureComponent {
    render() {
        const { addClick } = this.props
        console.log('child render')
        return (
            <div>
                <h4>Child</h4>
                <button onClick={() => console.log(addClick())}>add</button>
            </div>
        )
    }
}