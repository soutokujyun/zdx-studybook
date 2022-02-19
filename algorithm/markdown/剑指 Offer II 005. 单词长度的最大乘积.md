给定一个字符串数组 words，请计算当两个字符串 words[i] 和 words[j] 不包含相同字符时，它们长度的乘积的最大值。假设字符串中只包含英语的小写字母。如果没有不包含相同字符的一对字符串，返回 0。

示例 1:
```
输入: words = ["abcw","baz","foo","bar","fxyz","abcdef"]
输出: 16 
解释: 这两个单词为 "abcw", "fxyz"。它们不包含相同字符，且长度的乘积最大。
```
示例 2:
```
输入: words = ["a","ab","abc","d","cd","bcd","abcd"]
输出: 4 
解释: 这两个单词为 "ab", "cd"。
```
示例 3:
```
输入: words = ["a","aa","aaa","aaaa"]
输出: 0 
解释: 不存在这样的两个单词。
```
### 解题思路
这一题我们可以以另外一中思路来看，可以将单词中的abc转化成二进制位
```
a = 2^0
b = 2^1
c = 2^2
```
单词所拼出的二进制数为
```
abc = 000111
def = 111000
```
将他们按位与运算。如果为000000，则这两组数据没有相同的数据，根据两组数据的下标所对于的单词的长度计算乘积，取最大值。

### 代码
```
var maxProduct = function(words) {
    let n = words.length;
    let bit2 = new Array(n).fill(0)
    for (let i = 0; i < n; i++) {
        for (let c of words[i]) {
            bit2[i] = bit2[i] | (1 << (c.charCodeAt() - 97))
        }
    }
    let ans = 0
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if ((bit2[i] & bit2[j]) == 0) {
                ans = Math.max(ans, words[i].length * words[j].length)
            }
        }
    }
    return ans
};
```