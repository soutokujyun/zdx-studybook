function uniqueArray(arr) {
    return Array.from(new Set(arr))
}

let arr = [1, 1, 2, 3, 3, 4]
console.log(uniqueArray(arr))
