var swap = function(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]]
}
var sortColors = function(nums) {
    if (nums < 2) return nums
    let p0 = -1, p2 = nums.length, i = 0
    while (i < p2) {
        // 当nums[i]遇到1时位置不变
        if (nums[i] == 1) {
            i++
        // nums[i]遇到0时让 i 落到[0, p0)区域
        } else if (nums[i] == 0) {
            p0++
            swap(nums, i, p0)
            i++
        // nums[i]遇到2时让 i 落到(p2, 2]区域
        } else {
            p2--
            swap(nums, i, p2)
        }
    }
    return nums
};