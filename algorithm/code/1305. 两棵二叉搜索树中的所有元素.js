var getArr = function(arr, root) {
    if (!root) return
    getArr(arr, root.left)
    arr.push(root.val)
    getArr(arr, root.right)
}
var getAllElements = function(root1, root2) {
    let arr1 = [], arr2 = []
    getArr(arr1, root1)
    getArr(arr2, root2)

    let ans = []
    let p1 = 0
    for(let i = 0; i < arr2.length; i++) {
        while(p1 < arr1.length && arr1[p1] <= arr2[i]) {
            ans.push(arr1[p1++])
        }
        ans.push(arr2[i])
    }

    if (p1 < arr1.length) {
        for (let i = p1; i < arr1.length; i++) {
            ans.push(arr1[i])
        }
    }
    return ans
};