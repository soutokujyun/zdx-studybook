var minSubArrayLen = function(target, nums) {
    let l = 0, now = 0, ans = Infinity;
    for (let i = 0; i < nums.length; i++) {
        now += nums[i]
        while(l < i && now - nums[l] >= target) {
            now -= nums[l]
            l++
        }

        if (now >= target) {
            ans = Math.min(ans, i - l + 1)
        }
    }
    if (ans == Infinity) return 0
    return ans
};