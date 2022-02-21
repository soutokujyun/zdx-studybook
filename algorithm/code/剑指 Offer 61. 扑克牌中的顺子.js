var isStraight = function(nums) {
    nums = nums.sort((a, b) => a - b)
    let cnt = 0
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] == 0) cnt++
    }
    for (let i = cnt + 1; i < 5; i++) {
        if (nums[i] == nums[i - 1]) return false
    }
    let max = nums[4], min = cnt == 5 ? nums[4] : nums[cnt]
    if (max - min < 5) return true
    return false 
};