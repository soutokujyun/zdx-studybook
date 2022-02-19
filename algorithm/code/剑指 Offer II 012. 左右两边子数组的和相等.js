var pivotIndex = function(nums) {
    let sum = [0]
    for (let i = 0; i < nums.length; i++) {
        sum[i + 1] = sum[i] + nums[i]
    }

    let n  = sum.length - 1
    for (let i = 0; i < sum.length; i++) {
        if (sum[i] === sum[n] - sum[i + 1]) {
            return i
        }
    }
    return -1
};