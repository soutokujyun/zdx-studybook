// new 操作符

function User(name) {
    this.name = name
}

// 正常使用
// const user = new User('Zeng Dexun')

// 模拟new操作符
/*
* new 一个函数所执行的过程
1. 首先创建一个空对象 {}
2. 将这个对象的__proto__连接到构造函数的原型对象上
3. 将构造函数的this指向这个对象
4. 如果构造函数有返回值则返回构造函数，如果没有则返回对象
*/
function createNew(fn, ...rest) {
    const obj = {}
    obj.__proto__ = fn.prototype
    const result = fn.apply(obj, rest)
    return result instanceof Object ? result : obj
}

const user = createNew(User, 'Zeng Dexun')

console.log(user.name)