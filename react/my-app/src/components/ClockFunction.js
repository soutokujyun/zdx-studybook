import React, { useState, useEffect } from "react";

export default function ClockFunction(props) {
    const [date, setDate] = useState(new Date())
    // 组件渲染完成执行
    useEffect(() => {
        // 相当于componentDidMount、componentWillUnmount、componentDidUpdate集合
        const timer = setInterval(() => {
            setDate(new Date())
        }, 1000);

        // 组件卸载时执行返回函数
        return () => clearInterval(timer)
    }, []) // 依赖项，是谁的值改变了，都需要重新执行，为空就是不再重新执行
    return (
        <div>
            <h3>Function Component</h3>
            <p>{date.toLocaleTimeString()}</p>
        </div>
    )
}