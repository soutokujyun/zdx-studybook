"use strict";
// JS 数据类型
// string、number、boolean、null、undefined、symbol、bigint
// object: Array、Object、Map、Set、WeakMap、WeakSet、Function、Error...
Object.defineProperty(exports, "__esModule", { value: true });
// TS 数据类型
// 上述所有类型都可以在 TS 中使用
// 六个新类型：any、unknown、never、void、object、enum、tuple
// any: 表示任意类型，一般用于快速修复类型错误时
// unknown: 表示未知类型，一般用于类型断言时
// never: 表示永远不会出现的值，一般用于抛出异常或无限循环时
// void: 表示没有任何类型，一般用于函数没有返回值时
// object: 表示任意对象类型，一般用于快速修复类型错误时
// enum: 用于定义枚举类型，一般用于表示固定数量的常量值
// 两个自定义类型：type、interface
// type: 用于定义基本类型、联合类型、交叉类型、元组类型、枚举类型等
// interface: 用于定义对象类型、函数类型、类类型等
let str1; // TS官方推荐
str1 = 'hello';
// str1 = new String('hello'); // 报错
let str2; // 不推荐
str2 = 'hello';
str2 = new String('hello');
// any 类型
let any1; // 任意类型
let x1;
x1 = any1;
// unknown 类型
let unknown1; // 未知类型
let x2;
// x2 = unknown1; // 报错
// 类型断言
x2 = unknown1;
// 类型守卫
if (typeof unknown1 === 'string') {
    x2 = unknown1;
}
// never 类型
let never1; // 永远不会出现的值
function throwError() {
    throw new Error('程序运行错误！！！');
}
// void 类型
let void1; // 没有任何类型
// 返回值为空（undefined）
function logMessage1(msg) {
    console.log(msg);
}
function logMessage2(msg) {
    return undefined;
}
function logMessage3(msg) {
    return;
}
// object 类型 少用
let object1; // 任意对象类型
object1 = {};
object1 = [];
object1 = new Map();
object1 = new Set();
object1 = new WeakMap();
object1 = new WeakSet();
object1 = function () { };
object1 = new Error('程序运行错误！！！');
// Object类型 可以调用Object方法的类型比如.toString()、.valueOf()等
let person;
// let person:{ name: string; age: number }
// let person: {
//     name: string
//     age: number
// }
// enum 类型
// 数字枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
let color1;
color1 = Color.Red;
// 字符串枚举 反向映射
var Color2;
(function (Color2) {
    Color2["Red"] = "RED";
    Color2["Green"] = "GREEN";
    Color2["Blue"] = "BLUE";
})(Color2 || (Color2 = {}));
let color2;
color2 = Color2.Red;
// 常量枚举
var Color3;
(function (Color3) {
    Color3[Color3["Red"] = 0] = "Red";
    Color3[Color3["Green"] = 1] = "Green";
    Color3[Color3["Blue"] = 2] = "Blue";
})(Color3 || (Color3 = {}));
let color3 = Color3.Red;
// tuple 类型
// 第一个元素为字符串，第二个元素为数字
let tuple1;
// 第一个元素为数字，第二个元素为可选的布尔值
let tuple2;
// 第一个元素为数字，后面的元素为任意数量的字符串
let tuple3;
const f1 = () => {
    return 999; // 这个是不标红 void不奏效
};
// 类 类型
// public 关键字 表示公共属性或方法，默认就是public
// private 关键字 表示私有属性或方法，只能在类内部访问
// protected 关键字 表示受保护属性或方法，只能在类内部和子类中访问
class Person {
    name;
    age;
    sex = 'male';
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    speak() {
        console.log(`我是${this.name}，我今年${this.age}岁`);
    }
}
class Student extends Person {
    grade;
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }
    // 加上override关键字可以显式地表示这是一个重写方法
    speak() {
        console.log(`我是${this.name}，我今年${this.age}岁，我在${this.grade}年级`);
    }
}
// 类简写形式： public 不能丢
class person1 {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
// 抽象类 不能被实例化，只能被继承
// 简记：抽象类不能实例化，只能被继承，抽象类里可以有抽象方法和普通方法
class Animal {
    // 普通方法
    sleep() {
        console.log('动物在睡觉');
    }
}
// 具体类 必须实现抽象类中的抽象方法
class Dog extends Animal {
    makeSound() {
        console.log('汪汪汪');
    }
}
class Person1 {
    name;
    age;
    gender;
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    speak(n) {
        console.log(`我是${this.name}，我今年${this.age}岁，我是第${n}个`);
    }
}
const Person2 = {
    name: '张三',
    age: 18,
    gender: 'male',
    speak(n) {
        console.log(`我是${this.name}，我今年${this.age}岁，我是第${n}个`);
    }
};
// interface 和 type 区别
// 相同点： 都可以定义对象的结构
// 不同点： 
// 1. interface 可以自动合并，type 不能自动合并
// 2. interface 可以继承，type 不能继承
// 3. interface 可以实现多继承，type 不能实现多继承
// 4. type 可以定义基本类型，interface 不能定义基本类型 type shuzi = number | string
// 泛型：T ：允许定义函数、类、接口时，不预先指定具体的类型，而是在调用时再指定类型
function identity(arg) {
    return arg;
}
// 看调用时指定的类型参数
identity(100);
identity('hello');
// 泛型可以有多个
function logData(data1, data2) {
    console.log(data1, data2);
    return Date.now() % 2 === 0 ? data1 : data2;
}
function swap(tuple) {
    return [tuple[1], tuple[0]];
}
let p = {
    name: '张三',
    age: 18,
    extentInfo: {
        job: '前端开发',
        salary: 10000,
    }
};
// 类型声明文件：
// 一般以 .d.ts 结尾，为现有的javascript文件提供类型信息
// 例如： 有一个 utils.js 文件，我们可以创建一个 utils.d.ts 文件，为其添加类型信息
// 这样在其他文件中引入 utils.js 时，就可以获得类型检查和智能提示
