// 寄生组合式继承
{
    function Parent(name) {
        this.name = name
    }

    Parent.prototype.say = function() {
        return `${this.name} Say Hello!`
    }

    function Children(name, age) {
        Parent.call(this, name)
        this.age = age
    }

    Children.prototype = Object.create(Parent.prototype)
    Children.prototype.construct = Children

    let c = new Children('zeng', 29)
    console.log(c.say())
    console.log(c.age)
}

// ES6继承方式
{
    class Parent {
        constructor(name) {
            this.name = name
        }
        say() {
            return `${this.name} Say Hello!`
        }
    }

    class Children extends Parent {
        constructor(name, age) {
            super(name)
            this.age = age
        }
    }

    let c = new Children('lin', 28)
    console.log(c.say())
    console.log(c.age)
}