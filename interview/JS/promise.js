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