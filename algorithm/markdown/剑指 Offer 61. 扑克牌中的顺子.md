从若干副扑克牌中随机抽 5 张牌，判断是不是一个顺子，即这5张牌是不是连续的。2～10为数字本身，A为1，J为11，Q为12，K为13，而大、小王为 0 ，可以看成任意数字。A 不能视为 14。

示例 1:
```
输入: [1,2,3,4,5]
输出: True
```

示例 2:
```
输入: [0,0,1,2,5]
输出: True
```
### 解题思路
 1. 对5张牌进行排序
 2. 获得大小王的数量
 3. 判断有无重复牌
 4. 判断最大值减去最小值是否小于5

### 代码
```
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
```