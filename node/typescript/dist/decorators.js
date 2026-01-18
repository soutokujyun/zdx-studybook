// 装饰器: 本身是一个函数
// TypeScript5.0以上版本可以直接使用类装饰器
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// 1. 类装饰器
/**
 * Demo函数会在Person定义时执行
 * 参数说明：
 *    target: 类的构造函数 即Person
 */
function CustomDecorator(target) {
    target.prototype.toString = function () {
        return JSON.stringify(this);
    };
    // 不允许添加新的属性或方法
    Object.seal(target.prototype);
}
let Person = class Person {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
};
Person = __decorate([
    CustomDecorator
], Person);
// 2. 装饰器返回一个新的类，新的类会替换掉被装饰的类
function Demo1(target) {
    return class {
        test() {
            console.log(200);
        }
    };
}
let Person1 = class Person1 {
    test() {
        console.log(100);
    }
};
Person1 = __decorate([
    Demo1
], Person1);
function test2(fn) { }
;
class Person2 {
}
test2(Person2);
function test3(fn) { }
class Person3 {
    static wife = '张三';
}
test3(Person3);
// 创建一个装饰器，为类添加日志功能和创建时间
function LogTime(target) {
    return class extends target {
        createTime;
        constructor(...args) {
            super(...args);
            this.createTime = new Date();
        }
        getTime() {
            return this.createTime;
        }
    };
}
let User4 = class User4 {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
};
User4 = __decorate([
    LogTime
], User4);
function LogInfo(n) {
    return function (target) {
        target.prototype.introduce = function () {
            for (let i = 0; i < n; i++) {
                console.log(`我是${this.name}，我今年${this.age}岁`);
            }
        };
    };
}
let Person5 = class Person5 {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
};
Person5 = __decorate([
    LogInfo(3)
], Person5);
// 7. 属性装饰器
// 需求：定义一个LogName属性装饰器，实现类实例调用getName方法时，输出属性值
/**
 * Demo函数会在Person定义时执行
 * 参数说明：
 *    target: 对于静态属性，是类的构造函数；对于实例属性，是类的原型对象
 *    propertyKey: 被装饰的属性名
 */
function State6(target, propertyKey) {
    // 存储属性内部值
    let key = `__${propertyKey}`;
    // 使用 Object.defineProperty 替换类的原始属性
    // 重新定义属性，使其使用自定义的getter和setter
    Object.defineProperty(target, propertyKey, {
        get() {
            return this[key];
        },
        set(value) {
            console.log(`设置${propertyKey}为${value}`);
            this[key] = value;
        },
        enumerable: true, // 可枚举
        configurable: true, // 可配置
    });
}
class Person6 {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
__decorate([
    State6
], Person6.prototype, "age", void 0);
// 8. 方法装饰器
/**
 * Demo函数会在Person定义时执行
 * 参数说明：
 *    target: 对于静态方法，是类的构造函数；对于实例方法，是类的原型对象
 *    propertyKey: 被装饰的方法名
 *    descriptor: 方法的属性描述符
 */
function logger(target, propertyKey, descriptor) {
    console.log(target, propertyKey, descriptor);
    const original = descriptor.value;
    descriptor.value = function (...args) {
        console.log('调用前');
        const result = original.apply(this, args);
        console.log('调用后');
        return result;
    };
}
function Validate(maxValue) {
    return function (target, propertyKey, descriptor) {
        const original = descriptor.value;
        descriptor.value = function (...args) {
            if (args[0] > maxValue) {
                console.log('参数值超出范围');
                return;
            }
            return original.apply(this, args);
        };
    };
}
class Person7 {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    speak() {
        console.log(`我是${this.name}，我今年${this.age}岁`);
    }
    static isAdult(age) {
        return age >= 18;
    }
}
__decorate([
    logger
], Person7.prototype, "speak", null);
__decorate([
    Validate(18)
], Person7, "isAdult", null);
// 9. 访问器装饰器
function RangeValidate(min, max) {
    return function (target, propertyKey, descriptor) {
        const originalSetter = descriptor.set;
        descriptor.set = function (value) {
            if (value < min || value > max) {
                console.log('温度值超出范围');
                return;
            }
            originalSetter?.call(this, value);
        };
    };
}
class Weather {
    _temp;
    constructor(temp) {
        this._temp = temp;
    }
    set temp(value) {
        this._temp = value;
    }
    get temp() {
        return this._temp;
    }
}
__decorate([
    RangeValidate(-30, 30)
], Weather.prototype, "temp", null);
// 10. 参数装饰器
/**
 * Demo函数会在Person定义时执行
 * 参数说明：
 *    target: 对于静态方法，是类的构造函数；对于实例方法，是类的原型对象
 *    propertyKey: 被装饰的方法名
 *    parameterIndex: 参数在方法参数列表中的索引
 */
function Demo9(target, propertyKey, parameterIndex) {
    console.log(target, propertyKey, parameterIndex);
}
class Person9 {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    speak(name) {
        console.log(`我是${name}，我今年${this.age}岁`);
    }
}
__decorate([
    __param(0, Demo9)
], Person9.prototype, "speak", null);
export {};
