let gather = ['first', 'second', 'three', 'four'];

// 1. forEach方法

// gather.forEach((value, index, arr) => {
//     console.log('====================================');
//     console.log(value, index, arr)
//     console.log('====================================');
// })
// 原理
Array.prototype.MyForEach = function(cb) {
    for(let i = 0; i < this.length; i++) {
        cb(this[i], i, this)
    }
}

gather.MyForEach((value, index, arr) => {
    console.log('====================================');
    console.log(value, index, arr);
    console.log('====================================');
})

// 2. map方法
// const map = gather.map((value, index, arr) => {
//     return value + '_' + index
// })

// 原理
Array.prototype.MyMap = function(cb) {
    let result = []
    for(let i = 0; i < this.length; i++) {
        result.push(cb(this[i], i, this))
    }
    return result
}

const map = gather.MyMap((value, index, arr) => {
    return value + '_' + index
})

console.log(map)