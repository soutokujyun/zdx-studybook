// 实现add(1)(2) == 3
// 柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术。
// Tips: 函数执行用大括号包裹实际上是定义块级作用域
// 1. 实现简单的柯里化
{   
    function add(x, y) {
        return x + y
    }

    function currying(fn, ...args) {
        return function() {
            let params = Array.prototype.slice.call(arguments)
            return fn.apply(this, [...args, ...params])
        }
    }
    
    let addTo5 = currying(add, 5)
    console.log(addTo5(10)) // 15
}

// 参数定化的柯里化 -- 只允许接收3个参数
{
    function add(x, y, z) {
        return x + y + z
    }

    function currying(fn) {
        // 获取原函数参数的个数
        const limit = fn.length
        const args = Array.prototype.slice.call(arguments, 1)

        return function() {
            const params = Array.prototype.slice.call(arguments)
            const allParams = [...args, ...params]
            if (allParams.length >= limit) {
                return fn.apply(this, allParams)
            } else {
                // 继续柯里化
                return currying.call(null, fn, ...allParams)
            }
        }
    }

    let addOfCurry = currying(add)
    console.log(addOfCurry(5, 10, 15)) // 30
    console.log(addOfCurry(5)(10, 15)) // 30
    console.log(addOfCurry(5)(10)(15)) // 30
}

// 参数不定的柯里化
// 难点在于不定参数时，返回的是函数还是值
// 解决办法是后面没有()时，函数默认执行toString()方法
{
    function add() {
        return [...arguments].reduce((pre, cur) => pre + cur, 0)
    }
    function currying(fn) {
        const args = Array.prototype.slice.call(arguments, 1)

        function curried() {
            const params = Array.prototype.slice.call(arguments)
            const allParams = [...args, ...params]
            return currying.call(null, fn, ...allParams)
        }
        // 打印return的函数时会默认调用toString方法
        curried.toString = function() {
            return fn.apply(null, args)
        }
        return curried
    }

    let addOfCurry = currying(add)
    console.log(addOfCurry(5, 10, 15))
    console.log(addOfCurry(5)(10, 15))
    console.log(addOfCurry(5)(10)(15))
}