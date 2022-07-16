function double(x) {
    return x * 2
}

let num = 1; // 外部无法访问内部变量
function minus(x) {
    return x - num
}

export {
    double, // 暴露方法
    minus as minus_1, // 使用as关键字重命名
}

export function plus(x) {
    return x + 10
}

var name = 'utils'

// 暴露默认的值
export default name;