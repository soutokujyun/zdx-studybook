给定一个二进制数组 nums , 找到含有相同数量的 0 和 1 的最长连续子数组，并返回该子数组的长度。

示例 1:
```
输入: nums = [0,1]
输出: 2
说明: [0, 1] 是具有相同数量 0 和 1 的最长连续子数组。
```
示例 2:
```
输入: nums = [0,1,0]
输出: 2
说明: [0, 1] (或 [1, 0]) 是具有相同数量 0 和 1 的最长连续子数组。
```

### 解题思路
这一题求的是最长连续子数组的长度。看到连续子数组 => 区间和 => 前缀和。求解前缀和，需要把0看成-1，然后在算区间和的时候，如区间和为0则 0和1 数量相同，否则不相同。

在求解的过程中需要记录每个前缀和第一次出现的下标，然后计算当前下标到已经记录的下标的长度，取最大值。

### 代码
```
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
```