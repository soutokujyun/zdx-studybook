# 前端模块化
## 背景
一个网站由很多页面组成，以前开发人员习惯以页面的维度将开发任务或者代码分割开来，这也算是模块化的开发。但是一个页面往往也比较复杂，所有的js代码或者HTML代码写在一起很难维护，所以出现了更为完善的前端模块话开发方法，目的就是让代码更容易管理，可以提高代码的复用率。

### 什么是模块
* 将一个复杂的程序依据一定的规则(规范)封装成几个块(文件), 并进行组合在一起；
* 块的内部数据/实现是私有的, 只是向外部暴露一些接口(方法)与外部其它模块通信（符合高内聚、低耦合性质）；

### 什么是模块化
解决一个复杂问题时自顶向下把系统划分成若干模块的过程，有多种属性，分别反映其内部特性。

## 常见模块化
* CommonJS、
* AMD
* CMD
* ES6模块系统

### CommonJS
主要在Node.js中应用于服务端。

> CommonJS规范规定，每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports，且赋值是只能是一个对象```{Obj}```）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。

CommonJS采用动态同步加载方式，运行到哪里就加载哪里（加载完成才会执行后面的操作），加载时会运行并缓存运行结果，以后再次加载时直接从缓存中读取结果。

加载时是对模块的深拷贝，也就是使用模块缓存的值不会影响到其他程序（因为模块暴露出来的是对象，对象是引用类型，说到这应该懂了吧）。
```
// params.js
module.exports = { x: 1 }
// a.js
const params = require('./params.js')
params.x = 2
// b.js
const params = require('./params.js')
console.log(params.x) // 结果为1  不会受a.js影响
```

使用
```
// utils.js
function add(x, y) {
    return x + y
}
module.exports = {
    add // 将方法暴露出去
}
// index.js
const utils = require('./utils') // 引入模块，这个过程是动态的
utils.add(1, 2) // 调用模块方法
```
### AMD
AMD规范采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。

AMD模块定义的方法非常清晰，不会污染全局环境，能够清楚地显示依赖关系

优点： 
1. 防止JS加载时阻塞页面渲染；
2. 调用JS更容易控制优先顺，防止出现一大堆的```<script src="...">```的这种加载方式。

使用AMD规范时，通常需要使用require.js来进行异步加载模块，用require.config()指定引用路径等，用define()定义模块，用require()加载模块。

```
// 引入require.js
<script src="js/require.js"></script> // 下载require.js后然后引入

// 首先用config()指定各模块路径和引用名，所有的模块都会以这个基础路径作为参考
require.config({
  baseUrl: "assets/js",
  paths: {
    "jquery" : ["http://libs.baidu.com/jquery/2.0.3/jquery", "jquery.min"], //实际路径为 assets/js/jquery.min.js
    "utils": "utils",
    "sum:: "sum"
  }
})

// 定义模块
define("模块名称", ["模块的依赖项"], function(){
   函数体：模块的具体实现，模块中所有的代码全都放在该函数中
})

// 引用模块
require(["模块文件的路径(不带.js后缀的)"], function(){

    模块加载成功之后的回调函数

    模块的加载是异步的，在模块加载完成之后，才能使用模块的相关功能

})
```
使用
```
// 定义一个sum模块 sum.js
define(function() {
    let add = function(x, y) {
        return x + y
    }
    return {
        add: add
    }
})

// 定义一个依赖sum模块的utils模块 utils.js
define(['sum'], function(sum) {
    let init = 1;
    // 累加1
    function accumulation(x) {
        return sum.add(x + init)
    }
    return {
        accumulation
    }
})

// main.js 执行程序
(function() {
    require.config({
        baseUrl: './assets/js',
        paths: {
            "sum": "sum",
            "utils": "utils"
        }
    });
    require(['utils'], function(utils) {
        let index = 0;
        setInterval(() => {
            document.getElementById("app").textContent = utils.accumulation(index)
            index++
        }, 1000);
    })
})()

// html加载
<script data-main="./assets/js/main" src="./assets/js/require.js"></script>
```
### CMD
CMD 模块的加载是异步的，模块使用时才会加载执行。

CMD是另一种js模块化方案，它与AMD很类似，不同点在于：AMD 推崇依赖前置、提前执行，CMD推崇依赖就近、延迟执行。CMD主要使用的时seajs来进行的模块化管理。

基本语法
```
// 定义没有依赖的模块
define(function(require, exports, module){
  exports.xxx = value
  module.exports = { xxx: value } // 或
})

// 定义有依赖的模块
define(function(require, exports, module){
  //引入依赖模块(同步)
  var module2 = require('./module2')
  module2.xxx

  //引入依赖模块(异步)
    require.async('./module3', function (m3) {
        m3.xxx
    })
  //暴露模块
  exports.xxx = value
})
```
使用
```
// module1.js
define(function(require, exports, module) {
    let num = 1
    exports.num = num
})

// module2.js
define(function(require, exports, module) {
    let { num } = require('./module1.js')
    let add = function(x) {
        return x + num
    }
    module.exports = {
        add
    }
})
// main.js
define(function(require) {
    let { add } = require("./module2.js")
    document.getElementById("app").textContent = add(1)
})

// html使用
<script src="./assets/cmd/sea.js"></script>
<script>
    seajs.use("./assets/cmd/main.js")
</script>
```
### ES6 Module
ES6模块不是对象，import命令被JavaScript引擎静态分析，在编译的时候就引入模块代码。而不是在代码运行时加载，所以无法实现条件加载。也就使得静态分析成为可能。
> ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。

>ES6 的模块自动采用严格模式，不管你有没有在模块头部加上```"use strict";```。

模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。

export使用
```
// utils.js
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
```
import使用
```
// main.js
import name, { double, minus_1, plus } from "./utils.js"
console.log('double: ', double(1))
console.log('minus_1', minus_1(10))
console.log('plus', plus(4))
console.log('name', name)
// 或
import name, * as utils from "./utils.js"
console.log('double: ', utils.double(1))
console.log('minus_1', utils.minus_1(10))
console.log('plus', utils.plus(4))
console.log('name', name)
```
html加载
```
<script type="module" src="./assets/es6/main.js"></script>
```

/Users/admin/studybook/interview/markdown/module.md