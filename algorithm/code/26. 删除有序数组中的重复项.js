var removeDuplicates = function(nums) {
    let target = nums[0], cur = 1
    while(cur < nums.length) {
        if (target == nums[cur]) {
            nums.splice(cur, 1)
        } else {
            target = nums[cur]
            cur++
        }
    }
    return nums.length
};