var maxSubArray = function(nums) {
    let max = -Infinity
    let maxWithLast = 0

    for(let i = 0; i < nums.length; i++) {
        // 区间和如果小于0时，那么区间和最大值应该是当前值，因为如果与当前值相加会变得更小
        if (maxWithLast > 0) {
            maxWithLast += nums[i]
        } else {
            maxWithLast = nums[i]
        }
        max = Math.max(max, maxWithLast)
    }

    return max
};