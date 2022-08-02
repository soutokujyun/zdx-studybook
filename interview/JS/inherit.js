function Parent(name) {
    this.name = name
    this.say = () => {
        return `${this.name} Say Hello!`
    }
}
Parent.prototype.age = 18
Parent.prototype.say = function() {
    return `${this.name} say Hello!`;
}

// 1. 原型链继承
// function Children(name) {
//     this.name = name
// }
// Children.prototype = new Parent() // Parent {name: undefined, say: ƒ}

// 问题：实例无法向父类方法传参
// c.say() => undefined Say Hello!

// 问题：所有实例都会共享父类实例的属性

// 2. 构造函数继承
// function Children(name) {
//     Parent.call(this, name)
//     this.name = name
// }
// 问题：无法继承父类原型的属性 也就是无法继承age
// c.age => undefined

// 3. 组合继承（原型链+构造函数继承）
// 对策：解决实例无法向父类传参问题
// function Children(name) {
//     Parent.call(this, name)
//     this.name = name
// }
// 对策：解决构造函数无法继承原型链问题
// Children.prototype = new Parent() // Parent {name: undefined, say: ƒ}
// Children.prototype.constructor = Children // 原型重写会丢失constructor属性
// 问题：会调用两次父类构造函数(内存消耗)


// 4. 原型式继承 -- 类似Object.create(obj)原理
// function Children(obj) {
//     function Fn() {}
//     Fn.prototype = obj // Parent {name: undefined, say: ƒ}
//     return new Fn()
// }

// const p = new Parent()
// const c = Children(p)
// 类似复制一个对象，用函数包装 也就是 赋值一个类实例对象
// => const c = Object.create(new Parent())
// 方法属性都需要后面自己定义

// 5. 寄生式继承 -- 实现原型链继承
// function content(obj) {
//     function Fn() {}
//     Fn.prototype = obj
//     return new Fn()
// }
// function Children(obj) {
//     const child = content(obj)
//     // 也可以写成
//     // const child = Object.create(obj)
//     child.name = 'zeng'
//     return child
// }
// const p = new Parent()
// const c = Children(p)

// 意义是给对象扩充方法活属性

// 6. 寄生组合式继承（常用）

function Children(name) {
    // 构造函数式继承
    Parent.call(this)
    this.name = name
}

Children.prototype = Object.create(Parent.prototype)
Children.prototype.constructor = Children

// 对策：避免调用两次父类构造函数
const c = new Children('Aguda')
console.log(c)
console.log(c.name)
console.log(c.age)
console.log(c.say())
console.log(c instanceof Parent);

{
    // ES6 class
    class Parent {
        constructor(name) {
            this.name = name
        }

        say() {
            return `${this.name} say Hello!`;
        }
    }

    class Children extends Parent {
        constructor(name) {
            super(name)
            this.name = name
        }
    }

    let c = new Children('zeng')
    console.log(c.say())
}

// ES6class继承 和 寄生组合式继承的区别：
// 1. 寄生组合式继承和父类是属于共享原型属性和方法的继承
// 2. 而class继承是实现真正的继承