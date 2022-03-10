let temp = []
var mergeSort = function(arr, l, r) {
    if (l >= r) return
    let mid = (l + r) >> 1
    mergeSort(arr, l, mid)
    mergeSort(arr, mid + 1, r)
    let k = l, p1 = l, p2 = mid + 1
    while (p1 <= mid || p2 <= r) {
        if ((p2 > r) || (p1 <= mid && arr[p1].val > arr[p2].val)) {
            arr[p1].count += r - p2 + 1
            temp[k++] = arr[p1++]

        } else {
            temp[k++] = arr[p2++]
        }
    }
    for (let i = l; i <= r; i++) arr[i] = temp[i]
}
var countSmaller = function(nums) {
    let arr = []
    for (let i = 0; i < nums.length; i++) arr.push({val: nums[i], index: i, count: 0})
    while(temp.length < nums.length) temp.push(0)
    mergeSort(arr, 0, arr.length - 1)
    let ans = []
    for (let i = 0; i < arr.length; i++) ans[arr[i].index] = arr[i].count
    return ans
};