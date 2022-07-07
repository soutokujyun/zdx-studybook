/**
 * 深拷贝
 * 
 * 数据类型分为：基础类型和引用类型
 * 基础类型存在栈中，引用类型存在堆中
 * 引用类型赋值其实只是拷贝值的引用而不是拷贝真实的数据
 */

// 1. 浅拷贝
let obj = {
    x: 1
}
// 只拷贝值的引用
let copyObj = obj
// 改变obj.x的数据, 同时也会改变copyObj的值，因为它们共用一个堆存储
obj.x = 2
console.log(copyObj.x) // 2

// 2. 深拷贝
function isObject(val) {
    return val && typeof val == 'object' 
}

function deepClone(obj) {
    let target = Array.isArray(obj) ? [] : {}
    if (isObject(obj)) {
        for(key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (isObject(obj[key])) {
                    target[key] = deepClone(obj[key])
                } else {
                    target[key] = obj[key]
                }
            }
        }
    }
    return target
}

// function deepClone(obj, hash = new WeakMap()) {
//     if (!isObject(obj)) return obj
//     if (hash.has(obj)) return hash.get(obj)
//     let target = Array.isArray(obj) ? [] : {}
//     hash.set(obj, target)
//     Reflect.ownKeys(obj).forEach(key => {
//         if (isObject(obj[key])) {
//             target[key] = deepClone(target, hash)
//         } else {
//             target[key] = obj[key]
//         }
//     })
//     return target
// }

let obj1 = {
    x: 1,
}
// 深拷贝会在内存中另开辟一个空间（堆）存储新的值
let obj2 = deepClone(obj1)
obj1.x = 2
console.log(obj2.x) // 1