function isObject(obj) {
    return obj && typeof obj == 'object'
}

function deepClone(obj, hash = new WeakMap()) {
    if (!isObject(obj)) return obj
    if (hash.has(obj)) {
        return hash.get(obj)
    }
    const target = Array.isArray(obj) ? [] : {}
    hash.set(obj, target)
    Object.keys(obj).forEach((key) => {
        if (isObject(obj[key])) {
            target[key] = deepClone(obj[key], hash)
        } else {
            target[key] = obj[key]
        }
    })
    return target
}

let obj1 = {
    a: 1,
    b: {
        c: 2,
        d: [3, 4, 5, 6],
        e: {
            f: 7,
            g: 8
        }
    }
}

const obj2 = deepClone(obj1)
console.log(obj2);