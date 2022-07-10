// 数组乱序

// 普通做法
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function mixArray(arr) {
    return arr.sort(() => {
        return Math.random() - 0.5
    })
}

console.log(mixArray(arr))



// Fisher–Yates shuffle 洗牌法
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]]
}
function shuffle(arr) {
    let m = arr.length, i;
    while(m) {
        i = Math.floor(Math.random() * m--)
        swap(arr, i, m)
    }
    return arr
}

console.log(shuffle(arr))