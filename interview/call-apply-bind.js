// 手写 call apply bind 实现

/**
 * 基础用法
 */

function User(gender, area) {
    console.log(`${this.name}: ${this.age}: ${gender}: ${area}`)
}

User.prototype.say = function () {
    console.log('say: ' + this.name);
}

const user =  {
    name: 'Gatsby',
    age: 16
}

// console.log(User.call(user, '男', '美国'))
// console.log(User.apply(user, ['男', '美国']))
// console.log(User.bind(user, '男', '美国')())

/**
 * 实现
 */

Function.prototype.myCall = function(context, ...args) {
    if (!context || context === null) {
        context = window
    }
    // 创建唯一key。作为构造context的内部方法名
    const fn = Symbol()
    context[fn] = this
    return context[fn](...args)
}

console.log(User.myCall(user, '男', '美国'))

Function.prototype.myApply = function(context, args) {
    if (!context || context === null) {
        context = window
    }
    // 创建唯一key。作为构造context的内部方法名
    const fn = Symbol()
    context[fn] = this
    return context[fn](...args)
}

console.log(User.myApply(user, ['男', '美国']))

// bind 涉及参数合并
// console.log(User.bind(user, '男')('美国'))

Function.prototype.myBind = function (context, ...args) {
    if (!context || context === null) {
        context = window
    }
    const fn = Symbol()
    context[fn] = this
    let _this = this
    const result = function (...innerArgs) {
        const params = args.concat(innerArgs)
        // 第一种情况 :若是将 bind 绑定之后的函数当作构造函数，通过 new 操作符使用，则不绑定传入的 this，而是将 this 指向实例化出来的对象
        // 此时由于new操作符作用  this指向result实例对象  而result又继承自传入的_this 根据原型链知识可得出以下结论
        // this.__proto__ === result.prototype   //this instanceof result =>true
        // this.__proto__.__proto__ === result.prototype.__proto__ === _this.prototype; //this instanceof _this =>true
        if (this instanceof _this === true) {
            this[fn] = _this
            this[fn](...params)
        } else {
            context[fn](...params)
        }
    }
    result.prototype = Object.create(this.prototype)
    return result
}

// 作为构造函数调用 -- 函数作为构造函数时 bind第一个参数无效
const bindUser = User.myBind(user, '男')
const u = new bindUser('美国')
console.log(u.say())

// 作为普通函数
console.log(User.myBind(null, '男')('美国'))
