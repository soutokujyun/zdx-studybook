// 闭包是指有权访问另一个函数作用域中的变量的函数。

// 嵌套的内部函数使用了外部函数的变量，于是产生了闭包，
// 这里的闭包指的就是从makeFunc函数的第一句到return语句这一句。
function makeFunc() {
    var name = "Mozilla";
    function displayName() {
        alert(name);
    }
    return displayName;
}

var myFunc = makeFunc();
myFunc();

/**
 * 产生条件:
 * 1. 一个函数，里面有一些变量和另一个函数
 * 2. 外部函数里面的函数使用了外部函数的变量
 * 3. 外部函数最后把它里面的那个函数用return抛出去
 */

/**
 * 作用:
 * 1. 在函数外部可以读取函数内部的变量
 * 2. 设计私有方法和变量，避免全局变量污染
 * 2. 让这些变量的值始终保持在内存中
 */

/**
 * 注意: 使用闭包会将变量保存在内存中，滥用闭包会导致内存溢出或泄漏。退出函数前，需要将变量置null
 */


// 上面提到内存泄漏，那么什么是内存泄漏？引发条件是什么？如何避免？

// 什么是？
// 其实引擎虽然针对垃圾回收做了各种优化从而尽可能的确保垃圾得以回收，但并不是说我们就可以完全不用关心这块了，
// 我们代码中依然要主动避免一些不利于引擎做垃圾回收操作，因为不是所有无用对象内存都可以被回收的，那当不再用到的对象内存，
// 没有及时被回收时，我们叫它 内存泄漏（Memory leak）。

// 引发条件
// 1. 不正当闭包

// 2. 隐式全局变量
function fn() {
    // 这里没有声明，实际上是挂在到window对象上
    name = 'zeng'
}
fn()

// 3. 游离DOM引用
let root = document.querySelector('#root')
let div1 = document.querySelector('#div1');
// 操作完之后如果不将div1置null,那么这个树节点还是会存储在内存中
root.removeChild(div1)
// 置null后就会被GC
div1 = null

// 4. 未清理的定时器
// setTimeout 和 setInterval 是由浏览器专门线程来维护它的生命周期，
// 所以当在某个页面使用了定时器，当该页面销毁时，没有手动去释放清理这些定时器的话，那么这些定时器还是存活着的

// 5. 未清理的console
// 我们之所以在控制台能看到数据输出，是因为浏览器保存了我们输出对象的信息数据引用，也正是因此未清理的 console 如果输出了对象也会造成内存泄漏。

// 避免：变量置null