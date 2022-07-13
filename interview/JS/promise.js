// Promise
/**
 * Promise是异步编程的一种解决方案。
 * 
 * 三种状态：
 *  pending(进行中)
 *  fulfilled(已成功)
 *  rejected(已失败)
 * 
 * 特点：
 *  1. 状态不受外界影响。状态只受resolve、reject、（throw）方法影响
 *  2. 状态一旦改变就不会变。promise状态只能从pending->fulfilled或pending->rejected。
 */


// 1 基本用法
// 1.1 构建promise实例
const promiseInstance = new Promise((resovle, reject) => {
    if (true /* 某异步代码 */) {
        resovle()
    } else {
        reject()
    }
})

// 1.2 实例构建完成，通过then方法接收resolved状态和rejected状态的回调函数
promiseInstance.then(() => {
    console.log('resolved状态回调函数')
}, () => {
    console.log('rejected状态回调函数')
})

// 1.3 当然上面这种写法是不推荐的，推荐写法
promiseInstance.then(() => {
    console.log('resolved状态回调函数')
}).catch(() => {
    console.log('rejected状态回调函数')
})

// 1.4 then返回一个新的promise实例，因此可以采用链式调用.then().then()
// 第一个回调函数完成后，会将返回值作为参数传入新的promise实例的回调函数中
promiseInstance.then(() => {
    console.log('第一个回调函数')
    return '第一个参数'
}).then((param) => {
    console.log('第二个回调函数, 参数:' + param)
})

// 1.5 如果返回的是promise对象,第二个then的回调函数就会等待这个promise对象状态发生变化
promiseInstance.then(() => {
    console.log('resolved状态回调函数')
    return promiseInstance
}).then(() => {
    console.log('返回实例的resolved状态回调函数')
}, () => {
    console.log('返回实例的rejected状态回调函数')
})

// 2 完整用法
new Promise(resovle => resovle())
    .then(() => {}) // resoved状态时执行
    .catch(() => {}) // rejected状态时执行
    .finally(() => {}) // 无论什么状态都执行


// 3 为什么需要Promis? ———— 解决回调地狱问题
let callback = (param, cb) => {
    setTimeout(() => {
        console.log('正在执行：' + param)
        cb && cb()
    }, 1000)
}
function callbackAction() {
    callback('callback 01', () => {
        callback('callback 02', () => {
            callback('callback 03')
        })
    })
}
callbackAction()

// Promise做法
const promise = (param) => new Promise(resovle => {
    setTimeout(() => {
        console.log(`正在执行：${param} ${new Date().toLocaleTimeString()}`)
        resovle()
    }, 3000)
})
function promiseAction() {
    console.log(`开始执行：${new Date().toLocaleTimeString()}`)
    promise('promise 01')
        .then(() => promise('promise 02'))
        .then(() => promise('promise 03'))
}
promiseAction()

// 4 Promise 静态方法

// 4.1 Promise.all()
/**
 * 用于将多个Promise实例包装成一个新的Promise实例。
 * 传入参数是可以是数组，也可以是带有Iterator（迭代）接口的数据结构。
 * 参数结构内部每个成员是promise对象。
 */

const p2Status = (flag, time = 1000) => {
    return new Promise((resovle, reject) => {
        setTimeout(() => {
            if (flag) {
                resovle('成功状态')
            } else {
                reject(new Error('失败状态'))
            }
        }, time)
    })
}

// 如:
Promise.all([ p2Status(true), p2Status(false, 3000) ]).catch(() => {}) // 传入数组

Promise.all(
    {
        0: p2Status(true),
        1: p2Status(false, 3000),
        length: 2,
        [Symbol.iterator]: Array.prototype[Symbol.iterator]
    }
).catch(() => {}) // 传入带iterator的对象

/**
 * 当参数内部的promise实例状态都变成fulfilled，或者其中一个变成rejecte，
 * 才会调用Promise.all后面的回调函数。
 * fulfilled状态的回调函数返回一个数组，该数组是参数内每个promise对象返回的集合。
 * rejected状态的回调函数返回参数内promise对象第一个为rejected状态的报错数据。
 */
Promise.all([p2Status(true), p2Status(false, 3000)])
    .then(([result1, result2]) => {})
    .catch(reason => {})

// 4.2 Promise.race()
/**
 * 和Promise.all() 传入参数相同
 * 
 * 当参数promise某个实例状态先改变，Promise.race状态也跟着改变
 */
Promise.race([p2Status(true), p2Status(false, 3000)])
    .then(result => {})
    .catch(reson => {})

// 4.3 Promise.allSettled()
/**
 * 用于将多个Promise实例包装成一个新的Promise实例。
 * 不管每个Promise实例操作成功还是失败，等所有的参数实例状态都变更，
 * Promise.allSettled状态都为fulfilled状态。
 * 回调方法返回的每个成员对应的是每个Promise对象。
 */
Promise.allSettled([p2Status(true), p2Status(false, 3000)])
    .then(resultObj => {
        // [
        //     { status: 'fulfilled', value: '成功状态' },
        //     { status: 'rejected', reason: 'Error: 失败状态,...' }
        // ]
    })

// 4.4 Promise.any()
/**
 * 用于将多个Promise实例包装成一个新的Promise实例。
 * 其中一个参数实例变成fulfilled状态，包装实例就会变成fulfilled
 * 所有参数实例都变成rejected状态, 包装实例才会变成rejected，
 * 抛出的错误是一个 AggregateError 实例，
 * 这个 AggregateError 实例对象的errors属性是一个数组，包含了所有成员的错误。
 */
 Promise.any([p2Status(true), p2Status(false, 3000)])
    .then(result => {})
    .catch(({ errors }) => {})

// 4.5 Promise.resolve()
/**
 * 将现有参数转为Promise对象
 */
// 传入参数分为4种情况：

// 4.5.1 参数是Promise实例
// Promise.resolve将不做任何修改、原封不动地返回这个实例。
// Promise.resolve(promise()) == promise() // true

// 4.5.2 参数是一个thenable对象，thenable对象指的是具有then方法的对象。
let thenable = {
    then: function(resolve, reject) {
        resolve(42);
    }
}
// Promise.resolve()方法会将这个对象转为 Promise 对象，
// 然后就立即执行thenable对象的then()方法。
let ta = Promise.resolve(thenable)
ta.then(value => console.log(value)) // 42

// 4.5.3 参数不含then()方法的对象或不是对象。
// 那么Promise.resolve()相当于Promise实例直接到fulfilled状态
Promise.resolve('foo') 
// 等价于
new Promise(resolve => resolve('foo'))

// 4.5.3 不带任何参数,直接返回一个resolved状态的Promise对象。
Promise.resolve().then(() => { console.log('ok') })

// 4.6 Promise.reject()
/**
 * 返回一个新的Promise实例，该实例的状态为rejected
 * Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。
 */
 Promise.reject('出错了')
 // 等同于
 new Promise((resolve, reject) => reject('出错了'))


// promise 状态
const PENDING = "PENDING",
    FULFILLED = "FULFILLED",
    REJECTED = "REJECTED";

class basePromise {
    constructor(executor) {
        this.status = PENDING; // 默认状态为PENDING
        this.value = undefined; // 保存成功状态的值，默认为undefined
        this.reason = undefined; // 保存失败状态的值，默认为undefined
        this.onResolvedCallbacks = []; // 保存成功回调
        this.onRejectCallbacks = []; // 保存失败回调

        const resovle = (value) => {
            if (this.status == PENDING) {
                this.status = FULFILLED;
                this.value = value;

                // 依次执行对应函数
                this.onResolvedCallbacks.forEach((fn) => fn());
            }
        };

        const reject = (reason) => {
            if (this.status == PENDING) {
                this.status = REJECTED;
                this.reason = reason;

                this.onRejectCallbacks.forEach((fn) => fn());
            }
        };

        try {
            executor(resovle, reject);
        } catch (error) {
            reject(error);
        }
    }

    then(onFulfilled, onRejected) {
        if (this.status == FULFILLED) {
            onFulfilled(this.value);
        } else if (this.status == REJECTED) {
            onRejected(this.reason);
        } else if (this.status == PENDING) {
            this.onResolvedCallbacks.push(() => {
                onFulfilled(this.value);
            });
            this.onRejectCallbacks.push(() => {
                onRejected(this.reason);
            });
        }
    }
}

module.exports = basePromise;