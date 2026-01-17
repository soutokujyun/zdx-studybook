// JS 数据类型
// string、number、boolean、null、undefined、symbol、bigint
// object: Array、Object、Map、Set、WeakMap、WeakSet、Function、Error...

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

let str1: string // TS官方推荐
str1 = 'hello';
// str1 = new String('hello'); // 报错

let str2: String // 不推荐
str2 = 'hello';
str2 = new String('hello');

// any 类型
let any1: any // 任意类型
let x1: string
x1 = any1;

// unknown 类型
let unknown1: unknown // 未知类型
let x2: string
// x2 = unknown1; // 报错
// 类型断言
x2 = unknown1 as string;
// 类型守卫
if (typeof unknown1 === 'string') {
    x2 = unknown1;
}

// never 类型
let never1: never // 永远不会出现的值
function throwError(): never {
    throw new Error('程序运行错误！！！');
}

// void 类型
let void1: void // 没有任何类型
// 返回值为空（undefined）
function logMessage1(msg: string): void {
    console.log(msg);
}
function logMessage2(msg: string): void {
    return undefined;
}
function logMessage3(msg: string): void {
    return;
}

// object 类型 少用
let object1: object // 任意对象类型
object1 = {};
object1 = [];
object1 = new Map();
object1 = new Set();
object1 = new WeakMap();
object1 = new WeakSet();
object1 = function () { };
object1 = new Error('程序运行错误！！！');
// Object类型 可以调用Object方法的类型比如.toString()、.valueOf()等
let person: { name: string, age: number }
// let person:{ name: string; age: number }
// let person: {
//     name: string
//     age: number
// }

// enum 类型
// 数字枚举
enum Color {
    Red,
    Green,
    Blue,
}
let color1: Color
color1 = Color.Red;
// 字符串枚举 反向映射
enum Color2 {
    Red = 'RED',
    Green = 'GREEN',
    Blue = 'BLUE',
}
let color2: Color2
color2 = Color2.Red;
// 常量枚举
const enum Color3 {
    Red,
    Green,
    Blue,
}
let color3 = Color3.Red;

// tuple 类型
// 第一个元素为字符串，第二个元素为数字
let tuple1: [string, number]
// 第一个元素为数字，第二个元素为可选的布尔值
let tuple2: [number, boolean?]
// 第一个元素为数字，后面的元素为任意数量的字符串
let tuple3: [number, ...string[]]

// type 类型
// 定义一个类型别名
type Point = {
    x: number;
    y: number;
}
// 使用类型别名定义变量
// 联合类型
type Status = number | string
type Gender = 'male' | 'female'

// 交叉类型
// 面积
type Area = {
    width: number; // 长
    height: number; // 高
}
// 地址
type Address = {
    street: string; // 街道
    city: string; // 城市
}
type House = Area & Address

// 特殊情况：
// 由于typescript并不会严格要求函数返回空
// list.forEach((item) => list2.push(item)) 箭头函数不会有return
type LogFunc = () => void
const f1: LogFunc = () => {
    return 999; // 这个是不标红 void不奏效
}

// 类 类型
// public 关键字 表示公共属性或方法，默认就是public
// private 关键字 表示私有属性或方法，只能在类内部访问
// protected 关键字 表示受保护属性或方法，只能在类内部和子类中访问
class Person {
    public name: string;
    protected age: number;
    public readonly sex: string = 'male';
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    speak() {
        console.log(`我是${this.name}，我今年${this.age}岁`);
    }
}

class Student extends Person {
    private grade: string;
    constructor(name: string, age: number, grade: string) {
        super(name, age);
        this.grade = grade;
    }
    // 加上override关键字可以显式地表示这是一个重写方法
    override speak() {
        console.log(`我是${this.name}，我今年${this.age}岁，我在${this.grade}年级`);
    }
}

// 类简写形式： public 不能丢
class person1 {
    constructor(public name: string, public age: number) {}
}

// 抽象类 不能被实例化，只能被继承
// 简记：抽象类不能实例化，只能被继承，抽象类里可以有抽象方法和普通方法
abstract class Animal {
    abstract makeSound(): void; // 抽象方法
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

// interface 接口
// 接口 定义结构的方式，主要作用： 类、对象、函数等规定一种契约，这样可以确保代码的一致性和类型安全
// 要注意 interface 只能定义格式，不能包含任何具体实现 （只动嘴，不工作）
interface IPerson {
    name: string;
    age: number;
    speak(n: number): void;
}
// 接口自动合并
interface IPerson {
    gender: Gender;
}

class Person1 implements IPerson {
    name: string;
    age: number;
    gender: Gender;
    constructor(name: string, age: number, gender: Gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    speak(n: number) {
        console.log(`我是${this.name}，我今年${this.age}岁，我是第${n}个`);
    }
}
const Person2: IPerson = {
    name: '张三',
    age: 18,
    gender: 'male',
    speak(n: number) {
        console.log(`我是${this.name}，我今年${this.age}岁，我是第${n}个`);
    }
}
// 继承 接口
interface IStudent extends IPerson {
    grade: string;
}

// interface 和 type 区别
// 相同点： 都可以定义对象的结构
// 不同点： 
// 1. interface 可以自动合并，type 不能自动合并
// 2. interface 可以继承，type 不能继承
// 3. interface 可以实现多继承，type 不能实现多继承
// 4. type 可以定义基本类型，interface 不能定义基本类型 type shuzi = number | string

// 泛型：T ：允许定义函数、类、接口时，不预先指定具体的类型，而是在调用时再指定类型
function identity<T>(arg: T): T {
    return arg;
}
// 看调用时指定的类型参数
identity<number>(100);
identity<string>('hello');
// 泛型可以有多个
function logData<T, U>(data1: T, data2: T): T | U {
    console.log(data1, data2);
    return Date.now() % 2 === 0 ? data1 : data2;
}
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}
// 泛型接口
interface IPerson1<T> {
    name: string;
    age: number;
    extentInfo: T;
}
type JobInfo = {
    job: string;
    salary: number;
}

let p: IPerson1<JobInfo> = {
    name: '张三',
    age: 18,
    extentInfo: {
        job: '前端开发',
        salary: 10000,
    }
}
// 类型声明文件：
// 一般以 .d.ts 结尾，为现有的javascript文件提供类型信息
// 例如： 有一个 utils.js 文件，我们可以创建一个 utils.d.ts 文件，为其添加类型信息
// 这样在其他文件中引入 utils.js 时，就可以获得类型检查和智能提示

// 引用类型声明文件
// 在 TypeScript 文件中，你可以通过三斜线指令引用这个类型声明文件：
// -->>  /// <reference path="./utils.d.ts" />  <<--
/// <reference path="./utils.d.ts" />
import { add, sub } from '../src/utils.js';
add(1, 2);