给定一个非负整数 n ，请计算 0 到 n 之间的每个数字的二进制表示中 1 的个数，并输出一个数组。

示例 1:
```
输入: n = 2
输出: [0,1,1]
解释: 
0 --> 0
1 --> 1
2 --> 10
```
示例 2:
```
输入: n = 5
输出: [0,1,1,2,1,2]
解释:
0 --> 0
1 --> 1
2 --> 10
3 --> 11
4 --> 100
5 --> 101
```
### 解题思路
这一题求的是数的二进制表示为1的个数，那么我们遍历每个数，让每个数做位运算直到数为0，然后判断位运算最后一位是否为1，如果为1则出现次数加1次，否则跳过。

### 代码
```
var countBits = function(n) {
    let bit2 = new Array(n + 1).fill(0)
    for (let i = 1; i <= n; i++) {
        let x = i;
        do {
            if (x & 1) {
                bit2[i]++
            }
            x = x >> 1;
        } while (x)
    }
    return bit2
};
```