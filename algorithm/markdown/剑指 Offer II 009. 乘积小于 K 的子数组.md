给定一个正整数数组 nums和整数 k ，请找出该数组内乘积小于 k 的连续的子数组的个数。

示例 1:
```
输入: nums = [10,5,2,6], k = 100
输出: 8
解释: 8 个乘积小于 100 的子数组分别为: [10], [5], [2], [6], [10,5], [5,2], [2,6], [5,2,6]。
需要注意的是 [10,5,2] 并不是乘积小于100的子数组。
```
示例 2:
```
输入: nums = [1,2,3], k = 0
输出: 0
```
### 解题思路
这一题和 《剑指 Offer II 008. 和大于等于 target 的最短子数组》这一题类似，唯一区别是这一题记录的是符合要求的子数组个数。

### 代码
```
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
```