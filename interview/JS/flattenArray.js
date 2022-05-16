// function flatten(arr) {
//     let result = []
//     arr.forEach(ele => {
//         if (ele instanceof Array) {
//             result.push(...flatten(ele))
//         } else {
//             result.push(ele)
//         }
//     })

//     return result
// }

function flatten(arr) {
    if (!Array.isArray(arr)) return [arr];
    return arr.reduce((prev, cur) => {
        return [...prev, ...flatten(cur)]
    }, [])
}

let arr = [1, 2, [3, 4, [5, 6], 7], 8, [9, 10]]
console.log(flatten(arr))