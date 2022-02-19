var findMaxLength = function(nums) {
    let sum = [0]
    for (let i = 0; i < nums.length; i++) {
        sum[i + 1] = sum[i] + (nums[i] == 0 ? -1 : nums[i])
    }
    let ans = 0;
    let map = new Map() 
    for (let i = 0; i < sum.length; i++) {
        let temp = sum[i]
        if (map.has(temp)) {
            ans = Math.max(ans, i - map.get(temp))
        }
        !map.has(sum[i]) &&  map.set(sum[i], i)
    }
    return ans
};