/**
 * async await原理
 * 
 * 用处：以同步的方式执行异步操作
 * await 和 async是同时使用的
 * await 后面跟着Promise函数会起到“排队”的效果，否则会之间执行
 */

// 模拟接口请求
function request(num) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num * 2)
        }, 1000)
    })
}

// 1. 基本用法
function action() {
    request(1).then((first) => {
        request(2).then((second) => {
            console.log('actionForSort: ', first + second)
        })
    })
}

// action() // 6

// 2. 顺序执行做法
function actionForSort() {
    let first = request(1)
    let second = request(2)
    console.log('actionForSort: ', first + second)
}

// 返回的时一个 promise 函数，因为 JS 是顺序执行，且Promise会立即执行。
// 但是setTimeout是宏任务，需要等到下一次Event-Loop才会执行。
// 所以只会先输出promise对象。
// actionForSort() // Promise { <pending> } Promise { <pending> }

// 当然也有处理的办法,就是用数组收集promise对象，然后使用Promise.all()方法。
function actionForSort2() {
    let first = request(1)
    let second = request(2)
    let collect = [first, second]
    Promise.all(collect).then((arr) => {
       let sum = arr.reduce((prev, next) => {
            return prev + next
        }, 0)
        console.log('actionForSort2: ', sum)
    })
}

// actionForSort2() // 6

// 3. async-aiwat方法
async function actionForAsync() {
    let first = await request(1)
    let second = await request(2)

    console.log('actionForAsync: ', first + second)
}

// actionForAsync() // 6


// 原理
// async/await是一种语法糖，是利用ES6的generator函数特性达到“排队”效果

// generator函数
// generator函数跟普通函数在写法上的区别就是，多了一个星号*，并且只有在generator函数中才能使用yield，什么是yield呢，
// 他相当于generator函数执行的中途暂停点，比如下方有3个暂停点。而怎么才能暂停后继续走呢？那就得使用到next方法，

// next方法执行后会返回一个对象，对象中有value 和 done两个属性
// value：暂停点后面接的值，也就是yield后面接的值
// done：是否generator函数已走完，没走完为false，走完为true
// return 为走完后的valu值
function  * gen() {
    yield 1;
    yield 2;
    return 3
}

// const g = gen()
// console.log(g.next()) // { value: 1, done: false }
// console.log(g.next()) // { value: 2, done: false }
// console.log(g.next()) // { value: 3, done: true }

// yield后面接函数
function getNum(num) {
    return num
}
function * genForFn() {
    yield getNum(1)
    yield getNum(2)
    return 3
}

// const gff = genForFn()
// // 函数会立即执行，函数返回值为暂停点的value值
// console.log(gff.next()) // { value: 1, done: false }
// console.log(gff.next()) // { value: 2, done: false }
// console.log(gff.next()) // { value: 3, done: true }


// yield后面接Promise
function * genForPromise() {
    yield request(1) // 2
    yield request(2) // 4
    return 6
}

// const gfp = genForPromise()
// console.log(gfp.next()) // { value: Promise < pending >, done: false }
// console.log(gfp.next()) // { value: Promise < pending >, done: false }
// console.log(gfp.next()) // { value: 6, done: true }

// 其实我们想要的结果是 2,4,6
// gfp.next().value.then((res1) => {
//     console.log('next1: ', res1)
//     gfp.next().value.then((res2) => {
//         console.log('next2: ', res2)
//         console.log('next3: ', gfp.next().value)
//     })
// })

// generator函数可以用next方法来传参，并且可以通过yield来接收这个参数，注意两点:
// 第一次next传参是没用的，只有从第二次开始next传参才有用
// next传值时，要记住顺序是，先右边yield，后左边接收参数
function * genForParams() {
    const num1 = yield 1
    console.log('num1: ', num1)
    const num2 = yield 2
    console.log('num2: ', num2)
    return 3
}
// const gfps = genForParams()
// gfps.next() // 第一次传参无效
// gfps.next('第一个参数')
// gfps.next('第二个参数')

// Promise+next传参
function * genForPromiseAndNext() {
    const num1 = yield request(1)
    const num2 = yield request(num1)
    return num2
}

// const gfpan = genForPromiseAndNext()
// const next1 = gfpan.next()
// next1.value.then(res1 => {
//      // 这一步是把res1值赋值到num1上
//     const next2 = gfpan.next(res1)
//     next2.value.then(res2 => {
//         console.log(gfpan.next(res2))
//     })
// })

// 实现
// 第一步 返回promise
// function * generatorFn () {

// }
// function generatorToAsync(generatorFn) {
//     return function () {
//         return new Promise((resolve, reject) => {
    
//         })
//       }
// }

// const asyncFn = generatorToAsync(generatorFn) // promise

// 第二步 加入Promise+next传参

function * generatorFn () {
    const num1 = yield request(1)
    const num2 = yield request(num1)
    return num2
}
// function generatorToAsync(generatorFn) {
//     return function () {
//         return new Promise((resolve, reject) => {
//             const g = generatorFn()
//             const next1 = g.next()
//             next1.value.then(res1 => {
//                 // 这一步是把res1值赋值到num1上
//                 const next2 = g.next(res1)
//                 next2.value.then(res2 => {
//                     resolve(g.next(res2).value)
//                 })
//             })
//         })
//       }
// }
// const asyncFn = generatorToAsync(generatorFn) // promise
// asyncFn().then((res) => console.log(res)) // 2秒后输出4

// 完善一下代码
function generatorToAsync(generatorFn) {
    return function() {
        const gen = generatorFn.apply(this, arguments)
        return new Promise((resolve, reject) => {
            function go(key, arg) {
                let res
                try {
                    res = gen[key](arg)
                } catch (error) {
                    return reject(error)
                }

                let  { value, done } = res
                if (done) {
                    return resolve(value)
                } else {
                    return Promise.resolve(value).then(val => go('next', val), err => go('throw', err))
                }
            }
            go('next')
        })
    }
}

const asyncFn = generatorToAsync(generatorFn) // promise
asyncFn().then((res) => console.log(res)) // 2秒后输出4