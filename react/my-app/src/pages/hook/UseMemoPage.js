import React, { useMemo, useState } from 'react'

export default function UseMemoPage() {
    const [count, setCount] = useState(0)

    // 当前计算只和count有关
    // 未优化时，value改变时，expensive函数也会执行
    const expensive = useMemo(() => {
        console.log('compute')
        let sum = 0;
        for(let i = 0; i < count; i++) {
            sum += i
        }
        return sum
        // 只有count改变时，当前函数才会重新执行
    }, [count])

    const [value, setValue] = useState('')
    return (
        <div>
            <h3>UseMemoPage</h3>
            <p>count: {count}</p>
            <p>expensive: {expensive}</p>
            <button onClick={() => setCount(count + 1)}>add</button>
            <input value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
    )
}
