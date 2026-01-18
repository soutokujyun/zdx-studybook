// 装饰器: 本身是一个函数
// TypeScript5.0以上版本可以直接使用类装饰器

// 1. 类装饰器
/**
 * Demo函数会在Person定义时执行
 * 参数说明：
 *    target: 类的构造函数 即Person
 */
function CustomDecorator(target: Function) {
    target.prototype.toString = function () {
        return JSON.stringify(this);
    }
    // 不允许添加新的属性或方法
    Object.seal(target.prototype);
}

@CustomDecorator
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

// 2. 装饰器返回一个新的类，新的类会替换掉被装饰的类
function Demo1(target: Function) {
    return class {
        test() {
            console.log(200);
        }
    }
}
@Demo1
class Person1 {
    test() {
        console.log(100);
    }
}

/**
 * 3. 声明构造类型
 * new：类型是可以用new操作符调用
 * ...args：构造器可以接受任意数量参数
 * any[]: 构造器参数可以是任意类型
 * {}: 构造器返回一个对象，非null 非undefined
 */
type Constructor = new (...args: any[]) => {};
function test2(fn: Constructor) {};
class Person2 {}
test2(Person2);

/**
 * 4. 声明构造类型 + 指定静态属性
 */
type Constructor3 = {
    new (...args: any[]): {}; // 构造签名
    wife: string; // 静态属性
}
function test3(fn: Constructor3) {}
class Person3 {
    static wife = '张三';
}
test3(Person3);

// 5. 替换被装饰的类
// 原型上添加新方法
// 需求：设计一个LogTime装饰器，用于记录实例对象创建时间，再添加一个方法用于读取创建时间
interface User4 {
    getTime(): Date;
}
type Constructor4 = new (...args: any[]) => {}; // 构造签名

// 创建一个装饰器，为类添加日志功能和创建时间
function LogTime<T extends Constructor4>(target: T) {
    return class extends target {
        private createTime: Date;
        constructor(...args: any[]) {
            super(...args);
            this.createTime = new Date();
        }
        getTime() {
            return this.createTime;
        }
    }
}
@LogTime
class User4 {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

// 6. 装饰器工厂
// 返回一个装饰器函数，可以为装饰器添加函数，更灵活控制装饰器行为
// 需求：定义一个LogInfo 类装饰器工厂，实现Person实例可以调用introduce方法，且introduce方法输出内容次数由LogInfo装饰器工厂参数指定
interface Person5 {
    introduce: () => void;
}
function LogInfo(n: number) {
    return function(target: Function) {
        target.prototype.introduce = function () {
            for (let i = 0; i < n; i++) {
                console.log(`我是${this.name}，我今年${this.age}岁`);
            }
        }
    }
}
@LogInfo(3)
class Person5 {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}


// 7. 属性装饰器
// 需求：定义一个LogName属性装饰器，实现类实例调用getName方法时，输出属性值
/**
 * Demo函数会在Person定义时执行
 * 参数说明：
 *    target: 对于静态属性，是类的构造函数；对于实例属性，是类的原型对象
 *    propertyKey: 被装饰的属性名
 */
function State6(target: object, propertyKey: string) {
    // 存储属性内部值
    let key = `__${propertyKey}`;

    // 使用 Object.defineProperty 替换类的原始属性
    // 重新定义属性，使其使用自定义的getter和setter
    Object.defineProperty(target, propertyKey, {
        get() {
            return this[key];
        },
        set(value: string) {
            console.log(`设置${propertyKey}为${value}`);
            this[key] = value;
        },
        enumerable: true, // 可枚举
        configurable: true, // 可配置
    })
}
class Person6 {
    name: string;
    @State6
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

// 8. 方法装饰器
/**
 * Demo函数会在Person定义时执行
 * 参数说明：
 *    target: 对于静态方法，是类的构造函数；对于实例方法，是类的原型对象
 *    propertyKey: 被装饰的方法名
 *    descriptor: 方法的属性描述符
 */
function logger(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(target, propertyKey, descriptor);
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
        console.log('调用前');
        const result = original.apply(this, args);
        console.log('调用后');
        return result;
    }
}

function Validate(maxValue: number) {
    return function(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
        const original = descriptor.value;
        descriptor.value = function (...args: any[]) {
            if (args[0] > maxValue) {
                console.log('参数值超出范围');
                return;
            }
            return original.apply(this, args);
        }
    }
}

class Person7 {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    @logger
    speak() {
        console.log(`我是${this.name}，我今年${this.age}岁`);
    }
    @Validate(18)
    static isAdult(age: number) {
        return age >= 18;
    }
}

// 9. 访问器装饰器
function RangeValidate(min: number, max: number) {
    return function(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalSetter = descriptor.set;
        descriptor.set = function (value: number) {
            if (value < min || value > max) {
                console.log('温度值超出范围');
                return;
            }
            originalSetter?.call(this, value);
        }
    }
}
class Weather {
    private _temp: number;
    constructor(temp: number) {
        this._temp = temp;
    }
    @RangeValidate(-30,30)
    set temp(value: number) {
        this._temp = value;
    }
    get temp() {
        return this._temp;
    }
}
// 10. 参数装饰器
/**
 * Demo函数会在Person定义时执行
 * 参数说明：
 *    target: 对于静态方法，是类的构造函数；对于实例方法，是类的原型对象
 *    propertyKey: 被装饰的方法名
 *    parameterIndex: 参数在方法参数列表中的索引
 */
function Demo9(target: object, propertyKey: string, parameterIndex: number) {
    console.log(target, propertyKey, parameterIndex);
}
class Person9 {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    speak(@Demo9 name: string) {
        console.log(`我是${name}，我今年${this.age}岁`);
    }
}