var numSubarrayProductLessThanK = function(nums, k) {
    if (k == 0) return 0
    let l = 0, now = 1, ans = 0
    for (let i = 0; i < nums.length; i++) {
        now *= nums[i]
        while (l < i && now >= k) {
            now /= nums[l]
            l++
        }
        if (now < k) {
            ans += i - l + 1
        }
    }
    if (ans == 0) return 0
    return ans
};