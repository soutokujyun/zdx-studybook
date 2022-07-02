/*
    箭头函数
*/

// 1. 箭头函数比普通函数更加简洁
// 如果没有参数，就直接写一个空括号即可
const fn1 = () => {}
// 如果只有一个参数，可以省去参数括号
const fn2 = param => {}
// 如果有多个参数，用逗号分割
const fn3 = (param1, param2) => {}
// 如果函数体的返回值只有一句，可以省略大括号
const fn4 = param => param
// 如果函数体不需要返回值，且只有一句话，可以给这个语句前面加一个void关键字。最常用的就是调用一个函数：
const fn5 = () => void doesNotReturn()
    
// 2. 箭头函数没有自己的this
// 箭头函数不会创建自己的this,所以它没有自己的this,它只会在自己作用域的上一层继承this。
// 所以箭头函数中的this的指向在它在定义时就确定了，之后不会改变。
function fn6() {
    this.name = 'gatsby...'
    const fn7 = () => this.name
    return fn7()
}
console.log('Haven`t self this: ', fn6()); // gatsby...

// 3. call()、apply()、bind()等方法不能改变箭头函数中的this指向 
// 箭头函数使用call、apply、bind三个函数时默认第一个参数无论设置什么都为null
const obj = {
    userName: 'gatsby...'
}
window.userName = 'Tony...'
const fn8 = () => {
    // 由于没有自己的this指向，最终会指向window
    return this.userName
}
console.log('Call bind apply: ', fn8.apply(obj)) // Tony...

// 4. 箭头函数不能作为构造函数使用
const Fn9 = (userName) => {
    this.userName = userName
}
const fn9 = new Fn9('gatsby') // Uncaught TypeError: Fn9 is not a constructor

// 5. 箭头函数没有自己的arguments
const fn10 = () => {
    console.log(arguments[0]) // Uncaught ReferenceError: arguments is not defined
} 
fn10(1, 2)

// 6. 箭头函数没有prototype
// 因为不构造函数当然没有prototype
const fn11 = () => {}
console.log(fn11.prototype) // undefined

// 7. 箭头函数不能用作Generator函数,不能使用yeild关键字
const fn12 = *() => {
    yield '1';
    yield '2';
} //Uncaught SyntaxError: Unexpected token '*'
