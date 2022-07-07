// 不使用循环（for, foreach）删除数组指定位置的元素（删除第3个数）

// 1. slice
let arr = [1, 2, 3, 4, 5, 6, 7]
let slice1 = arr.slice(0, 2)
let slice2 = arr.slice(3)
console.log([...slice1, ...slice2])

// 2. splice
let spliceArr = [1, 2, 3, 4, 5, 6, 7]
spliceArr.splice(2,1) // 返回删除掉的数
console.log(spliceArr)

// 3. delete
let deleteArr = [1, 2, 3, 4, 5, 6, 7]
delete deleteArr[2]
console.log(deleteArr.join(",").replaceAll(/,/g, '').split(''))
