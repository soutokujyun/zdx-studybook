// 有这么几个函数，需要经过这几个函数处理才能得到一个值

function fn1(x) {
    return x + 1
}

function fn2(x) {
    return x + 2
}

function fn3(x) {
    return x + 3
}

// 那么执行的过程是
console.log(fn1(fn2(fn3(1))))

// 以上执行的方式是多层嵌套，就是把一个函数的执行结果作为另一个函数的参数传递
// 如果这种嵌套的写法过多层，那么可读性就会比较差。

// 那么有没有一种办法可以将嵌套的方法扁平化呢？类似这样(fn1, fn2, fn3)(x)

// Compose函数 -- 将需要嵌套执行的函数扁平化处理
// 接收多个函数作为参数，从右到左，一个函数的输入为另一个函数的输出

// 1. 普通写法
{
    function compose(first, ...args) {
        return function(param) {
            let result = first(param)
            args.forEach(fn => {
                result = fn(result)
            })
            return result
        }
    }
    // 函数从右往左执行
    let fn = compose(fn1, fn2, fn3)
    console.log(fn(1)) // 1 + 3 + 2 + 1
}

// 2. 普通写法
{
    function compose(...fn) {
        if (!fn) return (v) => v
        if (fn.length == 1) return fn[0]

        return function(param) {
            return fn.reverse().reduce((pre, cur) => cur(pre), param)
        }
    }
    // 函数从右往左执行
    let fn = compose(fn1, fn2, fn3)
    console.log(fn(1)) // 1 + 3 + 2 + 1
}

// 3. React中的写法
{
    function compose(...fn) {
        if (!fn) return (v) => v
        if (fn.length == 1) return fn[0]
        return fn.reduce((pre, cur) => (...args) => pre(cur(...args)))
    }
    // 函数从右往左执行
    let fn = compose(fn1, fn2, fn3)
    console.log(fn(1)) // 1 + 3 + 2 + 1
}