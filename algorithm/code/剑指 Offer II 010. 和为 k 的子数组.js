var subarraySum = function(nums, k) {
    let sum = [0]
    for (let i = 0; i < nums.length; i++) {
        sum[i + 1] = sum[i] + nums[i]
    }
    let ans = 0
    let map = new Map()
    for(let i = 0; i < sum.length; i++) {
        let temp = sum[i] - k
        if (map.has(temp)) {
            ans += map.get(temp)
        }
        map.has(sum[i]) ? map.set(sum[i], map.get(sum[i]) + 1) : map.set(sum[i], 1)
    }
    return ans
};