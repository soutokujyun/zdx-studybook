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
    a: 1,
    b: {
        c: 2,
        d: [3, 4, 5]
    },
    e: [6, 7, 8]
}

let obj2 = deepClone(obj1)
console.log(obj2)