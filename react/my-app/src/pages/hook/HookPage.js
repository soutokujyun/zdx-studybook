import React, { useEffect, useState } from 'react'

// Hook
// export default function HookPage() {
//     // 定义一个count的state变量， 初始化为0
//     const [count, setCount] = useState(0)
//     const [date, setDate] = useState(new Date())
//     // 与 componentdidMount componentdidUpdate类似
//     // 条件执行，只有满足count改变时才会执行effect
//     useEffect(() => {
//         console.log('Effect')
//         document.title = `点击了${count}次`
//     }, [count])

//     useEffect(() => {
//         const timer = setInterval(() => {
//             setDate(new Date())
//         }, 1000)
//         return () => {
//             clearInterval(timer)
//         }
//     }, [])
//   return (
//     <div>
//         <h3>HookPage</h3>
//         <p>{date.toLocaleTimeString()}</p>
//         <p>{count}</p>
//         <button onClick={() => setCount(count + 1)}>add</button>
//     </div>
//   )
// }

// 自定义Hook
export default function HookPage() {
    // 定义一个count的state变量， 初始化为0
    const [count, setCount] = useState(0)
    
    // 与 componentdidMount componentdidUpdate类似
    // 条件执行，只有满足count改变时才会执行effect
    useEffect(() => {
        console.log('Effect')
        document.title = `点击了${count}次`
    }, [count])
  return (
    <div>
        <h3>HookPage</h3>
        <p>{useClock().toLocaleTimeString()}</p>
        <p>{count}</p>
        <button onClick={() => setCount(count + 1)}>add</button>
    </div>
  )
}

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