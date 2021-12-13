// function banarySearch(x, arr, l, r) {
//     if (l >= r) return -1;
//     let mid = (r + l) >> 1;
//     if (x == arr[mid]) return mid;
//     if (x > arr[mid]) {
//         return banarySearch(x, arr, mid + 1, r)
//     }
//     if (x < arr[mid]) {
//         return banarySearch(x, arr, l, mid - 1)
//     }
//     return -1;
// }

function banarySearch(arr, n, x) {
    let l = 0, r = n - 1, mid;
    while (l <= r) {
        mid = l + (r - l) >> 1;
        if (x == arr[mid]) return mid;
        if (x > arr[mid]) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}

let arr = [1,2,3,4,5,6,7,7,8,9];

// console.log(banarySearch(7, arr, 0, 9));
console.log(banarySearch(arr, arr.length, 7));

// 查找第一个大于等于x的位置
function banarySearchV2(arr, n, x) {
    let l = 0, r = n - 1, mid;
    while (l < r) {
        mid = l + (r - l) >> 1;
        if (x > arr[mid]) l = mid + 1; // 条件不成立
        else r = mid; // 条件成立
    }
    return l;
}