给定一个整数数组和一个整数 k ，请找到该数组中和为 k 的连续子数组的个数。

示例 1 :
```
输入:nums = [1,1,1], k = 2
输出: 2
解释: 此题 [1,1] 与 [1,1] 为两种不同的情况
```
示例 2 :
```
输入:nums = [1,2,3], k = 3
输出: 2
```
### 解题思路
* 注意的是求*连续*子数组，不同得子数组：起点不一样或终点不一样
* 求得是子数组得和，也就是区间和 => 要求前缀和

这一题可以遍历前缀和每个节点，然后去遍历查找以当前节点为终点得前面某个节点形成```sum[i] - k == sum[j]```的关系，就可以找到数组中和为 k 的连续子数组。但是每次查找都要遍历前面的树，时间复杂度过高，我们可以再遍历时记录每个前缀和出现的次数，然后只需去找一下映射表中出现的个数，就可以找到当前节点为终点和为k的连续子数组个数了。

### 代码
```
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
```