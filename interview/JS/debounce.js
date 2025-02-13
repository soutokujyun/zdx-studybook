/**
 * 防抖 debounce
 * 触发事件后在n秒内函数只能执行1次，如果在n秒内又触发了事件，则会重新计算函数执行时间
 */
 function debounce(fn, delay) {
    let t = null
    return function () {
        const args = arguments
        if (t) {
            clearTimeout(t)
        }
        t = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
        return
    }
}

/**
 * 节流 throttle
 * 触发事件后在n秒内只执行1次，如果在n秒内又触发了事件，则不会再触发事件
 */
function throttle(fn, delay) {
    let preTime = new Date().getTime()
    return function() {
        let curTime = new Date().getTime()
        if (curTime - preTime < delay) {
            return
        }
        let args = arguments
        setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}