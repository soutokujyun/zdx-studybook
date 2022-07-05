// 防抖：时间段内，事件只会触发最后一次
// 应用场景：
//     1. scroll事件滚动
//     2. 搜索框查询
//     3. 表单校验
//     4. 按钮提交事件
//     5. 浏览器窗口缩放，resize事件

function debounce(cb, timeout) {
    let timer = null
    return function (){
        clearTimeout(timer)
        timer = setTimeout(() => {
            cb.apply(this, arguments)
        }, timeout)
    }
}

function click(key, index) {
    console.log(`${key} click: ${index}`)
}

const debounceClick = debounce(click, 1000)

// 模拟点击
let index = 0
const interval = setInterval(() => {
    if (index > 4) {
        clearInterval(interval)
    }
    debounceClick('debounce', index)
    index++
}, 500);


// 节流: 按时间段间隔触发事件
// 应用场景：
//     1. DOM元素的拖拽功能实现
//     2. 射击游戏类
//     3. 计算鼠标移动的距离
//     4. 监听scroll事件
function throttle(cb, timeout) {
    let timer = null
    return function() {
        if (timer) return
        timer = setTimeout(() => {
            cb.apply(this, arguments)
            timer = null
        }, timeout)
    }
}

const throttleClick = throttle(click, 1000)

// 模拟点击
let number = 0
const interval2 = setInterval(() => {
    if (number > 4) {
        clearInterval(interval2)
    }
    throttleClick('throttle', number)
    number++
}, 500);
